import React from "react";
import { createContext, useContext } from "react";
import httpService from "services/httpService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const value = {
    getAccessToken: httpService.getAccessToken,
    getCurrentUserId: httpService.getCurrentUserId,
    signIn: httpService.signIn,
    handleOAuthCallback: httpService.handleOAuthCallback,
    logout: httpService.logout,
    goToAPIServer: httpService.goToAPIServer
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};