import React from "react";
import { createContext, useContext } from "react";
import httpService from "services/httpService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const value = {
    getAccessToken: httpService.getAccessToken,
    getCurrentUserId: httpService.getCurrentUserId,
    signInPage: httpService.signInPage,
    handleOAuthCallback: httpService.handleOAuthCallback,
    handleOfflineMode: httpService.handleOfflineMode,
    logout: httpService.logout,
    logoutPage: httpService.logoutPage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};