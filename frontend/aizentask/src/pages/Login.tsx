import { useContext, useEffect } from "react";
import React from "react";
import { UserAuthContext } from "../context/userAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login: React.FC = () => {
  const userAuth = useContext(UserAuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userAuth?.login == true) {
      navigate("/dashboard");
    }
  }, [userAuth?.login]);
  return (
    <div className="relative min-h-[100vh] h-max w-[100vw] flex flex-col gap-2 items-center justify-center">
      {userAuth?.loader == true ? (
        <Loader />
      ) : (
        <>
          {userAuth?.message && (
            <span className="p-1 text-center font-semibold shadow-md">
              <p>{userAuth?.message}</p>
            </span>
          )}
          <div className="md:w-[45vw] w-[70vw] flex flex-col justify-around gap-5 border shadow-md h-max p-4">
            <div className="text-2xl text-indigo-600 font-semibold">
              <h1>Login</h1>
            </div>
            <form
              method="POST"
              onSubmit={userAuth?.handleLogin}
              className="gap-3 flex flex-col justify-center"
            >
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Username</p>
                <input
                  className="px-2 h-[2.25rem] w-[100%] md:w-[45wv] border rounded"
                  type="text"
                  name="username"
                  value={userAuth?.user.username}
                  onChange={userAuth?.handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Password</p>
                <input
                  className="px-2 h-[2.25rem] w-[100%] md:w-[45wv] border rounded"
                  type="password"
                  name="password"
                  value={userAuth?.user.password}
                  onChange={userAuth?.handleChange}
                />
              </span>
              <button
                type="submit"
                className="bg-indigo-600 p-2 font-medium text-white rounded"
              >
                Login
              </button>
            </form>
            <span className="w-[100%] flex flex-wrap items-center justify-evenly">
              <p className="font-medium">Don't have an account?</p>
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 cursor-pointer hover:font-medium"
              >
                Register
              </span>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
