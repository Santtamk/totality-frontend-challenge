"use client";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Store = createContext("");
// includes add to cart function
// remove
//increment & decrement quantity in cart
//getcart from localStorage and setcart on addtocart

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to get cart from localStorage", error);
          localStorage.removeItem("cart");
        }
      }
    }
  }, []);

  const updateLocalStorage = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        //if the item already exists, do not add it again
        // console.log("item already exists in cart:", item);
        toast.info("Item already in cart. Visit your cart to change quantity.");
        return prevCart;
      } else {
        // console.log("item added to cart", item, new Date().toISOString());
        const updatedCart = [...prevCart, { ...item, quantity: 1 }];
        toast.success("Item added to cart");
        updateLocalStorage(updatedCart);
        return updatedCart;
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      toast.warning("Removed from cart");
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const increment = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const decrement = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === itemId && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => {
          if (item.id === itemId && item.quantity === 0) {
            toast.warning("Removed from cart");
            return false;
          }
          return true;
        });
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  return (
    <Store.Provider
      value={{ cart, addToCart, removeFromCart, increment, decrement }}
    >
      {children}
    </Store.Provider>
  );
};

export { Store, StoreProvider };
