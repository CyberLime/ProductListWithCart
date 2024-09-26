import { useContext } from "react";

import AddToCartIcon from "/assets/images/icon-add-to-cart.svg";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

import { formatter } from "../util/formatter";
import { CartContext } from "../store";

const DessertItem = ({
  img,
  name,
  fullname,
  price,
}: {
  img: string;
  name: string;
  fullname: string;
  price: number;
}) => {
  const { items, dispatch } = useContext(CartContext);
  const cartItem = items.filter((item) => item.name === fullname);

  function handleAddItem() {
    dispatch({
      type: "ADD_ITEM",
      payload: { name: fullname, amount: 1, price, total: price },
    });
  }

  function handleRemoveItem() {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { name: fullname, amount: 1, price, total: price },
    });
  }

  return (
    <li className="flex flex-col">
      <img
        src={img}
        alt={img}
        width={240}
        height={240}
        className={`rounded-lg ${
          cartItem.length
            ? "border-2 border-solid border-my-red"
            : ""
        }`}
      />
      {!cartItem.length ? (
        <button
          onClick={handleAddItem}
          className="relative bottom-6 flex items-center justify-between self-center w-40 h-12 px-5 bg-my-r-50 border border-solid border-my-r-500 rounded-full font-semibold text-my-r-900 hover:border-my-red hover:text-my-red"
        >
          <img src={AddToCartIcon} alt="add-to-cart-icon.svg" />
          <span>Add to Cart</span>
        </button>
      ) : (
        <div
          onClick={() => null}
          className="relative bottom-6 flex items-center justify-between self-center w-40 h-12 px-5 bg-my-red rounded-full font-semibold text-my-r-50"
        >
          <FaMinus
            onClick={handleRemoveItem}
            className="box-content border border-solid border-my-r-50 w-2 h-2 rounded-full p-1 cursor-pointer hover:text-my-red hover:bg-my-r-50"
          />
          <span>{cartItem[0].amount}</span>
          <FaPlus
            onClick={handleAddItem}
            className="box-content border border-solid border-my-r-50 w-2 h-2 rounded-full p-1 cursor-pointer hover:text-my-red hover:bg-my-r-50"
          />
        </div>
      )}

      <h1 className="text-my-r-500 font-semibold text-sm">{name}</h1>
      <h2 className="text-my-r-900 font-semibold">{fullname}</h2>
      <h3 className="text-my-red font-semibold">{formatter.format(price)}</h3>
    </li>
  );
};

export default DessertItem;
