import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import "./Login.css";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        console.log(typeof result);
        dispatch({ type: actionTypes.SET_USER, user: result });
      })
      .catch((error) => alert(error.message));
  };

  const signInGuest = () => {
    dispatch({
      type: actionTypes.SET_USER,
      user: {
        user: {
          uid: "dE4XjgXzgoecxZUwAaXLHgmnI2p1",
          displayName: "Calvin Schmidt",
        },
        additionalUserInfo: {
          profile: {
            first_name: "Calvin",
            picture: {
              data: {
                url:
                  "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3855179891205396&height=100&width=100&ext=1615995804&hash=AeSzhkeQ-hm69kDz_Kk",
              },
            },
          },
        },
      },
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          alt=""
        />
        <div className="login__text">
          <h1>Messenger</h1>
        </div>
        <div className="login__buttonsContainer">
          <Button type="submit" onClick={signIn}>
            Sign in With Facebook
          </Button>
          <Button type="submit" onClick={signInGuest}>
            Sign in to Test
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
