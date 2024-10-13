import {
  createContext,
  useState,
  useEffect,
  useReducer,
  ReactNode,
} from "react";

interface UserType {
  username: string;
  password: string;
}

interface StateType {
  login: boolean;
  userData: any;
  message: string | undefined;
}

interface ContextValue {
  message: string | undefined;
  login: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent) => any;
  handleLogout: () => void;
  dispatch: React.Dispatch<ActionType>;
  currentuser: any;
  user: UserType;
  state: StateType;
  accessToken: string | null;
  loader: boolean;
}

export const UserAuthContext = createContext<ContextValue | null>(null);

interface ActionType {
  type: "LOGIN" | "LOGOUT";
  payload?: any;
}

const userReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        login: true,
        userData: action.payload?.user,
        message: action.payload?.message,
      };
    case "LOGOUT":
      return {
        ...state,
        login: false,
        userData: null,
        message: "Logged out successfully",
      };
    default:
      return state;
  }
};

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = localStorage.getItem("current_user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [loader, setLoader] = useState<boolean>(false);

  const [accessToken, setAccessToken] = useState<string | null>(null); // Initialize as null
  const [currentuser, setCurrentUser] = useState(initialUser);
  const [user, setUser] = useState<UserType>({ username: "", password: "" });
  const [message, setMessage] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const [state, dispatch] = useReducer(userReducer, {
    login: false,
    userData: null,
    message: undefined,
  });

  useEffect(() => {
    localStorage.setItem("current_user", JSON.stringify(currentuser));
  }, [currentuser]);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_access="));
    if (token) {
      dispatch({ type: "LOGIN", payload: currentuser });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setLoader(false);
      if (data.success === true) {
        setCurrentUser(data.userdata);
        setAccessToken(data.access_token);
        document.cookie = `user_access=${data.access_token}; path=/`;
        dispatch({
          type: "LOGIN",
          payload: { user: data.userdata, message: data.message },
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = () => {
    document.cookie =
      "user_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    localStorage.removeItem("current_user");
    dispatch({ type: "LOGOUT" });
  };

  const info: ContextValue = {
    state,
    dispatch,
    handleChange,
    login: state.login,
    message,
    currentuser,
    user,
    handleLogin,
    handleLogout,
    accessToken,
    loader,
  };

  return (
    <UserAuthContext.Provider value={info}>{children}</UserAuthContext.Provider>
  );
};
