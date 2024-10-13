import { createContext, useContext, ReactNode, useState } from "react";
import { UserAuthContext } from "./userAuth";

interface ContextValue {
  uploadFile: (file: File) => Promise<void>;
  images: imagesType[];
  generateAiImages: (prompt: string) => any;
  fetchAllImages: (user_id: Number) => void;
  aiImage: string;
  saveAiImage: (imageUrl: string) => void;
  message: string;
  Loader: boolean;
}

interface imagesType {
  imageName: string;
  uploadTime: string;
  s3_Url: string;
}

export const FileHandlerContext = createContext<ContextValue | null>(null);

export const FileHandlerProvider = ({ children }: { children: ReactNode }) => {
  const userauth = useContext(UserAuthContext);
  const [Loader, setLoader] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [images, setImages] = useState<imagesType[]>([
    {
      imageName: "",
      uploadTime: "",
      s3_Url: "",
    },
  ]);
  const [aiImage, setAiImage] = useState<any>();

  const saveAiImage = async (imageUrl: string) => {
    setLoader(true);
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const imageBlob = await response.blob();

      const filename = `ai_image_${Date.now()}.png`;
      const imageFile = new File([imageBlob], filename, {
        type: imageBlob.type,
      });

      await uploadFile(imageFile);
      setLoader(false);
      console.log("Ai image saved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async (file: any) => {
    const formdata = new FormData();
    formdata.append("file", file);
    setLoader(true);
    try {
      const response = await fetch(
        "https://aizen-task.onrender.com/file/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userauth?.accessToken}`,
          },
          body: formdata,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const data = await response.json();
      setLoader(false);
      if (data.success == true) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateAiImages = async (prompt: string) => {
    setLoader(true);
    try {
      const response = await fetch(
        "https://aizen-task.onrender.com/file/generate/ai/images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const data = await response.json();
      setLoader(false);
      if (data.success == true) {
        setAiImage(data.ai_image["url"]);
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllImages = async (user_id: Number) => {
    try {
      const response = await fetch(
        `https://aizen-task.onrender.com/file/fetch/all/images/${user_id}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const data = await response.json();
      if (data.success == true) {
        setImages(data.images);
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FileHandlerContext.Provider
      value={{
        uploadFile,
        images,
        generateAiImages,
        fetchAllImages,
        aiImage,
        saveAiImage,
        message,
        Loader,
      }}
    >
      {children}
    </FileHandlerContext.Provider>
  );
};
