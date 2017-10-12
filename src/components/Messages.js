import React from 'react';
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
            <button onClick={() => this.props.removeMessage(key)}>Remove</button>
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
    static propTypes = {
        messages: React.PropTypes.object.isRequired,
        removeMessage: React.PropTypes.func.isRequired,
        addMessage: React.PropTypes.func.isRequired,
        user: React.PropTypes.object.isRequired
    };

}

export default Messages;