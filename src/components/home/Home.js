import React, { Component, Fragment } from 'react';

class Home extends Component {
  render() {
    let props = this.props;
    let userPhoto = { width: '80px', height: '80px', marginTop: '10px' };
    return (
      <Fragment>
        {props.userInfo.map(profile => {
          return (
            <Fragment key={profile.uid}>
              <h2>{profile.displayName} - Welcome to HelpDesk Application</h2>
              <div style={userPhoto}>
                <img src={profile.photoURL} alt="user" />
                <br />
                <span>
                  <b>Email:</b>
                </span>
                {profile.email}
              </div>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

export default Home;
