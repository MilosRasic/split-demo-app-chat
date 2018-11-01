import messages from './messages';
import * as actionCreators from '../actionCreators/messageActionCreators';

const initialState = messages(undefined, {type: 'test'});

const mockMessages = [
	{message: 'test 1', _id: 1},
	{message: 'test 2', _id: 2},
	{message: 'test 3', _id: 3},
];

const mockErrors = ['test error'];

describe("message fetching", () => {
	it("clears errors and sets loading flag on REQUEST_MESSAGES", () => {
		const newState = messages(initialState, actionCreators.requestMessages());

		expect(newState).toEqual(expect.objectContaining({
			loading: true,
			messagesErrors: initialState.messagesErrors,
		}));
	});

	it("sets messages, purges unconfirmed messages and clears loading flag on first RECEIVED_MESSAGES"  , () => {
		const newState = messages(initialState, actionCreators.receivedMessages(mockMessages));

		expect(newState).toEqual(expect.objectContaining({
			loading: false,
			messages: expect.arrayContaining(mockMessages),
			unconfirmedMessages: initialState.unconfirmedMessages,
		}));
	});

	it("sets messages, purges unconfirmed messages and clears loading flag on subsequent RECEIVED_MESSAGES"  , () => {
		const intermediateState = {
			...initialState,
			messages: mockMessages,
			unconfirmedMessages: [
				{message: 'test 4', _id: 4},
				{message: 'test 5', _id: 5},
			],
		};

		const newMessages = [
			{message: 'test 4'},
		];

		const newState = messages(intermediateState, actionCreators.receivedMessages(newMessages));

		expect(newState).toEqual(expect.objectContaining({
			loading: false,
			messages: expect.arrayContaining([...mockMessages, ...newMessages]),
		}));
		expect(newState.unconfirmedMessages).not.toEqual(expect.arrayContaining(newMessages));
		expect(newState.messages).not.toEqual(expect.arrayContaining(newState.unconfirmedMessages));
	});

	it("sets the errors and clears the loading flag on MESSAGES_ERROR"  , () => {
		const newState = messages(initialState, actionCreators.messagesError(mockErrors));

		expect(newState).toEqual(expect.objectContaining({
			loading: false,
			messagesErrors: mockErrors,
		}));
	});
});

describe("message fetching", () => {
	it("clears sending errors and sets sending flag on SEND_MESSAGE"  , () => {
		const newState = messages(initialState, actionCreators.sendMessageStart());

		expect(newState).toEqual(expect.objectContaining({
			sending: true,
			sendErrors: initialState.sendErrors,
		}));
	});

	it("adds sent message to unconfirmedMessages and clears the sending flag on MESSAGE_SENT"  , () => {
		const newState = messages(initialState, actionCreators.messageSent(mockMessages[0]));

		expect(newState).toEqual(expect.objectContaining({
			sending: false,
			unconfirmedMessages: expect.arrayContaining([mockMessages[0]]),
		}));
	});

	it("sets send errors and clears the sending flag on SEND_MESSAGE_ERROR"  , () => {
		const newState = messages(initialState, actionCreators.sendMessageError(mockErrors));

		expect(newState).toEqual(expect.objectContaining({
			sending: false,
			sendErrors: mockErrors,
		}));
	});
});
