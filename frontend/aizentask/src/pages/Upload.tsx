import React, { useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { FileHandlerContext } from "../context/fileHandler";
import Loader from "../components/Loader";
import { UserAuthContext } from "../context/userAuth";
import { useNavigate } from "react-router-dom";

const Upload: React.FC = () => {
  const fileHandle = useContext(FileHandlerContext);
  const user = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      fileHandle?.uploadFile(file);
    }
  };

  useEffect(() => {
    if (user?.login == false) {
      navigate("/login");
    }
  });

  return (
    <div className="h-[100vh] w-screen flex flex-col gap-5 justify-center items-center p-3">
      {fileHandle?.Loader == true ? (
        <Loader />
      ) : (
        <>
          {fileHandle?.message && (
            <span className="p-1 text-center font-semibold shadow-md">
              <p>{fileHandle?.message}</p>
            </span>
          )}
          <div className="flex items-center justify-center h-[50vh] md:w-[55vw] w-[80vw] p-3 bg-indigo-600 text-white shadow-md rounded-lg">
            <div className="h-[100%] w-[100%] border-2 white rounded-lg flex flex-col items-center justify-center">
              <Icon
                icon="ep:upload-filled"
                height={"10rem"}
                width={"10rem"}
                style={{ color: "white" }}
              />
              <p className="header_list">Upload Image</p>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label
                htmlFor="imageInput"
                className="cursor-pointer text-center mt-2"
              >
                <span className="font-semibold p-2 bg-white text-indigo-600 rounded">
                  Select Image
                </span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Upload;
