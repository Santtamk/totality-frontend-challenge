"use client";
import React, { useContext } from "react";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { Store } from "../CartContext";
import Link from "next/link";

const NavBar = () => {
//nav includes logo and cart with count
  const { cart } = useContext(Store);//cart count

  return (
    <div className="">
      <nav className="mx-6 mt-2 py-2 flex justify-between lg:mx-10 bg-white rounded-md px-4 shadow-xl">
        <Link href="/">
          <div className="text-3xl ">
            <span className="text-blue">E</span>
            <span className="underline decoration-blue text-black">cho</span>
            <span className="text-blue">E</span>
            <span className="underline decoration-blue text-black">states</span>
          </div>
        </Link>
        <Link href="/cart">
          <div className="flex justify-center items-center gap-2 text-black">
            <PiShoppingCartSimpleDuotone />
            <span>{cart.length}</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
