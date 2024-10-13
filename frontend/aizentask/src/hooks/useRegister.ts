import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserType {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

const useRegister = (initialState: UserType) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType>(initialState);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      setLoader(false);
      if (data.success == true) {
        navigate("/login");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong, please try again");
    }
  };

  return {
    userData,
    message,
    handleChange,
    handleSubmit,
    loader,
  };
};

export default useRegister;
