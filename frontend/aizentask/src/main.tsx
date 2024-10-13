import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserAuthProvider } from "./context/userAuth.tsx";
import { FileHandlerProvider } from "./context/fileHandler.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserAuthProvider>
      <FileHandlerProvider>
        <App />
      </FileHandlerProvider>
    </UserAuthProvider>
  </StrictMode>
);
