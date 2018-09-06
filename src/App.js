import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav, AddTicket, ViewTickets, Login, Home } from './components/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      data: ''
    };
  }

  render() {
    return (
      <Router>
        <div className="container">
          {this.state.authenticated ? (
            <Fragment>
              <Nav authenticated={this.state.authenticated} />
              <Route
                path="/"
                render={() => <Home userInfo={this.state.data} />}
              />
              <Route path="/view-ticket" component={ViewTickets} />
              <Route path="/add-ticket" component={AddTicket} />
            </Fragment>
          ) : (
            <Fragment>
              <Nav authenticated={this.state.authenticated} />
              <Route exact path="/login" component={Login} />
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
