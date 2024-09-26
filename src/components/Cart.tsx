import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
  useState,
  Fragment,
} from "react";
import { createPortal } from "react-dom";

import CakeImg from "/assets/images/illustration-empty-cart.svg";
import CarbonNeutralIcon from "/assets/images/icon-carbon-neutral.svg";
import ConfirmedIcon from "/assets/images/icon-order-confirmed.svg";
import { HiMiniXMark } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";

import { CartContext } from "../store";
import { formatter } from "../util/formatter";

interface CartRef {
  show: () => void;
}

//* to fix an empty object error set allowObjectTypes: true in eslint rules
const Cart = forwardRef<CartRef, {}>((_, ref) => {
  const { items, total, cartAmount, dispatch } = useContext(CartContext);

  const dialog = useRef<HTMLDialogElement | null>(null);

  const [isConfirmed, setIsConfirmed] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      dialog.current?.showModal();
    },
  }));

  function handleButtonClick() {
    if (isConfirmed) {
      setIsConfirmed(false);
      dialog?.current?.close();
      dispatch({ type: "NEW_ORDER" });
      return;
    }

    setIsConfirmed(true);
  }

  function handleDeleteItem(item: string) {
    dispatch({ type: "DELETE_ITEM", payload: item });
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] backdrop:bg-black backdrop:opacity-50 bg-my-r-50 open:w-[100vw] max-w-[500px] h-fit rounded-md p-7 max-md:w-[100vw] max-md:max-w-[100vw] max-md:bottom-0 max-md:left-0 max-md:top-auto max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-b-none"
    >
      <div className="flex flex-col gap-4">
        {!isConfirmed ? (
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-my-red">
              Your Cart ({cartAmount})
            </h1>
            <button onClick={() => dialog.current?.close()}>
              <FaXmark size={22} className="text-my-r-900" />
            </button>
          </div>
        ) : (
          <>
            <img src={ConfirmedIcon} alt="order-confirmed-icon" width={32} />
            <h1 className="text-3xl text-my-r-900 font-bold">
              Order Confirmed
            </h1>
            <p className="-mt-2.5 text-my-r-500">
              We hope you enjoy your food!
            </p>
          </>
        )}
        {items.length ? (
          <>
            <div className="bg-my-r-100 py-2.5 rounded-md">
              <ul className="mt-1.5 h-fit max-h-[190px] overflow-y-scroll px-5">
                {items.map((item) => (
                  <Fragment key={item.name}>
                    <li className="flex justify-between items-center">
                      <div className={`${isConfirmed ? "w-[62%]" : ""}`}>
                        <div className="w-[100%]">
                          <h2 className="font-bold text-my-r-900 text-[14px] max-w-[100%] text-ellipsis overflow-hidden whitespace-nowrap">
                            {item.name}
                          </h2>
                        </div>
                        <div className="flex gap-3 mt-1 text-[14px]">
                          <span className="font-semibold text-my-red">
                            {item.amount}x
                          </span>
                          <span className="text-my-r-400">
                            @{formatter.format(item.price)}
                          </span>
                          {!isConfirmed && (
                            <span className="font-semibold text-my-r-500">
                              {formatter.format(item.total)}
                            </span>
                          )}
                        </div>
                      </div>
                      {!isConfirmed ? (
                        <HiMiniXMark
                          onClick={() => handleDeleteItem(item.name)}
                          size={15}
                          className="block rounded-full border border-solid box-content border-my-r-300 cursor-pointer text-my-r-300 hover:text-my-r-900 hover:border-my-r-900"
                        />
                      ) : (
                        <span className="font-semibold text-my-r-900">
                          {formatter.format(item.total)}
                        </span>
                      )}
                    </li>
                    <div className="w-full h-[0.5px] bg-gray-300 mt-2 mb-2"></div>
                  </Fragment>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-3 mb-1 px-5">
                <span className="text-my-r-500 text-[14px]">Order Total</span>
                <h3 className="text-my-r-900 text-2xl font-bold">
                  {formatter.format(total)}
                </h3>
              </div>
            </div>
            {!isConfirmed && (
              <div className="flex justify-center items-center gap-1 bg-my-r-100 h-12 rounded-md">
                <img src={CarbonNeutralIcon} alt="carbon-neutral-icon" />
                <p className="text-my-r-500 font-semibold text-[14px]">
                  This is a{" "}
                  <span className="text-my-r-900">carbon-neutral</span> delivery
                </p>
              </div>
            )}
            <button
              onClick={handleButtonClick}
              className="flex justify-center items-center bg-my-red h-12 w-full rounded-full text-my-r-50 font-semibold text-[14px] mt-2 hover:bg-my-red-hover"
            >
              {!isConfirmed ? "Confirm Order" : "Start New Order"}
            </button>
          </>
        ) : (
          <>
            <img src={CakeImg} alt="Empty Cart" className="self-center" />
            <p className="text-center font-semibold text-my-r-400">
              Your added items will appear here
            </p>
          </>
        )}
      </div>
    </dialog>,
    document.getElementById("modal") as HTMLDivElement
  );
});

export default Cart;
