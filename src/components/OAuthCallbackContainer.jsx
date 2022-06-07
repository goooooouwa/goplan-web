import httpService from "httpService";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallbackContainer(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("code") !== undefined) {
      httpService.requestAccessTokenWithAuthorizationCode(searchParams.get("code"))
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },[navigate, searchParams]);

  return (
    <>
      {searchParams.get("code")}
    </>
  );
}
