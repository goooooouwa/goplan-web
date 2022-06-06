import httpService from "httpService";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthCallbackContainer(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("code") !== undefined) {
      httpService.post('/oauth/authorize', {
        grant_type: 'authorization_code',
        client_id: '2fmUcuDYPwSA7EsCorNB1hpVMmvoLXr5jasJwX3WVfs',
        code: searchParams.get("code"),
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  });

  return (
    <>
      {searchParams.get("code")}
    </>
  );
}
