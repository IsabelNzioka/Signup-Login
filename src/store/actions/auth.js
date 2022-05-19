import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    types: actionTypes.AUTH_FAIL,
    error: error,
  };
};

// export const checkAuthTimeout = (expirationTime) => {
//     return (dispatch) => {
//         setTimeout( () => {
//             dispatch(log)
//         })
//     }
// }

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyB9nTBwOQGOyWcrcD4QeJHwFy3v2G9f0mo";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9nTBwOQGOyWcrcD4QeJHwFy3v2G9f0mo";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(console.log("There is no token")); //////////////////
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(console.log("...........Logout"));
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
      }
    }
  };
};
