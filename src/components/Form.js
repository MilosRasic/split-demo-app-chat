import React from 'react';

import store from '../redux/store';
import {sendMessage} from '../redux/actionCreators/messageActionCreators';

export default class Form extends React.Component {
	constructor(props) {
		super(props);

		this.messageField = React.createRef();
	}

	componentDidMount() {
		this.messageField.current.focus();
	}

	handleSubmit = event => {
		event.preventDefault();

		const message = this.messageField.current.value;

		if (message) {
			store.dispatch(sendMessage(message));
			this.messageField.current.value = '';
		}
	};

	render() {
		return (
			<div className="layout form-wrapper">
				<form className="inner form" onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Message" className="form-field message-field" ref={this.messageField} aria-label="Message" aria-required />
					<button className="form-field send-button">Send</button>
				</form>
			</div>
		);
	}
}
