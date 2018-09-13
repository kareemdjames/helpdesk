import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { firebaseApp, facebookProvider, googleProvider } from '../../firebase';
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
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
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
          console.log(res.user);
          this.setState({ redirect: true, data: res.user });
        }
      })
      .catch(err => {
        ToastDanger(err.message);
      });
  }

  authWithGoogle() {
    console.log('google');
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    firebaseApp
      .auth()
      .signInWithPopup(googleProvider)
      .then((res, err) => {
        if (err) {
          console.log('unable to sign in with Google');
        } else {
          console.log(res.user);
          this.setState({ redirect: true, data: res.user });
          console.log(this.state.redirect);
        }
      })
      .catch(err => {
        ToastDanger(err.message);
      });
  }

  authWithEmailPassword(e) {
    e.preventDefault();
    const email = this.emailField.value;
    const password = this.passwordField.value;
    firebaseApp
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then(provider => {
        if (provider.length === 0) {
          // Create new user
          firebaseApp.auth().setPersistence('session');
          return firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password);
        } else if (provider.indexOf('password') === -1) {
          this.loginForm.reset();
          ToastDanger('Wrong Password. Please try again!');
        } else {
          // Sign in user
          return firebaseApp.auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then(user => {
        if (user && user.email) {
          console.log('hello');
          this.setState({ redirect: true });
          this.loginForm.reset();
        }
      })
      .catch(err => {
        console.log(err);
        console.log('hello1');
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
