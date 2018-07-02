import { TRY_AUTH } from './actionTypes';

export const tryAuth = (authData) => {
  return dispatch => {
    dispatch(authSignup(authData));
  };
};

export const authSignup = (authData) => {
  return dispatch => {
    fetch("API_LINK", {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      alert("Authentication failed");
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
    })
  };
};