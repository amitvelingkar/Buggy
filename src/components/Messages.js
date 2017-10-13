import React from 'react';
import PropTypes from 'prop-types';
import AddMessageForm from './AddMessageForm';

class Messages extends React.Component {
    constructor() {
        super();
        this.renderMessage = this.renderMessage.bind(this);
    }
    renderMessage(key) {
        const message = this.props.messages[key];
        return (
          <div className="message-edit" key={key}>
            <div>{message.username || 'Anonymous'}: {message.text}</div>
            {message.author === this.props.user.email ?
                <button onClick={() => this.props.removeMessage(key)}>Remove</button> : null
            }
          </div>
        )
    }
    render() {
        return (
            <div>
                <h2>Messages</h2>
                {Object.keys(this.props.messages).map(this.renderMessage)}
                <AddMessageForm
                    addMessage={this.props.addMessage}
                    user={this.props.user}
                />
            </div>
          )
    }
}

Messages.propTypes = {
    messages: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object
    ]).isRequired,
    removeMessage: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Messages;