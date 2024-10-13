import React, { useContext, useEffect } from "react";
import { FileHandlerContext } from "../context/fileHandler";
import { UserAuthContext } from "../context/userAuth";
import AiImageGenerator from "../components/AiImageGenerator";
import ImageContainer from "../components/ImageContainer";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const fileHandle = useContext(FileHandlerContext);
  const user = useContext(UserAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(fileHandle?.images);
    fileHandle?.fetchAllImages(user?.currentuser?.id);
    if (user?.login == false) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[100vh] w-screen p-3 flex flex-col items-center gap-5">
      <AiImageGenerator />
      <div className="md:w-[85vw] w-[80vw] flex flex-wrap items-center justify-evenly gap-3 p-3">
        {fileHandle?.images.map((image) => (
          <ImageContainer
            imagename={image.imageName}
            imageUrl={image.s3_Url}
            uploadTime={image.uploadTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
