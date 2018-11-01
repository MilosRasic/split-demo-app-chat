import actionTypes from '../actionTypes';

const initialState = {
	messages: [],
	unconfirmedMessages: [],
	loading: false,
	messagesErrors: null,
	sending: false,
	sendErrors: null,
};

export default function messages(state = initialState, action) {
	switch (action.type) {
		case actionTypes.REQUEST_MESSAGES:
			return {
				...state,
				messagesErrors: initialState.messagesErrors,
				loading: true,
			};

		case actionTypes.RECEIVED_MESSAGES:
			return {
				...state,
				messages: [...state.messages, ...action.messages],
				unconfirmedMessages: state.unconfirmedMessages.filter(unconfirmedMessage => action.messages.every(newMessage => unconfirmedMessage._id !== newMessage._id)),
				loading: false,
			};

		case actionTypes.MESSAGES_ERROR:
			return {
				...state,
				messagesErrors: action.errors,
				loading: false,
			};

		case actionTypes.SEND_MESSAGE:
			return {
				...state,
				sendErrors: initialState.sendErrors,
				sending: true,
			};

		case actionTypes.MESSAGE_SENT:
			return {
				...state,
				unconfirmedMessages: [...state.unconfirmedMessages, action.message],
				sending: false,
			};

		case actionTypes.SEND_MESSAGE_ERROR:
			return {
				...state,
				sendErrors: action.errors,
				sending: false,
			};

		default:
			return state;
	}
}
