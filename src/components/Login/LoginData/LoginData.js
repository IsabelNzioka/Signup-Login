import React, { useState } from "react";
import { useNavigate } from "react-router";

import classes from "./LoginData.module.css";

import Input from "../../Input/Input";
import Button from "../../UI/Button/Button";

const LoginData = () => {
  const [loginForm] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your username",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Enter your password",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    // email: {
    //   elementType: "input",
    //   elementConfig: {
    //     type: "email",
    //     placeholder: "Enter your E-mail",
    //   },
    //   value: "",
    //   validation: {
    //     required: true,
    //   },
    //   valid: false,
    //   touched: false,
    // },
  });

  const [login] = useState(true);

  const formElemArray = [];
  for (let key in loginForm) {
    formElemArray.push({
      id: key,
      config: loginForm[key],
    });
  }

  let navigate = useNavigate();
  const btnsignup = () => {
    navigate("/signup");
  };

  return (
    <div className={classes.Login}>
      <h1> Sign In to Prose Beauty</h1>
      <form>
        {formElemArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            login={login}
          />
        ))}
        <Button btnType="Signin-signup">Sign In</Button>
        or
        <Button btnType="Switch" clicked={btnsignup}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default LoginData;
