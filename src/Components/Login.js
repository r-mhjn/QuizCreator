import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
const ip = require("../ipAddress");
const port = process.env.PORT || 5000;

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sign: true,
      login: false,
      email: "",
      password: "",
      phoneno: "",
      username: ""
    };
  }

  _login = async () => {
    // console.log(this.state.email);
    // console.log(port);
    await Axios.post(`http://${ip.default}:5050/admin/login/`, {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        console.log("responce " + res.data.token);
        this._saveTokenToLocalStorage(res.data.token);
        window.location = "/";
      })
      .catch(err => console.log("Error while log in " + err));
  };

  _saveTokenToLocalStorage = token => {
    localStorage.setItem("token", token);
  };

  _signUp = async () => {
    console.log(ip.default);
    console.log(this.state.email);
    console.log(port);
    await Axios.post(`http://${ip.default}:5050/user/register/`, {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      phoneno: this.state.phoneno
    })
      .then(res => {
        console.log(res.token);
        this._login();
      })
      .catch(err => console.log("Error while signing up " + err));
  };

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form action="/" className="login-form">
            <input
              type="text"
              placeholder="username"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              required
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              required
            />
            <button
              onClick={e => {
                e.preventDefault();
                this._login();
              }}
            >
              login
            </button>
            <p className="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
