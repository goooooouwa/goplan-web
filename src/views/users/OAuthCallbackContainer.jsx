import httpService from "services/httpService";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallbackContainer(props) {
  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    httpService.handleOAuthCallback(authorizationCode, () => {
      navigate("/");
    });
  },[authorizationCode, navigate]);

  return (
    <>
      {(authorizationCode === null) && (
        <Navigate to={'/'} />
      )}
    </>
  );
}
