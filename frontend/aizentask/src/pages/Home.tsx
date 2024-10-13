import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[60vh] w-screen flex flex-col p-3 gap-5 items-center justify-around">
      <div className="h-[65vh] w-[70vw] gap-4 flex flex-col items-center justify-center">
        <h1 className="title text-5xl font-semibold">Secure Image Uploder.</h1>
        <span className="h-[0.25rem] w-[100%] bg-orange-400 rounded-full"></span>
        <p className="heading_list text-3xl font-semibold capitalize">
          Now in your browser...
        </p>
      </div>
      <div
        onClick={() => navigate("/register")}
        className="bg-indigo-600 text-white uppercase p-3 rounded"
      >
        <p className="logo font-semibold text-lg">Get Started</p>
      </div>
    </div>
  );
};

export default Home;
