import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <div
        className="navbar navbar-dark bg-dark navbar-expand-lg"
        role="navigation"
      >
        <Link to="/" className="navbar-brand" href="#">
          Help Desk
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/">
              Home
            </Link>
            <Link className="nav-item nav-link" to="/view-ticket">
              Tickets
            </Link>
            <Link className="nav-item nav-link" to="/add-ticket">
              Add new ticket
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
