import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { firebaseApp, facebookProvider } from '../../firebase';
import { ToastDanger } from 'react-toastr-basic';
import './LoginForm.css';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      data: null
    };
    this.authWithFacebook = this.authWithFacebook.bind(this);
  }

  authWithFacebook() {
    console.log('facebook');
    firebaseApp
      .auth()
      .signInWithPopup(facebookProvider)
      .then((res, err) => {
        if (err) {
          console.log('unable to sign in with Facebook');
        } else {
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        ToastDanger(err.message);
      });
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
