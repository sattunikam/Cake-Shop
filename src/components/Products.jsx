import React from "react";

const Products = () => {
  const cakeProduct = [
    {
      name: "cheese cake",
      image: "./cakes/cake1.png",
      price: "50 Rs.",
    },

    {
      name: "redberry cake",
      image: "./cakes/cake2.png",
      price: "340 Rs.",
    },

    {
      name: "strawberry cake",
      image: "./cakes/cake3.png",
      price: "300 Rs.",
    },

    {
      name: "cup cake",
      image: "./cakes/cake4.png",
      price: "50 Rs.",
    },

    {
      name: "chocolate cake",
      image: "./cakes/cake5.png",
      price: "280 Rs.",
    },

    {
      name: "fruit cake",
      image: "./cakes/cake6.png",
      price: "220 Rs.",
    },
  ];
  return (
    <>
      <div className="container mx-auto w-full py-10">
        <h4 className="pb-4 text-center text-[14px] text-gray-600 font-bold xl:text-[18px]">
          Popular Products
        </h4>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-10 w-[100%]">
          {cakeProduct.map((value, id) => (
            <div
              key={id}
              className="border w-[80%] p-4 sm:w-[40%]  lg:w-[25%] shadow-lg sm:p-6 rounded border-amber-100 hover:border-amber-600"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
