import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { UserAuthContext } from "../context/userAuth";

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useContext(UserAuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-indigo-600 text-white h-[15vh] w-screen flex flex-row items-center justify-around">
      <div
        onClick={() => navigate("/")}
        className="h-[100%] md:w-[20vw] gap-2 md:gap-0 flex flex-row items-center justify-evenly"
      >
        <span className="logo md:text-2xl text-xl">
          <p>Ai-Uploader</p>
        </span>
      </div>
      <div className="header_list h-[100%] w-max hidden md:flex flex-row items-center">
        <ul className="flex flex-row items-center justify-between w-[50vw] font-semibold">
          <li
            onClick={() => navigate("/")}
            className="hover:-translate-y-1 transition cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/dashboard")}
            className="hover:-translate-y-1 transition cursor-pointer"
          >
            Dashboard
          </li>
          <li
            onClick={() => navigate("/upload")}
            className="hover:-translate-y-1 transition cursor-pointer"
          >
            Upload
          </li>
          {user?.login == true ? (
            <li
              onClick={() => user?.handleLogout()}
              className="hover:-translate-y-1 transition cursor-pointer"
            >
              Logout
            </li>
          ) : (
            <li
              onClick={() => navigate("/login")}
              className="hover:-translate-y-1 transition cursor-pointer"
            >
              Login
            </li>
          )}
        </ul>
      </div>
      {open == true ? (
        <div
          onClick={() => setOpen(!open)}
          className="md:hidden block h-max w-max"
        >
          <Icon icon="oui:cross" height={"2rem"} color="white" />
        </div>
      ) : (
        <div
          onClick={() => setOpen(!open)}
          className="md:hidden block h-max w-max"
        >
          <Icon icon="quill:hamburger" height={"2rem"} color="white" />
        </div>
      )}
      {open == true ? (
        <div className="absolute top-[.05%] md:hidden block h-max w-screen bg-indigo-600 items-center p-3">
          <div
            onClick={() => setOpen(!open)}
            className="md:hidden block h-max ml-[90%]"
          >
            <Icon icon="oui:cross" height={"2rem"} color="white" />
          </div>
          <ul className="h-max text-white uppercase header_list md:hidden flex flex-col gap-5 justify-around text-sm">
            <li onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </li>
            <li
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer"
            >
              Dashboard
            </li>
            <li onClick={() => navigate("/upload")} className="cursor-pointer">
              Upload
            </li>
            <li onClick={() => navigate("/login")} className="cursor-pointer">
              Login
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
