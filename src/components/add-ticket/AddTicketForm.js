import React, { Component, Fragment } from 'react';
import { database } from '../../firebase';

class AddTicketForm extends Component {
  constructor() {
    super();
    this.handlesubmitEvent = this.handlesubmitEvent.bind(this);
  }

  handlesubmitEvent(e) {
    e.preventDefault();
    let data = {
      date: Date(),
      email: this.refs.email.value.trim(),
      issueType: this.refs.issueType.value.trim(),
      department: this.refs.department.value.trim(),
      comments: this.refs.comment.value.trim()
    };

    // Push data to create new ticket with unique id
    database
      .ref()
      .child('helpdesk')
      .child('tickets')
      .push(data);

    // Retrieve update results once data is added
    database.ref().on('child_added', function(snapshot) {
      console.log('Ticket submitted successfully');
    });
  }

  render() {
    let style = { color: '#ffaaaa' };
    return (
      <Fragment>
        <br />
        <h2>Add Ticket</h2>
        <hr />
        <form ref="form" onSubmit={this.handlesubmitEvent}>
          <div className="form-group">
            <label htmlFor="email">
              Email <span style={style}>*</span>
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter email"
              required
              ref="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="issueType">
              Issue Type <span style={style}> *</span>
            </label>
            <select
              className="form-control"
              id="issueType"
              required
              ref="issueType"
            >
              <option value="">-----Select----</option>
              <option value="Access Related Issue">Access Related Issue</option>
              <option value="Email Related Issues">Email Related Issues</option>
              <option value="Hardware Request">Hardware Request</option>
              <option value="Health & Safety">Health & Safety</option>
              <option value="Network">Network</option>
              <option value="Intranet">Intranet</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">
              Assign Department
              <span style={style}> *</span>
            </label>
            <select
              className="form-control"
              id="department"
              required
              ref="department"
            >
              <option value="">-----Select----</option>
              <option value="Admin">Admin</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Development">Development</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comments">
              Comments <span style={style}> *</span>
            </label>
            (<span id="maxlength">200 </span> characters left)
            <textarea
              className="form-control"
              rows="3"
              id="comments"
              required
              ref="comment"
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="reset" className="btn btn-default">
              cancel
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default AddTicketForm;
