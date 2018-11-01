import React from 'react';
import {mount} from 'enzyme';

import {Messages} from './Messages.js';
import Message from './Message';

const mockFetchMessages = jest.fn();
const mockStore = {
	subscribe: () => {},
	dispatch: () => {},
	getState: () => {},
};
const mockMessages = [{"_id":"5b76a721ff2fd4001abd264f","message":"Hellow world","author":"Tom","timestamp":1534502689081,"token":"UQngykNP5WHC"},{"_id":"5b76b538ff2fd4001abd2650","message":"test","author":"John","timestamp":1534506296949,"token":"UQngykNP5WHC"},{"_id":"5b76b548ff2fd4001abd2651","message":"another one","author":"John","timestamp":1534506312724,"token":"UQngykNP5WHC"},{"_id":"5b76b6a7ff2fd4001abd2652","message":"working now?","author":"John","timestamp":1534506663294,"token":"UQngykNP5WHC"},{"_id":"5b76b7afff2fd4001abd2653","message":"and now?","author":"John","timestamp":1534506927037,"token":"UQngykNP5WHC"},{"_id":"5b76c282ff2fd4001abd2654","message":"test","author":"John","timestamp":1534509698078,"token":"UQngykNP5WHC"},{"_id":"5b76c28cff2fd4001abd2655","message":"another test","author":"John","timestamp":1534509708628,"token":"UQngykNP5WHC"},{"_id":"5b76c311ff2fd4001abd2656","message":"final test","author":"John","timestamp":1534509841821,"token":"UQngykNP5WHC"},{"_id":"5b76c422ff2fd4001abd2657","message":"hopefully really final","author":"John","timestamp":1534510114083,"token":"UQngykNP5WHC"},{"_id":"5b76c451ff2fd4001abd2658","message":"is this it?","author":"John","timestamp":1534510161787,"token":"UQngykNP5WHC"},{"_id":"5b76c86dff2fd4001abd2659","message":"what about now?","author":"John","timestamp":1534511213451,"token":"UQngykNP5WHC"},{"_id":"5b76c87bff2fd4001abd265a","message":"awesome","author":"John","timestamp":1534511227041,"token":"UQngykNP5WHC"},{"_id":"5b76c984ff2fd4001abd265b","message":"test","author":"John","timestamp":1534511492494,"token":"UQngykNP5WHC"}];

afterEach(() => {
	mockFetchMessages.mockClear();
});

it("calls fetchMessages on mount", () => {
	const messages = mount(<Messages fetchMessages={mockFetchMessages} messages={mockMessages} />);

	expect(mockFetchMessages).toBeCalled();
});

it("sets the first polling timeout on mount", () => {
	const messages = mount(<Messages fetchMessages={mockFetchMessages} messages={mockMessages} />);

	expect(messages.instance().polling).toBeTruthy();
});

it("resets the polling timeout when messages change", done => {
	const messages = mount(<Messages fetchMessages={mockFetchMessages} messages={mockMessages} />);

	const oldPolling = messages.instance().polling;

	messages.setProps({messages: [...mockMessages]}, () => {
		const newPolling = messages.instance().polling;

		expect(newPolling).toBeTruthy();
		expect(newPolling).not.toEqual(oldPolling);

		done();
	});
});

it("renders messages", () => {
	const messages = mount(<Messages fetchMessages={mockFetchMessages} messages={mockMessages} />);

	expect(messages.find(Message)).toHaveLength(mockMessages.length);
});
