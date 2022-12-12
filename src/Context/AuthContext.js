import { createContext, useEffect, useState } from "react";
import axios from "axios";

/* Reads the data from the Provider and changes INITIAL_STATE */
export const AuthContext = createContext(null);

/* Children here are the Components that need to get the data.[In this Application we specified App COmponent as Child in index.js so that we can server every every component exist in the app */
/* This will provide data to all the children that we are giving here */
export const AuthContextProvider = ({ children }) => {
  const [user, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        process.env.REACT_APP_API + "/api/auth/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data !== false) {
        console.log(tokenResponse.data);
        setUserData({
          token,
          user: tokenResponse.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUserData, count ,setCount }}>
      {children}
    </AuthContext.Provider>
  );
};
