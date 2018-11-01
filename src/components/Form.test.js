import React from 'react';
import {mount} from 'enzyme';

import Form from './Form.js';
import * as actionCreators from '../redux/actionCreators/messageActionCreators';
import store from '../redux/store';

actionCreators.sendMessage = jest.fn();
store.dispatch = jest.fn();

afterEach(() => {
	actionCreators.sendMessage.mockClear();
	store.dispatch.mockClear();
});

it("autofocuses on mount", () => {
	const form = mount(<Form />);
	const input = form.find('input').instance();

	expect(document.activeElement).toEqual(input);
});

it("dispatches sendMessage on form submit when input is not empty", () =>  {
	const form = mount(<Form />);
	const domForm = form.find('form');
	const input = form.find('input');

	input.instance().value = 'test';

	domForm.simulate('submit');

	expect(actionCreators.sendMessage).toBeCalled();
	expect(store.dispatch).toBeCalled();
});

it("doesn't dispatch sendMessage on form submit when input is not empty", () =>  {
	const form = mount(<Form />);
	const domForm = form.find('form');
	const input = form.find('input');

	domForm.simulate('submit');

	expect(actionCreators.sendMessage).not.toBeCalled();
	expect(store.dispatch).not.toBeCalled();
});

it("clears input after the message is sent", () =>  {
	const form = mount(<Form />);
	const domForm = form.find('form');
	const input = form.find('input');

	input.instance().value = 'test';

	domForm.simulate('submit');

	expect(input.instance().value).toEqual('');
});