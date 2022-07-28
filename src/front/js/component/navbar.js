import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = ({ data }) => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">JWT Authentication</span>
        </Link>
        {store.token && store.token != "" && store.token != undefined ? (
          <div className="ml-auto">
            <Link to="/login">
              <button
                className="btn btn-primary"
                onClick={() => {
                  actions.logout();
                }}
              >
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <div className="ml-auto">
            <Link to="/login">
              <button className="btn btn-primary">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-primary">Sign up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
