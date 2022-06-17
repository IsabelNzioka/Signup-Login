import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import classes from "./SignupData.module.css";

import Input from "../../Input/Input";
import Button from "../../UI/Button/Button";

import * as actions from "../../../store/actions/auth";

const SignupData = (props) => {
  const [signupForm, setSignupForm] = useState({
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "first Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "last Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-mail",
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
        placeholder: "password",
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
  const [isSignup] = useState(true);

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
    const updatedSignup = {
      ...signupForm,
      [controlName]: {
        ...signupForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          signupForm[controlName].validation
        ),
        touched: true,
      },
    };
    setSignupForm(updatedSignup);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(signupForm.email.value, signupForm.password.value, isSignup);
  };

  const formElemArray = [];
  for (let key in signupForm) {
    formElemArray.push({
      id: key,
      config: signupForm[key],
    });
  }

  let navigate = useNavigate();

  const signinBtn = () => {
    setSignupForm((prevState) => ({
      ...prevState,
      isSignup: !prevState.isSignup,
    }));
    navigate("/");
  };

  let SignupSuccess = () => {
    if (!props.error) {
      navigate("/success");
    }
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  //   let authRedirect = null;
  //   if (props.isAuthenticated) {
  //     authRedirect = <Navigate to={props.authRedirectPath} />;
  //   }
  return (
    <div className={classes.Signup}>
      <h1 className={classes.Heading}> Sign Up to Prose Beauty</h1>
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
        <Button btnType="Signin-signup" clicked={SignupSuccess}>
          Sign up
        </Button>
        or
        <Button btnType="Switch" clicked={signinBtn}>
          Sign in
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupData);
