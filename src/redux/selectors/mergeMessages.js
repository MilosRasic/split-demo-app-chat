const lastCall = {
	confirmed: null,
	unconfirmed: null,
	result: null,
};

export default function mergeMessages({messages: confirmed, unconfirmedMessages: unconfirmed}) {
	if (confirmed === lastCall.confirmed && unconfirmed === lastCall.unconfirmed) {
		return lastCall.result;
	}

	const merged = [...(confirmed || []), ...(unconfirmed || [])];

	lastCall.confirmed = confirmed;
	lastCall.unconfirmed = unconfirmed;
	lastCall.result = merged;

	return merged;
}