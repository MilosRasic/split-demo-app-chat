import React, { Component } from 'react';
import {Provider} from 'react-redux';

import Form from './components/Form';
import Messages from './components/Messages';
import store from './redux/store';

import './Chat.css';

class Chat extends Component {
	render() {
		return (
			<React.Fragment>
				<Messages />

				<Form />
			</React.Fragment>
		);
	}
}

export default () => <Provider store={store}><App /></Provider>;
