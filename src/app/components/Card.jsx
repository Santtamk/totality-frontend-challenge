import React, { useContext } from "react";
import { Store } from "../CartContext";

const Card = ({ item }) => {
  const { addToCart } = useContext(Store);

  return (
    <div class="w-full max-w-sm bg-white border-none  rounded-lg shadow-2xl ">
      <a href="#">
        <img
          class="rounded-t-lg h-56 w-full"
          src={item.image}
          alt={item.title}
        />
      </a>
      <div class="px-5 pb-5 flex gap-3 flex-col pt-3">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h5>
          <h6 className="text-blue">{item.location}</h6>
        </a>
        <div className="text-black">{item.description}</div>
        <div className="text-black">Bedrooms:{item.bedrooms}</div>
        <div className="flex text-wrap gap-2 text-blue">
        {item.amenities.map(item =>  <div key={item}>{item}</div>)}

        </div>
        
        <div class="flex gap-3 md:flex-col">
          <span class="text-3xl font-bold text-gray-900 dark:text-white line-through text-gray">
            ${Math.floor(item.price) + 10}/day
          </span>
          <span class="text-3xl font-bold text-gray-900 dark:text-white">
            ${item.price}/day
          </span>
        </div>
        <button
          className="bg-blue text-white rounded-md p-2 m-2 shadow-xl cursor-pointer hover:text-blue hover:bg-black md:w-fit md:m-0"
          onClick={() => addToCart(item)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
