import mergeMessages from './mergeMessages';

const mockMessages = [
	{message: 'test 1'},
	{message: 'test 2'},
	{message: 'test 3'},
];

const mockUnconfirmedMessages = [
	{message: 'test 4'},
	{message: 'test 5'},
];

it("returns empty array if neither array is set", () => {
	const result = mergeMessages({});

	expect(result).toHaveLength(0);
});

it("returns an array containing elements of both messages arrays", () => {
	const result = mergeMessages({messages: mockMessages, unconfirmedMessages: mockUnconfirmedMessages});

	expect(result).toHaveLength(mockMessages.length + mockUnconfirmedMessages.length);
	expect(result).toEqual(expect.arrayContaining(mockMessages));
	expect(result).toEqual(expect.arrayContaining(mockUnconfirmedMessages));
});

it ("returns a clone of unconfirmedMessages when messages is empty", () => {
	const result = mergeMessages({messages: [], unconfirmedMessages: mockUnconfirmedMessages});

	expect(result).toHaveLength(mockUnconfirmedMessages.length);
	expect(result).toEqual(expect.arrayContaining(mockUnconfirmedMessages));
});

it ("returns a clone of messages when unconfirmedMessages is empty", () => {
	const result = mergeMessages({messages: mockMessages, unconfirmedMessages: []});

	expect(result).toHaveLength(mockMessages.length);
	expect(result).toEqual(expect.arrayContaining(mockMessages));
});
