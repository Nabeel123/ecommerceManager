import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import LoginPage from "./components/LoginPage/LoginPage";

class App extends Component {
  state = {
    isAuthenticated: true,
  };

  changeStuff(status) {
    this.setState({ isAuthenticated: status });
  }

  render() {
    return (
      <BrowserRouter>
        {localStorage.getItem("user") ? (
          <Routes />
        ) : (
          <LoginPage changeHandler={this.changeStuff.bind(this)} />
        )}
      </BrowserRouter>
    );
  }
}

export default App;
