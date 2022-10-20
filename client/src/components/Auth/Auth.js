import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import Navbar from "../Navbar/Navbar";
import { login } from '../../action';
import Button from '../Button/Button';
const Auth = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };
  const [passwordField,setPasswordField] = useState("password");
  return (
    <> 
      <div className="loginContainer">
        <div className="login">
          <form id="loginForm" onSubmit={handleSubmit}>
            <div id="text">Login</div>
            <input
              type="text"
              name="email"
              id=""
              placeholder="Email address"
              autoComplete="off"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
            />
            <br />
            <input
              type={passwordField}
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              value={formData.password}
            />
            <br />
            <input type="checkbox" name="showPassword" id="showPassword" onChange={(e)=> e.target.checked ? setPasswordField("text") : setPasswordField("password")} />
            <label id="showpassword" for="showPassword">Show Password</label> <br />
            <Button type="submit" title="Login" className="btn-one" /><br />
            <Link to="/" id="forgetPass">
              Forget password?
            </Link>{" "}
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default Auth