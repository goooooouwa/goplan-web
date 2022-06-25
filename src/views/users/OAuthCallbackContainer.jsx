import React, { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export default function OAuthCallbackContainer(props) {
  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get("code");
  const { handleOAuthCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleOAuthCallback(authorizationCode, () => {
      navigate("/", { replace: true });
    });
  },[authorizationCode, navigate, handleOAuthCallback]);

  return (
    <>
      {(authorizationCode === null) && (
        <Navigate to="/" replace />
      )}
    </>
  );
}
