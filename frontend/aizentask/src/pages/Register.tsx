import React from "react";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    userData: user,
    message,
    handleChange,
    handleSubmit,
    loader,
  } = useRegister({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  return (
    <div className="relative min-h-[100vh] h-max w-[100vw] flex flex-col gap-2 items-center justify-center">
      {loader == true ? (
        <Loader />
      ) : (
        <>
          {message && (
            <span className="p-1 text-center font-semibold shadow-md">
              <p>{message}</p>
            </span>
          )}
          <div className="flex flex-col justify-around gap-5 border shadow-md w-max h-max p-4">
            <div className="text-2xl text-indigo-600 font-semibold">
              <h1>Register</h1>
            </div>
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="gap-3 flex flex-col justify-center"
            >
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Firstname</p>
                <input
                  className="px-2 h-[2.25rem] w-[55vw] md:w-[45wv] border rounded"
                  type="text"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Lastname</p>
                <input
                  className="px-2 h-[2.25rem] w-[55vw] md:w-[45wv] border rounded"
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Username</p>
                <input
                  className="px-2 h-[2.25rem] w-[55vw] md:w-[45wv] border rounded"
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Email</p>
                <input
                  className="px-2 h-[2.25rem] w-[55vw] md:w-[45wv] border rounded"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Password</p>
                <input
                  className="px-2 h-[2.25rem] w-[55vw] md:w-[45wv] border rounded"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </span>

              <button
                type="submit"
                className="bg-indigo-600 p-2 font-medium text-white rounded"
              >
                Register
              </button>
            </form>
            <span className="w-[100%] flex flex-wrap items-center justify-evenly">
              <p className="font-medium">Already have an account?</p>
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer hover:font-medium"
              >
                Login
              </span>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
