import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { store, actions } = useContext(Context);

  const handleClick = async () => {
    let data = {
      username: username,
      password: password,
    };
    if (await actions.signup(data)) {
      navigate("/");
    } else {
      alert("User already exists, try again");
    }
  };

  return (
    <div className="text-center">
      {store.token && store.token != "" && store.token != undefined ? (
        <h1>You are already logged in!</h1>
      ) : (
        <div>
          <h1>Signup</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="Repeat Password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          ></input>
          {password == confirm && password.length > 0 ? (
            <button onClick={handleClick}>Sign up</button>
          ) : (
            <div>Passwords do not match</div>
          )}
          <Link to="/login">Already have an account?</Link>
        </div>
      )}
    </div>
  );
};
