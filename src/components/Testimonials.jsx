import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const feedback = [
    {
      id: 1,
      image: "/Cake-Shop/client-image/teammemeber1.jpg",
      name: "Akanksha Patil",
      message: "Absolutely delicious! Premium quality and super fresh.",
      rating: 5,
    },
    {
      id: 2,
      image: "/Cake-Shop/client-image/teammemeber2.jpg",
      name: "Mahesh Patil",
      message: "Loved the taste and presentation. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      image: "/Cake-Shop/client-image/teammemeber3.jpg",
      name: "Sneha Patil",
      message: "Perfect for celebrations. Packaging was delightful!",
      rating: 5,
    },
    {
      id: 4,
      image: "/Cake-Shop/client-image/teammemeber4.jpg",
      name: "Sandesh Patil",
      message: "Smooth delivery, premium quality & perfect texture.",
      rating: 5,
    },
  ];

  return (
    <div className="w-full py-16" id="testimonials">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 font-outfit">
          💛 What Our Customers Say
        </h1>


        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay, Pagination]}
          className="pb-8"
        >
          {feedback.map((value) => (
            <SwiperSlide key={value.id}>
              <div className="bg-white rounded-2xl shadow-lg p-6 mx-4 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 border border-amber-100">
                <img
                  src={value.image}
                  alt={value.name}
                  className="w-20 h-20 rounded-full border-4 border-amber-300 object-cover mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-800">{value.name}</h4>

                <div className="flex justify-center mt-2 mb-3">
                  {[...Array(value.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-[18px]" />
                  ))}
                </div>

                <p className="text-gray-600 text-sm px-2">
                  {value.message}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
