import React, { Component } from 'react';
import fire, { auth, provider } from './fire';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    
    this.state = { 
      messages: [],
      user: null
    };
  }
  componentWillMount() {
    // persist auth across sessions
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
      }
    });
     /* Create reference to messages in Firebase Database */
     let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
     messagesRef.on('child_added', snapshot => {
       /* Update React state when message is added at Firebase Database */
       const item = snapshot.val();
       let message = { text: item.text, username: item.username, author: item.author, id: snapshot.key };
       this.setState({ messages: [message].concat(this.state.messages) });
     })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    let message = {
      text: this.inputEl.value,
      username: this.state.user.displayName,
      author: this.state.user.email
    };
    fire.database().ref('messages').push( message );
    this.inputEl.value = ''; // <- clear the input
  }
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({ user: null });
    });
  }
  login() {
    auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      this.setState({ user });
    });
  }
  removeItem(id) {
    const messagesRef = fire.database().ref(`messages`);
    messagesRef.child(id).remove();
  }
  render() {
    return (
      <div className='app'>
        <header>
          <div className="wrapper">
            <h1>Messaging App</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
            :
              <button onClick={this.login}>Log In</button>              
            }
          </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
            <form onSubmit={this.addMessage.bind(this)}>
              <input type="text" ref={ el => this.inputEl = el }/>
              <input type="submit"/>
            </form>
            <ul>
              { /* Render the list of messages */
                this.state.messages.map( message => 
                <li key={message.id}>{message.username || 'Anonymous'}: {message.text}
                  {message.author === this.state.user.email ? 
                      <button onClick={() => this.removeItem(message.id)}>Remove Item</button> 
                      :
                      null
                  }
                </li>
              )}
            </ul>
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
