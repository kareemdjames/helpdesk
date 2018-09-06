import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="wrapper">
        <form
          className="form-signin"
          onSubmit={e => {
            this.authWithEmailPassword(e);
          }}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <h2 className="form-signin-heading">Login</h2>
          <input
            type="email"
            className="form-control"
            name="username"
            placeholder="Email Address"
            ref={input => {
              this.emailField = input;
            }}
            required
          />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            ref={input => {
              this.passwordField = input;
            }}
            required
          />
          <label className="checkbox">
            <input
              type="checkbox"
              value="remember-me"
              id="rememberMe"
              name="rememberMe"
            />{' '}
            Remember me
          </label>
          <button
            className="btn btn-lg btn-primary btn-block btn-normal"
            type="submit"
          >
            Login
          </button>
          <br />
          <button
            className="btn btn-lg btn-primary btn-facebook btn-block"
            type="button"
            onClick={() => {
              this.authWithFacebook();
            }}
          >
            Login with Facebook
          </button>
          <button
            className="btn btn-lg btn-primary btn-google btn-block"
            type="button"
            onClick={() => {
              this.authWithGoogle();
            }}
          >
            Login with Google
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
