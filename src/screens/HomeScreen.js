import React from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
const ip = require("../ipAddress");
const port = process.env.PORT || 5000;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      correctAnswer: 0,
      marks: 1,
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      token: "",
      questions: [],
      test: []
    };
  }

  componentDidMount() {
    let token = this.getTokenFromLocalStorage();
    this.getQuestionsFromDatabase(token);
  }

  getTokenFromLocalStorage = () => {
    let token = localStorage.token;
    console.log("My token" + token);
    this.setState({ token: token });

    return token;
  };

  getQuestionsFromDatabase = async token => {
    console.log("Hello token " + token);
    let headers = {
      "Content-Type": "application/json",
      Authorization: token
    };
    Axios.get(`http://${ip.default}:5050/admin/quiz`, {
      headers: headers
    })
      .then(res => {
        console.log("questions added");
        console.log(res.data);
        this.setState({ questions: res.data });
      })
      .catch(err => console.log("Error while fetching questions " + err));
  };

  saveQuestion = async () => {
    console.log("hello token " + this.state.token);
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };
    let options = [];
    options.push(this.state.option1);
    options.push(this.state.option2);
    options.push(this.state.option3);
    options.push(this.state.option4);
    Axios.post(
      `http://${ip.default}:5050/admin/quiz`,
      {
        options: options,
        marks: this.state.marks,
        questionDescription: this.state.description,
        correctAnswer: this.state.correctAnswer
      },
      {
        headers: headers
      }
    )
      .then(res => {
        this.setState({ questions: res.data });
        console.log("question saved " + this.state.questions);
      })
      .catch(err => console.log("Error while saving question " + err));
  };

  removeFromTest = id => {
    console.log(id);
    let test = this.state.test;
    for (let i = 0; i < test.length; i++) {
      if (test[i]._id == id) {
        test.splice(i, 1);
        console.log(test);
        this.setState({ test: test });
        break;
      }
    }
  };
  addToTest = item => {
    console.log(item);
    let test = this.state.test;
    if (test == null) {
      test = [];
    }
    test.push(item);
    this.setState({ test: test });
    console.log(this.state.test);
  };

  createTest = async () => {
    // let test = this.state.test;
    console.log(" create testhello token " + this.state.token);
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.state.token
    };

    Axios.post(
      `http://${ip.default}:5050/admin/test`,
      {
        questions: this.state.test
      },
      {
        headers: headers
      }
    )
      .then(res => {
        console.log("test created");
      })
      .catch(err => console.log("Error while saving test" + err));
  };

  render() {
    return (
      <div className="mainDiv">
        <div className="addQuestionDiv">
          <InputText
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
            style={{ color: "#000", width: 300, marginLeft: 200 }}
            placeholder="Description"
          />
          <InputText
            value={this.state.option1}
            onChange={e => this.setState({ option1: e.target.value })}
            style={{ color: "#000", width: 300, marginLeft: 200 }}
            placeholder="Option A"
          />
          <InputText
            value={this.state.option2}
            onChange={e => this.setState({ option2: e.target.value })}
            style={{ color: "#000", width: 300, marginLeft: 200 }}
            placeholder="Option B"
          />
          <InputText
            value={this.state.option3}
            onChange={e => this.setState({ option3: e.target.value })}
            style={{ color: "#000", width: 300, marginLeft: 200 }}
            placeholder="Option C"
          />
          <InputText
            value={this.state.option4}
            onChange={e => this.setState({ option4: e.target.value })}
            style={{ color: "#000", width: 300, marginLeft: 200 }}
            placeholder="Option D"
          />
          <InputText
            value={this.state.correctAnswer}
            onChange={e => this.setState({ correctAnswer: e.target.value })}
            style={{ color: "#000", width: 300, marginLeft: 200 }}
            placeholder={this.state.correctAnswer}
          />
          <InputText
            value={this.state.marks}
            onChange={e => this.setState({ marks: e.target.value })}
            style={{ color: "#000", width: 300, marginLeft: 200 }}
            placeholder={this.state.marks}
          />
          <Button
            label="Save Question"
            className="p-button-success"
            onClick={() => {
              this.saveQuestion();
            }}
          />
        </div>

        <div className="createQuizDiv">
          <Button
            label="Create Test"
            className="p-button-success"
            onClick={() => {
              this.createTest();
            }}
          />
          {this.state.questions.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  height: 50,
                  width: 100,
                  borderColor: "#000",
                  borderWidth: 2,
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <label style={{ color: "#000", marginLeft: 900 }}>
                  {item.questionDescription}
                </label>
                <Button
                  label="Add"
                  className="p-button-success"
                  onClick={() => {
                    this.addToTest(item);
                  }}
                />
                <Button
                  label="Remove"
                  className="p-button-danger"
                  onClick={() => {
                    this.removeFromTest(item._id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
