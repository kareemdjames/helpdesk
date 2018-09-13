import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from './firebase';
import {
  Nav,
  AddTicket,
  ViewTickets,
  Login,
  Home,
  Logout
} from './components/index';
import ToastrContainer from 'react-toastr-basic';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      data: ''
    };
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('App user data', user);
        this.setState({
          authenticated: true,
          data: user.providerData
        });
      } else {
        this.setState({
          authenticated: false,
          data: ''
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    return (
      <Router>
        <div className="container">
          <ToastrContainer />
          <Route
            path="/logout"
            render={() => <Logout authenticated={this.state.authenticated} />}
          />
          {this.state.authenticated ? (
            <Fragment>
              <Nav authenticated={this.state.authenticated} />
              <Route
                exact
                path="/"
                render={() => <Home userInfo={this.state.data} />}
              />
              <Route path="/view-ticket" component={ViewTickets} />
              <Route path="/add-ticket" component={AddTicket} />
            </Fragment>
          ) : (
            <Fragment>
              <Nav authenticated={this.state.authenticated} />
              <Route path="/login" component={Login} />
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

export default App;

{
  /* <Route path="/" component={Nav} />
        <Route path="/add-ticket" component={AddTicket} />
        <Route path="/view-ticket" component={ViewTickets} /> */
}
