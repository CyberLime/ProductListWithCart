import { createContext, useReducer, ReactNode, Dispatch } from "react";

type CartItem = {
  name: string;
  amount: number;
  price: number;
  total: number;
};

type CartState = {
  items: CartItem[];
  total: number;
  cartAmount: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: CartItem }
  | { type: "DELETE_ITEM"; payload: string }
  | { type: "NEW_ORDER" };

export const CartContext = createContext<{
  items: CartItem[];
  total: number;
  cartAmount: number;
  dispatch: Dispatch<CartAction>;
}>({
  items: [],
  total: 0,
  cartAmount: 0,
  dispatch: () => undefined,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedArray = [...state.items];
      const existingItemIndex = updatedArray.findIndex(
        (item) => item.name === action.payload.name
      );

      if (existingItemIndex !== -1) {
        const updatedItem = updatedArray[existingItemIndex];

        updatedArray[existingItemIndex] = {
          ...updatedItem,
          amount: updatedItem.amount + 1,
          total: updatedItem.price * (updatedItem.amount + 1),
        };

        return {
          ...state,
          items: updatedArray,
          total: state.total + updatedItem.price,
          cartAmount: state.cartAmount + 1,
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
        cartAmount: state.cartAmount + 1,
      };
    }
    case "REMOVE_ITEM": {
      const updatedArray = [...state.items];
      const existingItemIndex = updatedArray.findIndex(
        (item) => item.name === action.payload.name
      );

      if (updatedArray[existingItemIndex].amount !== 1) {
        const updatedItem = updatedArray[existingItemIndex];

        updatedArray[existingItemIndex] = {
          ...updatedItem,
          amount: updatedItem.amount - 1,
          total: updatedItem.price * (updatedItem.amount - 1),
        };

        return {
          ...state,
          items: updatedArray,
          total: state.total - updatedItem.price,
          cartAmount: state.cartAmount - 1,
        };
      }

      return {
        ...state,
        items: state.items.filter((item) => item.name !== action.payload.name),
        total: state.total - action.payload.price,
        cartAmount: state.cartAmount - 1,
      };
    }
    case "DELETE_ITEM":
      const deletedItem = state.items.filter(
        (item) => item.name === action.payload
      )[0];

      return {
        ...state,
        items: state.items.filter((item) => item.name !== action.payload),
        total: state.total - deletedItem.total,
        cartAmount: state.cartAmount - deletedItem.amount,
      };
    case "NEW_ORDER":
      return { ...state, items: [], total: 0, cartAmount: 0 };
    default:
      return state;
  }
};

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    cartAmount: 0,
  });

  console.log(state.items);

  const ctxValue = {
    items: state.items,
    total: state.total,
    cartAmount: state.cartAmount,
    dispatch,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
