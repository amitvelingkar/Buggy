import React from 'react';

class AddMessageForm extends React.Component {
    createMessage(e) {
        e.preventDefault();

        const message = {
            text: this.message.value,
            username: this.props.user.displayName,
            author: this.props.user.email
        };

        this.props.addMessage(message);
        this.messageForm.reset();
    }

    render() {
        return (
            <form ref={(input) => this.messageForm = input} className="message-edit" onSubmit={(e) => this.createMessage(e)}>
                <input ref={(input) => this.message = input} type="text" placeholder="Message" />
                <button type="submit">+ Add Message</button>
            </form>
        )
    }
}

AddMessageForm.propTypes = {
    addMessage: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired
}

export default AddMessageForm;