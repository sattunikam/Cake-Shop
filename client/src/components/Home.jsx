import React from "react";
import About from "./About";
import Products from "./Products";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/products")
  }

  return (
    <>
      <div className="relative pt-24 min-h-screen bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/ai-generated-cake-picture.webp)] bg-cover bg-no-repeat w-full bg-center flex justify-center items-center sm:bg-cover sm:bg-no-repeat sm:w-full sm:bg-center">
        <div className="flex flex-col justify-center items-center w-[80%] container mx-auto">
          <h1 className="text-3xl text-center lg:text-4xl xl:text-6xl text-amber-100 font-semibold font-outfit">
            Welcome to the Celebration
          </h1>
          <h1 className="text-3xl text-center lg:text-4xl xl:text-6xl text-amber-100 font-semibold font-outfit">
            Special cake every time in our shop
          </h1>
          <a href="#about">
            <button onClick={()=>(handleClick())} className="text-white px-4 py-2 hover:bg-amber-950 bg-transparent cursor-pointer mt-8 rounded font-bold border-1 border-amber-100 font-outfit text-[16px]">
              Explore Now
            </button>
          </a>
        </div>
      </div>
      <About />
      <Products />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
