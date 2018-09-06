import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav, AddTicket, ViewTickets } from './components/index';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" component={Nav} />
          <div className="container">
            <Route path="/add-ticket" component={AddTicket} />
            <Route path="/view-ticket" component={ViewTickets} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
