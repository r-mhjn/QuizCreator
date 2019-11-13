import React from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
const ip = require("../ipAddress");
const port = process.env.PORT || 5000;

export default class QuizScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      questions:[],
    };
  }

  componentDidMount() {
    let url = this.getTestId();
    this.getTest(url);
  }
  getTestId = () => {
    let url = window.location.pathname;
    this.setState({ url: url });
    console.log(url);
    return url;
  };

  getTest = async url => {
    await Axios.get(`http://${ip.default}:5050/user${url}`)
      .then(res => {
        console.log("questions added");
        this.setState({ questions: res.data.questions });
        console.log(this.state.questions);
      })
      .catch(err => console.log("Error while fetching questions " + err));
  };

  render() {
    return (
      <div>
        <div>
          {this.state.questions.map((item, index) => {
            return (
              <div key={index} style={{ width: 300, height: 250 }}>
                <p>{item.questionDescription}</p>
                
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
