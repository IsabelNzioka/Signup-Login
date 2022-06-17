import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import classes from "./LoginData.module.css";

import Input from "../../Input/Input";
import Button from "../../UI/Button/Button";

import * as actions from "../../../store/actions/auth";

const LoginData = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: " E-mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: " password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
    // isSignup: true,
  });

  const [signup] = useState(true);
  const [isSignup] = useState(!true);

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, controlName) => {
    const updateLogin = {
      ...loginForm,
      [controlName]: {
        ...loginForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          loginForm[controlName].validation
        ),
        touched: true,
      },
    };
    setLoginForm(updateLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(loginForm.email.value, loginForm.password.value, isSignup);
  };

  const formElemArray = [];
  for (let key in loginForm) {
    formElemArray.push({
      id: key,
      config: loginForm[key],
    });
  }

  let navigate = useNavigate();

  let SigninSuccess = () => {
    if (!props.error) {
      navigate("/success");
    }
  };

  const signupBtn = () => {
    navigate("/signup");
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  return (
    <div className={classes.Login}>
      <h1> Sign in to Prose Beauty</h1>
      {/* {authRedirect} */}
      {errorMessage}

      <form onSubmit={submitHandler}>
        {formElemArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            signup={signup}
          />
        ))}
        <Button btnType="Signin-signup" clicked={SigninSuccess}>
          Sign in
        </Button>
        <Button btnType="Switch" clicked={signupBtn}>
          Sign up
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginData);
