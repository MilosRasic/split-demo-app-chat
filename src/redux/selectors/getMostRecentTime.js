const lastCall = {
	messages: null,
	result: null,
};

export default function getMostRecentTime({messages}) {
	if (messages === lastCall.messages) {
		return lastCall.result;
	}

	if (!messages || messages.length === 0) {
		return null;
	}

	const mostRecentTime = messages[messages.length - 1].timestamp;

	lastCall.messages = messages;
	lastCall.result = mostRecentTime;

	return mostRecentTime;
}