"use client";
import React, { useContext, useState } from "react";
import { Store } from "../CartContext";

const CartPage = () => {
  //context
  const { cart, increment, removeFromCart, decrement } = useContext(Store);

  //subtotal
  let subTotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  //discount
  let discount = (subTotal * 0.1).toFixed(2);

  //total
  let total = (subTotal - discount).toFixed(2);

  return (
    <div>
      {cart.length === 0 ? (
        <div className="flex items-center justify-center font-bold decoration-blue underline">
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="bg-white text-xl">Your items in cart</div>
          {cart.map((item) => (
            <div key={item.id} className="bg-white flex p-4 gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="mix-blend-multiply object-scale-down w-20 h-20"
              />
              <div className="sm:w-3/5 flex flex-col gap-4">
                <div className="overflow-hidden truncate text-black md:text-wrap font-semibold	text-wrap">
                  {item.title}
                </div>
                <div className="flex gap-3 ">
                  <button
                    className="border p-4 rounded-xl bg-gray border-blue hover:bg-white shadow-2xl"
                    onClick={() => decrement(item.id)}
                  >
                    -
                  </button>
                  <div className="border p-4 rounded-xl bg-gray border-blue">
                    {item.quantity}
                  </div>
                  <button
                    className="border p-4 rounded-xl bg-gray border-blue hover:bg-white shadow-2xl"
                    onClick={() => increment(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <div className="sm:w-1/5 flex justify-center items-center text-center text-black font-semibold flex-col gap-5">
                  <div className="decoration-blue underline">${item.price}</div>
                  <button
                    className=" border-blue border p-2 text-black text-rose shadow-2xl rounded-md hover:bg-blue hover:text-white "
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white border flex flex-col p-5 gap-4">
            <div className="flex gap-5">
              Sub-total:{" "}
              <div className="decoration-blue underline">${subTotal}</div>
            </div>
            <div>Extra discount of 10% on ${subTotal}</div>
            <div className="flex gap-5">
              Total: <div className="decoration-blue underline">${total}</div>
            </div>
            <div>
              <label htmlFor="Address">Address</label>
              <textarea id="Address" name="Address"></textarea>
            </div>
            <div>
              <label htmlFor="Contact">Contact No:</label>
              <input id="Contact" name="Contact" type="number" required />
            </div>
            <div>
              <p>Select your desired payment method</p>
              <div class="flex items-center mb-4">
                <input
                  type="radio"
                  id="cash"
                  name="payment_method"
                  value="cash"
                  class="mr-2 leading-tight"
                />
                <label for="cash" class="text-lg">
                  Cash
                </label>
              </div>
              <div class="flex items-center mb-4">
                <input
                  type="radio"
                  id="credit_card"
                  name="payment_method"
                  value="credit_card"
                  class="mr-2 leading-tight"
                />
                <label for="credit_card" class="text-lg">
                  Credit Card
                </label>
              </div>
              <div class="flex items-center mb-4">
                <input
                  type="radio"
                  id="paypal"
                  name="payment_method"
                  value="paypal"
                  class="mr-2 leading-tight"
                />
                <label for="paypal" class="text-lg">
                  PayPal
                </label>
              </div>
              <div class="flex items-center mb-4">
                <input
                  type="radio"
                  id="bank_transfer"
                  name="payment_method"
                  value="bank_transfer"
                  class="mr-2 leading-tight"
                />
                <label for="bank_transfer" class="text-lg">
                  Bank Transfer
                </label>
              </div>
            </div>
            <div className="border text-center border-blue text-black text-rose shadow-2xl rounded-md hover:bg-blue cursor-pointer hover:text-white">
              Checkout
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
