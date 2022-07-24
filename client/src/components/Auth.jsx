import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import styled from "styled-components";
import { loginData, signupData } from "../data/AuthData";
import InputField from "./InputField";

const AuthWrapper = styled.div`
  background-color: greenyellow;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AuthContent = styled.div`
  width: 80%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;
const Data = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  phoneNumber: "",
  avatarURL: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, phoneNumber, avatarURL, password } = form;
    const URL = "https://messaging-pager.herokuapp.com/auth";
    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignUp ? "signup" : "login "}`, {
      fullName: form.fullName,
      username,
      phoneNumber,
      avatarURL,
      password,
    });
    cookies.set("token", token);
    cookies.set("userId", userId);
    cookies.set("fullName", fullName);
    cookies.set("username", username);
    if (isSignUp) {
      cookies.set("hashedPassword", hashedPassword);
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
    }
    window.location.reload();
  };
  const switchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <AuthWrapper>
      <AuthContent>
        <h1>{isSignUp ? "SignUp" : "SignIn"}</h1>
        <form onSubmit={handleSubmit}>
          {isSignUp
            ? signupData.map((data) => (
                <Data key={data.name}>
                  <label htmlFor={data.name}>{data.label}</label>
                  <InputField
                    inputName={data.name}
                    placeholder={data.placeholder}
                    password={data.label.includes("Password") ? true : false}
                    onChange={handleChange}
                  />
                </Data>
              ))
            : loginData.map((data) => (
                <Data key={data.name}>
                  <label htmlFor={data.name}>{data.label}</label>
                  <InputField
                    inputName={data.name}
                    placeholder={data.placeholder}
                    password={data.label.includes("Password") ? true : false}
                    onChange={handleChange}
                  />
                </Data>
              ))}
          <div>
            <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
          </div>
        </form>
        <div>
          <span>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </span>
          <span onClick={switchMode}>{isSignUp ? "SignIn" : "SignUp"}</span>
        </div>
      </AuthContent>
    </AuthWrapper>
  );
};

export default Auth;
