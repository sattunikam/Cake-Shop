import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "../index.css";

const Testimonials = () => {
  const feedback = [
    {
      id: 1,
      image: "/Cake-Shop/client-image/teammemeber1.jpg",
      name: "Akanksha Patil",
      message: "Best cake I’ve ever had! Loved the quality and presentation.",
    },
    {
      id: 2,
      image: "/Cake-Shop/client-image/teammemeber2.jpg",
      name: "Mahesh Patil",
      message: "Delicious and healthy. Highly recommend ordering again!",
    },
    {
      id: 3,
      image: "/Cake-Shop/client-image/teammemeber3.jpg",
      name: "Sneha Patil",
      message: "I ordered for a birthday, and it was a hit! Super fresh.",
    },
    {
      id: 4,
      name: "Sandesh Patil",
      image: "/Cake-Shop/client-image/teammemeber4.jpg",
      message: "Perfect for any occasion. Quick delivery and fresh cakes!",
    },
    {
      id: 5,
      image: "/Cake-Shop/client-image/teammemeber7.jpg",
      name: "Rohit Mohite",
      message: "Awesome and fresh cakes!",
    },
    {
      id: 6,
      image: "/Cake-Shop/client-image/teammemeber6.jpg",
      name: "Vivek Jadhav",
      message: "I ordered for a birthday, and it was a hit! Super fresh.",
    },
  ];

  return (
    <div className="bg-indigo-100 w-full py-10" id="testimonials">
      <div className="container mx-auto px-4 sm:p-20">
        <h1 className="text-3xl text-center pb-8 w-full  font-semibold font-outfit xl:text-4xl">
          💬 Client Testimonials
        </h1>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-[82%]"
        >
          {feedback.map((value) => (
            <SwiperSlide key={value.id}>
              <div className=" testimonial-card text-white text-center p-6 h-[250px] rounded-lg flex flex-col justify-center items-center shadow-md">
                <img
                  loading="lazy"
                  src={value.image}
                  alt={value.name}
                  className="w-16 h-16 rounded-full border-2 border-white mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold mb-2">{value.name}</h4>
                <p className="">{value.message}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
