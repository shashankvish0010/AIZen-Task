import React from "react";
import { Icon } from "@iconify/react";

const Loader: React.FC = () => {
  return (
    <div className="h-[100vh] w-screen bg-white flex items-center justify-center">
      <Icon
        icon="svg-spinners:blocks-shuffle-3"
        height={"10rem"}
        width={"10rem"}
        style={{ color: "blue" }}
      />
    </div>
  );
};

export default Loader;
