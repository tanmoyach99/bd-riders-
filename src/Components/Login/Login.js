import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import "./Login.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [newUser, setNewUser] = useState(true);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
      success: false,
    phone : ""
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
        console.log(user);
      })
      .catch((error) => {});
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedOutUser);
      })
      .catch((error) => {});
  };

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      isFormValid = isEmailValid;
    }

    if (e.target.name === "password") {
      const isPassValid = e.target.value.length > 6;
      const passwordHasNum = /\d{1}/.test(e.target.value);

      isFormValid = passwordHasNum && isPassValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          setLoggedInUser(newUserInfo);
            console.log(loggedInUser.name);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);

          console.log(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
          displayName: name,
          
      })
      .then(() => {
        console.log("name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
      <div className="login">
          <Header></Header>
      <div className="sign-field">
        <h3>CREATE AN ACCOUNT</h3>
        <form className="form-control" style={{ textAlign: "center" }}>
          {newUser && <label htmlFor="name">Name</label>}
          <br />
          {newUser && (
            <input
              className="input-field"
              onBlur={handleBlur}
              name="name"
              type="name"
              placeholder="your name(min 3 character)"
              required
            />
          )}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input-field"
            onBlur={handleBlur}
            type="email"
            name="email"
            id=""
            placeholder="write your email"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input-field"
            onBlur={handleBlur}
            type="password"
            name="password"
            id=""
            placeholder="write your password"
            required
          />
          <br />
          {newUser && <label htmlFor="password"> Phone Number</label>}
          <br />
          {newUser && (
            <input
              className="input-field"
              onBlur={handleBlur}
              type="phone number"
              name="phone Number"
              id=""
              placeholder="Phone Number please!"
              required
            />
          )}
          <br />
          <input
            className="sign-buttons"
            onClick={handleSubmit}
            type="submit"
            value={newUser ? "sign-up" : "sign-in"}
          />
          {newUser ? (
            <p className="text">
              Already a member?{" "}
              <button
                style={{ color: "indianred" }}
                onClick={() => setNewUser(!newUser)}
              >
                Login
              </button>{" "}
            </p>
          ) : (
            <p className="text">
              Not a member{" "}
              <button
                style={{ color: "indianred" }}
                onClick={() => setNewUser(!newUser)}
              >
                sign up
              </button>
            </p>
          )}
        </form>
        <h6>Or</h6>
        {user.isSignedIn ? (
          <button className="google-buttons" onClick={handleSignOut}>
            sign out
          </button>
        ) : (
          <button className="google-buttons" onClick={handleGoogleSignIn}>
            google sign in
          </button>
        )}
      </div>
          <div style={{ textAlign:"center"}}>
        {user.success ? (
          <h3 style={{ color: "green" }}>
            user {newUser ? "created" : "logged in"} successfully
          </h3>
        ) : (
          <h3 style={{ color: "red" }}>{user.error}</h3 >
        )}
      </div>
    </div>
  );
};

export default Login;
