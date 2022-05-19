import React from "react";

import classes from "./Login.module.css";

import { HiMenu } from "react-icons/hi";
import LoginData from "./LoginData/LoginData";

const Login = () => {
  return (
    <div className="App">
      <div className={classes.Sidebars}>
        <div className={classes.Left}>
          {/* <img src={image} alt="Prose" /> */}
          <div className={classes.Logo}>
            Isabel<span className={classes.Highlight}>.</span>
          </div>
        </div>

        <div className={classes.Right}>
          <div className={classes.Nav}>
            <HiMenu />
          </div>
          <div className={classes.RightAuthForm}>
            <LoginData />
          </div>
          <div className={classes.Copyright}>
            <p>
              Made with <span className={classes.Highlight}>love</span> Isabel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
