import { createContext, useContext, useState } from "react";

// let sharedState = {
//   token: "",
//   setToken: (value) => {
//     sharedState.token = value;
//   },
//   isLoggedIn: false,
//   setIsLoggedIn: (value) => {
//     sharedState.isLoggedIn = value;
//   },
//   JWTAccessToken: "",
//   setJWTAccessToken: (value) => {
//     sharedState.JWTAccessToken = value;
//   },
//   JWTRefreshToken: "",
//   setJWTRefreshToken: (value) => {
//     sharedState.JWTRefreshToken = value;
//   },
//   username: "",
//   setUsername: (value) => {
//     sharedState.username = value;
//   },
// };

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [JWTrefreshToken, setJWTRefreshToken] = useState("");
  const [JWTAccesstoken, setJWTAccesstoken] = useState("");
  const [JWTtokenExpiration, setJWTtokenExpiration] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [response, setResponse] = useState("");
  const [email, setEmail] = useState("");

  let sharedState = {
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    JWTAccesstoken,
    setJWTAccesstoken,
    JWTrefreshToken,
    setJWTRefreshToken,
    username,
    setUsername,
    error,
    setError,
    categories,
    setCategories,
    response,
    setResponse,
    email,
    setEmail,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
