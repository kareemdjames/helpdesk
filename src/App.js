import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Nav, Header } from "./components/index";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Nav} />
      </Router>
    );
  }
}

export default App;
