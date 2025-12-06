import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addCake } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CakeImagePreview from "../components/CakeImagePreview";

const ProductContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = ["/"].includes(location.pathname);
  const dispatch = useDispatch();
  const cakes = useSelector((state) => state.cakes.cakeProduct);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const openPreview = (image) => {
    setPreviewImage(image);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <div
        className={`container mx-auto w-full ${isHomePage ? "py-10" : "py-30"}`}
      >
        <h1 className="text-3xl text-center pb-8 w-full  font-semibold font-outfit xl:text-4xl">
          Popular Products
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-10 w-[100%]">
          {cakes.map((value) => (
            <div
              key={value.id}
              className="backdrop-blur-md bg-white/30 border 
                w-[80%] p-6 sm:w-[40%] lg:w-[25%] 
                shadow-xl rounded-2xl hover:scale-[1.03] 
                hover:shadow-2xl hover:bg-white/40 
                transition-all duration-300 cursor-pointer border-amber-200 hover:border-amber-500"
            >
              <div className="w-full flex justify-center items-center mb-4">
                <img
                  loading="lazy"
                  className="w-[60%] h-[120px] sm:h-[170px] md:h-[190px] lg:h-[170px] 
                      rounded-xl object-cover"
                  src={value.image}
                  alt={value.name}
                />
              </div>

              <div className="text-center space-y-2">
                <h4 className="text-[16px] sm:text-[20px] font-semibold text-gray-800 drop-shadow">
                  {value.name}
                </h4>
                <h6 className="text-[14px] sm:text-[16px] font-medium text-amber-800">
                  ₹ {value.price}
                </h6>

                <div className="flex flex-col justify-center sm:flex sm:flex-row sm:gap-4 mt-4">
                  {console.log("🧁 Sending cake ID to BuyNow:", value.id)}
                  
                  {/* ✅ Only Preview Button */}
                  <button
                    onClick={() => openPreview(value.image)}
                    className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    Preview
                  </button>
                  <Button
                    onClick={() => dispatch(addCake(value))}
                    variant="contained"
                    endIcon={<LocalMallIcon />}
                    sx={{
                      mt: 1,
                      px: 2.5,
                      py: 1.2,
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #d97706 0%, #92400e 100%)",
                      },
                      borderRadius: "12px",
                      fontSize: "0.85rem",
                      textTransform: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ✅ Pass selected index to preview */}
      {isPreviewOpen && (
        <CakeImagePreview
          image={previewImage}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
};

const Products = () => {
  return <ProductContent />;
};

export default Products;
