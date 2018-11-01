import React from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns';

export default function Message(props) {
	return (
		<div className={`message ${props.message.author === window.author ? 'ours' : 'theirs'}`}>
			<span className="author">{props.message.author}</span>
			<span>{props.message.message}</span>
			<span className="time">{format(props.message.timestamp, 'D MMM YYYY H:mm')}</span>
		</div>
	);
}

Message.propTypes = {
	message: PropTypes.shape({
		author: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		timestamp: PropTypes.number.isRequired,
	}).isRequired,
};
