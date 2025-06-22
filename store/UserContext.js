"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../hooks/Authhooks";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    // Run only on client
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
      setIsClientReady(true);
    }
  }, []);
  // console.log(token);
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useProfile(token, {
    enabled: isClientReady && !!token,
  });

  const login = (accessToken) => {
    localStorage.setItem("access_token", accessToken);
    setToken(accessToken);
    refetch();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken("");
  };

  const contextValue = {
    user,
    token,
    isLoading: isLoading || !isClientReady,
    isError,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
