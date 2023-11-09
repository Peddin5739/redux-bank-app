export const loginRequest = (userName, password) => {
  if (userName === "naveen" && password === "Naveen@2628") {
    const data = { userName, password };
    fetch(
      " https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/logincheck",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error from logincheck", error);
      });
    return loginSuccess(userName);
  } else {
    return loginFailure("Incorrect username or password");
  }
};

export const loginSuccess = (user) => {
  return { type: "LOGIN_SUCCESS", payload: user };
};

export const loginFailure = (error) => {
  return { type: "LOGIN_FAILURE", payload: error };
};

export const clickSignin = () => {
  return { type: "SIGNIN" };
};
