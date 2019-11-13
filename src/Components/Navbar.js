import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "react-sidebar";

import Axios from "axios";
const ip = require("../ipAddress");

export default class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
      token: "",
      cart: []
    };
  }
  componentDidMount() {
    // this._getCartFromLocalStorage(); // yeh cart component ke mount hone pr fetch ho rahi ee local storage se pr apne ko logout click hone pr fetch karni ee
    this._getTokenFromLocalStorage();
  }
  _getTokenFromLocalStorage = () => {
    let token = localStorage.getItem("token");
    console.log("local storage " + token);
    this.setState({ token });
    this.forceUpdate();
  };
  _getCartFromLocalStorage = () => {
    console.log("getting caart");
    let cart = JSON.parse(localStorage.getItem("cart"));
    // this.setState({ cart });
    return cart;
  };

  logout = () => {
    let cart = this._getCartFromLocalStorage();
    console.log(cart);
    this._saveUserCart(cart);
    localStorage.removeItem("token");
    this.setState({ token: "" });
    this.forceUpdate();
  };

  _saveUserCart = async cart => {
    // TODO: check lagao add krte time ke product jo hai phlse se he user in local cart mai naa dala hoo aur agar dala hua aee toh uski sirf quantity increase kro
    console.log("State token" + this.state.token);

    console.log("saving user cart" + cart);
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };
    await Axios.post(
      `http://${ip.default}:5050/user/cart`,
      { cart: cart },
      {
        headers: headers
      }
    )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log("Error while saving cart to server " + err));
  };

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };
  render() {
    return (
      <div className="navBarDiv">
        <div className="navbarContent">
          <div
            onClick={() => this.onSetSidebarOpen(true)}
            className="menuButton"
          >
            <i
              className="fas fa-bars"
              style={{
                color: "#fff",
                marginRight: 15,
                marginLeft: 15,
                fontSize: 36
              }}
            />
          </div>
          <div>
            <span
              style={{ color: "#fff", paddingTop: 200 }}
              className="navbarHeader"
            >
              Quiz Generator
            </span>
          </div>
          <div className="logoutButton">
            <span
              className="logoutButtonText"
              onClick={() => {
                // alert('hey');
                this.logout();
              }}
            >
              {this.state.token == null ? "Login" : "Logout"}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
