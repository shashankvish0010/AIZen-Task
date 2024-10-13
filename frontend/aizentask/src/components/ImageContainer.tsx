import React from "react";

interface ImageContainerProps {
  uploadTime: string;
  imageUrl: string;
  imagename: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  uploadTime,
  imageUrl,
  imagename,
}) => {
  return (
    <div className="min-h-[50vh] h-max w-[80vw] md:w-[30vw] flex flex-col items-center justify-evenly p-4 bg-indigo-600 shadow-lg rounded-lg">
      <img
        src={imageUrl}
        alt={imagename}
        height={"200px"}
        width={"200px"}
        className="rounded"
      />
      <div className="mt-2 text-white">
        <h2 className="heading_other">{imagename}</h2>
        <p className="heading_other text-gray-200 text-sem">{uploadTime}</p>
      </div>
    </div>
  );
};

export default ImageContainer;
