import React, { Component } from 'react';
import base, {auth, googleProvider} from './base';

import Messages from './components/Messages';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.addMessage = this.addMessage.bind(this);
    
    this.state = { 
      messages: [],
      user: null
    };
  }
  componentWillMount() {
    // persist auth across sessions
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.authHandler(user);
      }
    });
    
    // this runs right before the <App> is rendered
    // TODO: add per account - `${this.props.params.storeId}/fishes`
    this.ref = base.syncState('messages', {
      context: this,
      state: 'messages'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  logout() {
    auth.signOut();
    this.setState({ user: null });
  }
  authenticate(type) {
    // TODO - choose provider based on type, right now choosing Google only
    console.log(`Trying to log in with ${type}`);
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        this.authHandler(result.user);
      }).catch((err) => {
        // TODO - show error message
      });
  }
  authHandler(user)  {
    this.setState({ user });
  }
  addMessage(message) {
    // update our state
    const messages = {...this.state.messages};
    // add in our new fmessag
    const timestamp = Date.now();
    messages[`message-${timestamp}`] = message;
    // set state
    this.setState({ messages });
  }
  removeMessage = (key) => {
    const messages = {...this.state.messages};
    messages[key] = null;
    this.setState({ messages });
  };
  render() {
    return (
      <div className='app'>
        <header>
          <div className="wrapper">
            <h1>Messaging App</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
            :
              <button onClick={() => this.authenticate('google')}>Log In</button>              
            }
          </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
            <Messages
              addMessage={this.addMessage}
              removeMessage={this.removeMessage}
              messages={this.state.messages}
              user={this.state.user}
            />
          </div>
          :
          <div className='wrapper'>
            <p>You must be logged in to send messages.</p>
          </div>
        }
      </div>
    );
  }
}

export default App;
