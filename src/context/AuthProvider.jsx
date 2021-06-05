import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    JSON.parse(localStorage?.getItem("authUserToken"))
  );
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const initToken = async () => {
    const token = await getAccessTokenSilently();
    setUserToken(token);
    localStorage?.setItem("authUserToken", JSON.stringify(token));
  };

  const clearToken = async () => {
    setUserToken("");
    localStorage?.removeItem("authUserToken");
  };

  useEffect(() => {
    isAuthenticated ? initToken() : clearToken();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
