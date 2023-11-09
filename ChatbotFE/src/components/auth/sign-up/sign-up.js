import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sign-up.css";
import {
  setSignUpConfirmPass,
  setSignUpEmail,
  setSignUpPass,
} from "../../../redux/slices/auth-slice";
import { useDispatch, useSelector } from "react-redux";

export default function SignUp({ ws }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errors, setErrors] = useState(true);

  const { signUpPass, signUpConfirmPass, signUpEmail } = useSelector(
    (state) => state.auth
  );

  const handleCreateClick = () => {
    if (!errors) {
      const message = {
        action: "createUser",
        message: {
          username: signUpEmail,
          password: signUpPass,
          role: "User",
        },
      };
      console.log(JSON.stringify(message));
      ws.send(JSON.stringify(message));
      navigate("/");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleEmailChange = (e) => {
    dispatch(setSignUpEmail(e.target.value));
    if (emailError) {
      handleEmailBlur();
    }
  };

  const handlePasswordChange = (e) => {
    dispatch(setSignUpPass(e.target.value));
    if (passwordError) {
      handlePasswordBlur();
    }
  };

  const handleConfirmChange = (e) => {
    dispatch(setSignUpConfirmPass(e.target.value));
    if (confirmPasswordError) {
      handleConfirmBlur(e);
    }
  };

  const handleEmailBlur = () => {
    if (signUpEmail != "") {
      const emailRegex = /\S+@\S+\.\S+/;
      const validEmail = emailRegex.test(signUpEmail);
      setEmailError(!validEmail);
    }
  };

  const handlePasswordBlur = () => {
    if (signUpPass != "") {
      const validPassword = signUpPass.length >= 8;
      setPasswordError(!validPassword);
    }
  };

  const handleConfirmBlur = (e) => {
    if (signUpConfirmPass != "") {
      const validPassword = signUpPass === e.target.value;
      setConfirmPasswordError(!validPassword);
    }
  };

  useEffect(() => {
    setErrors(
      emailError ||
        passwordError ||
        confirmPasswordError ||
        signUpConfirmPass === "" ||
        signUpPass === "" ||
        signUpEmail === ""
    );
  }, [
    emailError,
    passwordError,
    confirmPasswordError,
    signUpConfirmPass,
    signUpEmail,
    signUpPass,
  ]);

  return (
    <div className="Signup-container">
      <img src="/utd-logo.png" className="Utd-logo" />
      <header className="Title-container">
        Create your account
        <input
          type="text"
          placeholder="Email address"
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          className={emailError ? "error" : ""}
        />
        {emailError && (
          <div className="error-message">Invalid email address.</div>
        )}
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          className={passwordError ? "error" : ""}
        />
        {passwordError && (
          <div className="error-message">
            Password must be at least 8 characters.
          </div>
        )}
        <input
          type="password"
          placeholder="Confirm password"
          onChange={handleConfirmChange}
          onBlur={(e) => handleConfirmBlur(e)}
          className={confirmPasswordError ? "error" : ""}
        />
        {confirmPasswordError && (
          <div className="error-message">Passwords do not match.</div>
        )}
        <button
          className={errors ? "Errors-button" : "Continue-button"}
          onClick={handleCreateClick}
        >
          Continue
        </button>
        <div className="subheader">
          Already have an account?{" "}
          <button className="Nav-back-login" onClick={handleLoginClick}>
            Log in
          </button>
        </div>
      </header>
    </div>
  );
}