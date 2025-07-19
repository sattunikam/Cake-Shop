import React from "react";

const About = () => {
  return (
    <>
      <div id="about" className="container mx-auto flex flex-wrap w-full py-10 gap-6 sm:gap-0 sm:px-8 lg:justify-center">
        <div className="sm:w-[40%] lg:w-[30%] flex justify-center">
          <img className="w-[80%] sm:w-full" src="/slice.png" alt="slice cake" />
        </div>

        <div className="sm:w-[60%] lg:w-[50%] text-center flex flex-col justify-center items-center">
          <h4 className="text-[14px] text-gray-600 font-bold xl:text-[18px]">About</h4>
          <h1 className="text-3xl w-[70%] sm:w-[80%] font-semibold font-outfit xl:text-4xl lg:w-[50%] xl:w-[100%]">Simple way of eating delicious</h1>
          <p className="text-[16px] w-[70%] sm:w-[80%] pt-2 xl:text-xl lg:w-[80%] xl:w-[70%]">
            We offer healthy cakes, made with care and quality ingredients. You
            can order from us whenever you're feeling hungry. We always try our
            best to keep our customers happy.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
