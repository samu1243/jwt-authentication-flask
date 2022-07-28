import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const PrivateTab = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.privateUser();
  }, []);

  return (
    <div>
      {sessionStorage.getItem("token") == undefined ? (
        <Navigate to={"/"} />
      ) : (
        <div className="text-center">
          <div>This is a private tab</div>
          <div>{`this is your token ${store.token}`}</div>
        </div>
      )}
    </div>
  );
};
