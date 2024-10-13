import React, { useContext, useState } from "react";
import { FileHandlerContext } from "../context/fileHandler";
import Loader from "./Loader";

const AiImageGenerator: React.FC = () => {
  const fileHandle = useContext(FileHandlerContext);
  const [prompt, setPrompt] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPrompt(value);
  };

  const handleGenerate = async () => {
    await fileHandle?.generateAiImages(prompt);
  };

  return (
    <div className="h-max w-screen flex items-center justify-center p-3">
      {fileHandle?.Loader == true ? (
        <Loader />
      ) : (
        <>
          <div className="bg-white borderpgray-200 border-2 h-max md:w-[50vw] w-[85vw] flex flex-col items-center p-3 gap-5 rounded-lg shadow-xl">
            <h2 className="title font-semibold p-2 md:text-xl">
              Generate Images{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                with Ai
              </span>
            </h2>
            <div className="bg-slate-100 h-max w-max rounded-full p-1.5 text-base flex flex-row items-center">
              <input
                className="focus-visible::outline-none md:w-[30vw] w-[50vw] px-1.5 bg-slate-100 placeholder:text-black:font-semibold"
                type="text"
                name="prompt"
                placeholder="Try it now."
                value={prompt}
                onChange={handleChange}
              />
              <button onClick={handleGenerate} className="cursor-pointer">
                Generate
              </button>
            </div>
            <div className="flex flex-col items-center justify-center p-3">
              {fileHandle?.aiImage && (
                <div className="w-[100%] flex flex-col justify-around items-center mt-[5%]">
                  <h1 className="text-xl font-semibold">Generated Image</h1>
                  <div className="flex flex-wrap justify-center">
                    {
                      <img
                        height={"200px"}
                        width={"200px"}
                        src={fileHandle?.aiImage}
                        className="m-2 rounded shadow-md"
                      />
                    }
                  </div>
                </div>
              )}
              {fileHandle?.aiImage && (
                <div className="h-[100%] gap-3 justify-center items-center flex md:flex-col flex-row">
                  <button
                    onClick={() => fileHandle?.saveAiImage(fileHandle?.aiImage)}
                    className="bg-indigo-600 p-2 font-semibold text-white rounded-md"
                  >
                    Save Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AiImageGenerator;
