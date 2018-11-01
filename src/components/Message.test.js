import React from 'react';
import {shallow} from 'enzyme';
import {parse} from 'date-fns';

import Message from './Message';

const mockTime = 1534522911000;

window.author = 'foo';

it("renders message with ours class if current author matches message author", () => {
	const message = shallow(<Message message={{author: 'foo', message: 'test', timestamp: mockTime}} />);
	const messageDiv = message.find('.message');

	expect(messageDiv.hasClass('ours')).toEqual(true);
	expect(messageDiv.hasClass('theirs')).toEqual(false);
});

it("renders message with theirs class if current author doesn't match message author", () => {
	const message = shallow(<Message message={{author: 'bar', message: 'test', timestamp: mockTime}} />);
	const messageDiv = message.find('.message');

	expect(messageDiv.hasClass('ours')).toEqual(false);
	expect(messageDiv.hasClass('theirs')).toEqual(true);
});

it("formats date and time correctly", () => {
	const message = shallow(<Message message={{author: 'bar', message: 'test', timestamp: mockTime}} />);
	const time = message.find('.time');

	expect(time.text()).toMatch(/\d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}/);
});
