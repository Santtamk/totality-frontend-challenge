"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const FILTERS = {
  filters: {
    location: [
      "Downtown",
      "City Center",
      "Countryside",
      "Beachfront",
      "Suburbs",
      "Arts District",
      "Mountains",
      "Coastal",
      "Historic District",
      "Industrial Area",
    ],
    priceRange: [
      "$50 - $100",
      "$101 - $150",
      "$151 - $200",
      "$201 - $250",
      "$251 - $300",
      "$301 - $350",
      "$351 - $500",
    ],
    bedrooms: [
      "1 Bedroom",
      "2 Bedrooms",
      "3 Bedrooms",
      "4 Bedrooms",
      "5+ Bedrooms",
    ],
  },
};

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    priceRange: "",
    bedrooms: "",
  });

  const fetchData = async () => {
    setLoading(true);
    toast.info("Loading Properties"); //for initial load
    try {
      const response = await axios.get("./data.json");
      setData(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
      toast.success("Let's browse!!");
    }
  };
  useEffect(() => {
    fetchData(); //fetches the data initially
  }, []);

  function extractPriceRange(priceRange) {
    //extracts prices for comparison from filter
    const regex = /\$(\d+)\s*-\s*\$(\d+)/;
    const match = priceRange.match(regex);
    const minPrice = parseInt(match[1], 10);
    const maxPrice = parseInt(match[2], 10);
    return { minPrice, maxPrice };
  }

  useEffect(() => {
    const applyFilters = () => {
      let newFilteredData = [...data];

      // filters based on user selection
      if (filters.location) {
        newFilteredData = newFilteredData.filter(
          (item) => item.location === filters.location
        );
      }
      if (filters.priceRange) {
        const priceRange = extractPriceRange(filters.priceRange);
        const { minPrice, maxPrice } = priceRange;
        newFilteredData = newFilteredData.filter((item) => {
          const price = parseFloat(item.price);
          return price >= minPrice && price <= maxPrice;
        });
      }
      if (filters.bedrooms) {
        const numBedrooms = parseInt(filters.bedrooms, 10);
        newFilteredData = newFilteredData.filter(
          (item) => item.bedrooms === numBedrooms
        );
      }

      setFilteredData(newFilteredData);
    };

    applyFilters();
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  console.log("filtered data:", filteredData);

  return (
    <>
      <div className=" mt-2  shadow-xl mb-5 rounded-md search-header">
        <div className="text-center text-white rounded-md text-5xl font-semibold py-10">
          Find a stay you&apos;ll{" "}
          <span className="italic font-bold ">love</span>
        </div>
        <div className="gap-2 flex flex-col bg-white py-5 md:flex-row items-center justify-center md:gap-4">
          {Object.keys(FILTERS.filters).map((filterKey) => {
            const options = FILTERS.filters[filterKey];
            return (
              <div
                key={filterKey}
                className="items-center justify-center flex gap-4"
              >
                <label htmlFor={filterKey}>
                  {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                </label>
                <select
                  name={filterKey}
                  id={filterKey}
                  onChange={handleFilterChange}
                  value={filters[filterKey]}
                >
                  <option value="">Select {filterKey}</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </div>
      {filteredData.length !== 0 ?
      <div
        style={{ display: "grid", justifyItems: "center" }}
        className="grid grid-cols-1 gap-4 !content-center	sm:items-center sm:justify-center md:grid-cols-3 md:mb-2"
      >
        {filteredData.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      : <div className="text-center text-2xl text-black">No Listing</div>}
    </>
  );
}
