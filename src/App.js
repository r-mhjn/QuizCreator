import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";

import "./App.css";
// <Route path="/login" exact component={Login} />
// <Route path="/order" exact component={OrderScreen} />

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isloggedIn: false
    };
  }

  componentDidMount() {
    this._getTokenFromLocalStorage();
  }

  _getTokenFromLocalStorage = () => {
    let token = localStorage.getItem("token");
    console.log("My token" + token);
    if (token != null) {
      this.setState({ isloggedIn: true });
    }
    console.log(this.state.isloggedIn);
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        {this.state.isloggedIn === false ? (
          <Login />
        ) : (
          <Router>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/test" component={QuizScreen} />
          </Router>
        )}
      </div>
    );
  }
}

export default App;
