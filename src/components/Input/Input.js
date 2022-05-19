import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.invalid);
  }

  let para = "";
  if (props.signup) {
    para = <p>{props.elementConfig.placeholder}</p>;
  } else if (props.login) {
    if (
      props.elementConfig.type === "text" ||
      props.elementConfig.type === "email"
    ) {
      para = <p>Username or Email</p>;
    } else {
      para = <p>{props.elementConfig.type}</p>;
    }
  }

  //     if (
  //         props.elementConfig.type === "text" ||
  //         props.elementConfig.type === "email"
  //       ) {
  //         para = <p>Username or Email</p>;
  //       } else {
  //         para = <p>{props.elementConfig.type}</p>;
  //       }
  //   }

  switch (props.elementType) {
    case "input":
      inputElement = { ...props.elementConfig.type }(
        <input
          className={inputClasses.join(" ")}
          //   {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "checkbox":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          //   {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          //   {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  //   const para = formElemArray.map((el) => {
  //     if (
  //       el.config.elementConfig.type === "email" ||
  //       el.config.elementConfig.type
  //     ) {
  //       return <p>Email or Username</p>;
  //     } else {
  //       return <p>Password</p>;
  //     }
  //   });

  //   const para = props.map((el) => {
  //     if (el.elementConfig.type === "email" || el.elementConfig.type === "text") {
  //       return <p>Email or Username</p>;
  //     } else {
  //       return <p>Passowrd</p>;
  //     }
  //   });

  return (
    <div className={classes.Input}>
      <div className={classes.LabelText}>{para}</div>
      <label className={classes.Label}>{props.para}</label>
      {inputElement}
    </div>
  );
};

export default input;
