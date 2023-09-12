import React, { useState, useCallback } from 'react';
import { useContext } from 'react';

const LoadingContext = React.createContext(null);

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const finishLoading = () => setLoading(false);

  const startLoading = () => setLoading(true);

  const contextValue = {
    loading,
    startLoading: useCallback(() => startLoading(), []),
    finishLoading: useCallback(() => finishLoading(), [])
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const { loading, startLoading, finishLoading } = useContext(LoadingContext);
  return { loading, startLoading, finishLoading };
}
