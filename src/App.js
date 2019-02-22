import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import Viewer from './components/Viewer';

import './base.scss';

class App extends Component {
  state = {
    users: [1, 2, 3],
    active: false,
    user: null
  };

  setUser = user => {
    this.setState({
      user,
      active: true
    });
  };

  selectUser = () => {
    if (window.confirm('Return to user select?')) {
      this.setState({
        active: false
      });
    }
  };

  render() {
    const { users, user, active } = this.state;
    return (
      <>
        <div className="container">
          {!active && (
            <>
              <h2>Welcome!</h2>
              <h3>Select your user</h3>
              <div className="user-button-container">
                {users.map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => this.setUser(i)}
                    className="user-button -green"
                  >
                    User {i}
                  </button>
                ))}
              </div>
            </>
          )}
          {active && (
            <>
              <button className="user-return" type="button" onClick={this.selectUser}>
                return
              </button>
              <Viewer user={user} />
            </>
          )}
        </div>
      </>
    );
  }
}

export default hot(App);
