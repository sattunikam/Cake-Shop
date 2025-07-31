import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BuyNow from "./BuyCakeComponent";

const ProductContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = ["/"].includes(location.pathname);

  const cakeProduct = [
    {
      name: "cheese cake",
      image: "/Cake-Shop/cakes/cake1.png",
      price: 50,
    },

    {
      name: "redberry cake",
      image: "/Cake-Shop/cakes/cake2.png",
      price: 340,
    },

    {
      name: "strawberry cake",
      image: "/Cake-Shop/cakes/cake3.png",
      price: 450,
    },

    {
      name: "cup cake",
      image: "/Cake-Shop/cakes/cake4.png",
      price: 50,
    },

    {
      name: "chocolate cake",
      image: "/Cake-Shop/cakes/cake5.png",
      price: 400,
    },

    {
      name: "fruit cake",
      image: "/Cake-Shop/cakes/cake6.png",
      price: 350,
    },
  ];

  // const handleBuy = async (value) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/buy",
  //       value,
  //       { withCredentials: true }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Added to your dashboard!");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };

  return (
    <>
      <div
        className={`container mx-auto w-full ${isHomePage ? "py-10" : "py-30"}`}
      >
        <h1 className="text-3xl text-center pb-8 w-full  font-semibold font-outfit xl:text-4xl">
          Popular Products
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-10 w-[100%]">
          {cakeProduct.map((value, id) => (
            <div
              key={id}
              className="border w-[80%] p-4 sm:w-[40%]  lg:w-[25%] shadow-lg sm:p-6 rounded border-amber-200 hover:border-amber-600"
            >
              <div className="w-[100%] flex justify-center items-center">
                <img
                  loading="lazy"
                  className=" w-[100%] h-[220px] sm:w-[100%] sm:h-[170px]  md:h-[190px] lg:h-[170px] xl:w-[70%]"
                  src={value.image}
                  alt={value.name}
                />
              </div>

              <div className="text-center">
                <h4 className="text-[14px] sm:text-[20px]">{value.name}</h4>
                <h6 className="text-[10px] sm:text-[14px] xl:text-[18px]">
                  {value.price}
                </h6>
                <BuyNow
                  price={value.price}
                  cakeName={value.name}
                  image={value.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Products = () => {
  return <ProductContent />;
};

export default Products;
