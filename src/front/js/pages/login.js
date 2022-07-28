import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log("this is your token", store.token);
  let navigate = useNavigate();

  const handleClick = async () => {
    let data = {
      username: username,
      password: password,
    };
    if (await actions.login(data)) {
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="text-center mt-5">
        {store.token && store.token != "" && store.token != undefined ? (
          <h1>You are already logged in</h1>
        ) : (
          <div>
            <h1>Login to continue</h1>
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
            <button onClick={handleClick}>Login</button>
            <div>
            <Link to='/signup'>Don't have an account?</Link>
            </div>
          </div>
        )}
    </div>
  );
};
