import axios from 'axios';

import actionTypes from '../actionTypes';

const baseUrl = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0';
const token = 'UQngykNP5WHC';

export function requestMessages() {
	return {
		type: actionTypes.REQUEST_MESSAGES,
	};
}

export function receivedMessages(messages) {
	return {
		type: actionTypes.RECEIVED_MESSAGES,
		messages,
	};
}

export function messagesError(errors) {
	return {
		type: actionTypes.MESSAGES_ERROR,
		errors,
	};
}

export function fetchMessages(since, limit) {
	return dispatch => {
		dispatch(requestMessages());

		return axios.get(baseUrl, {
			params: {
				token,
				since,
				limit,
			},
		}).then(response => {
			dispatch(receivedMessages(response.data));
		}).catch(error => {
			if (error.response) {
				dispatch(messagesError(error.response.data));
			}
			else {
				dispatch(messagesError);
			}
		});
	};
}

export function sendMessageStart() {
	return {
		type: actionTypes.SEND_MESSAGE,
	};
}

export function messageSent(message) {
	return {
		type: actionTypes.MESSAGE_SENT,
		message,
	};
}

export function sendMessageError(errors) {
	return {
		type: actionTypes.SEND_MESSAGE_ERROR,
		errors,
	};
}

export function sendMessage(message) {
	return dispatch => {
		dispatch(sendMessageStart());

		return axios.post(baseUrl, {
			message,
			author: window.author,
		}, {
			headers: {
				token,
			},
		}).then(response => {
			response.data.timestamp = parseInt(response.data.timestamp, 10);
			dispatch(messageSent(response.data));
		}).catch(error => {
			if (error.response) {
				dispatch(sendMessageError(error.response.data));
			}
			else {
				dispatch(messagesError);
			}
		});
	};
}
