import httpService from "httpService";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallbackContainer(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("code") !== undefined) {
      httpService.post('/oauth/token', {
        grant_type: 'authorization_code',
        client_id: 'B3xQUcXbzlcHEMWKp4tQo2QmquudSgKUvz1tyvTvbxw',
        redirect_uri: 'http://localhost:3000/callback',
        code: searchParams.get("code"),
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },[]);

  return (
    <>
      {searchParams.get("code")}
    </>
  );
}
