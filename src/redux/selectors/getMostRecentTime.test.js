import getMostRecentTime from './getMostRecentTime';

it("returns null if messages array is falsy", () => {
	const result = getMostRecentTime({});

	expect(result).toEqual(null);
});

it("returns null if messages array is empty", () => {
	const result = getMostRecentTime({messages: []});

	expect(result).toEqual(null);
});

it("returns time of the last element of the messages array", () => {
	const result = getMostRecentTime({messages: [
		{timestamp: 1534596190},
		{timestamp: 1534596191},
		{timestamp: 1534596192},
		{timestamp: 1534596193},
		{timestamp: 1534596194},
		{timestamp: 1534596195},
	]});

	expect(result).toEqual(1534596195);
});