import httpService from "httpService";
import React, { useEffect, useState } from "react";

export default function AccountContainer(props) {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    imageUrl: "",
  });

  useEffect(() => {
    httpService.get('/me.json')
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.imageUrl}</p>
    </>
  );
}
