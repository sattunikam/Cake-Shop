import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "dbb6e43f-40b5-4a48-a6b2-0e2053ef7f5f");

    const response = await axios.post("https://api.web3forms.com/submit",formData);
    const data = await response.data;

    if (data.success) {
      setResult("Form Submitted Successfully");
      toast.success("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error",data);
      setResult(data.message);
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="w-full mx-auto bg-white py-10" id="contact">
        <div className="container mx-auto py-10 md:py-20">
          <h1 className="text-3xl text-center pb-8 w-full  font-semibold font-outfit xl:text-4xl">
            Contact Form
          </h1>

          <form
            onSubmit={onSubmit}
            className="border w-[80%] bg-amber-100 border-amber-100 p-8 lg:p-16 space-y-3 rounded shadow-lg  md:w-[50%] lg:w-[40%] flex flex-col mx-auto justify-center items-center"
          >
            <input
              className="w-[100%] border hover:border-blue-500 bg-white text-black rounded  px-7   shadow-lg border-amber-100 py-3"
              placeholder="username "
              type="text"
              name="username"
              required
            />

            <input
              className="w-[100%] border hover:border-blue-500 bg-white text-black rounded shadow-lg px-7 border-amber-100  py-3"
              placeholder="email"
              type="email"
              name="email"
              required
            />

            <textarea
              className="w-[100%]  border hover:border-blue-500 resize-none bg-white px-7  shadow-lg border-amber-100 text-black rounded h-[140px] py-3"
              row=""
              name="message"
              id=""
              placeholder="message"
              required
            ></textarea>

            <div className="flex space-x-2 ">
              <input
                type="submit"
                value={result ? result : "submit"}
                className="px-4 mt-2 md:mt-4 md:px-8 hover:bg-blue-950 cursor-pointer font-bold border-0 rounded py-2 bg-emerald-400 text-white"
              />

              <input
                type="reset"
                value="Cancel"
                className="px-4 mt-2 md:mt-4 md:px-8 hover:bg-blue-950 cursor-pointer font-bold border-0 rounded py-2 bg-blue-700 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
