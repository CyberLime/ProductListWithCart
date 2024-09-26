import { useRef, useContext } from "react";

import Cart from "./Cart";
import { CartContext } from "../store";

const Header = () => {
  // use the correct ref type that matches the Cart component's expected ref
  const dialogRef = useRef<{ show: () => void }>(null);

  const { cartAmount } = useContext(CartContext);

  return (
    <>
      <Cart ref={dialogRef} />
      <header className="flex justify-between px-20 py-5 max-md:px-7">
        <h1 className="text-4xl font-bold text-my-r-900 max-md:text-2xl">
          Desserts
        </h1>
        {/* call the show method on the dialog ref */}
        <button
          className="text-xl font-bold text-my-red hover:text-my-red-hover max-md:text-lg"
          onClick={() => dialogRef.current?.show()}
        >
          Your Cart ({cartAmount})
        </button>
      </header>
    </>
  );
};

export default Header;
