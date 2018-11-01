import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Spinner from 'react-spinner';

import 'react-spinner/react-spinner.css';

import {fetchMessages} from '../redux/actionCreators/messageActionCreators';
import mergeMessages from '../redux/selectors/mergeMessages';
import getMostRecentTime from '../redux/selectors/getMostRecentTime';
import Message from './Message';

export class Messages extends React.Component {
	static propTypes = {
		messages: PropTypes.array.isRequired,
		loading: PropTypes.bool,
		errors: PropTypes.array,
		fetchMessages: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.wrapper = React.createRef();
	}

	componentDidMount() {
		this.props.fetchMessages();

		this.setupPolling();
	}

	getSnapshotBeforeUpdate() {
		return this.wrapper.current.scrollHeight - this.wrapper.current.scrollTop <= this.wrapper.current.clientHeight;
	}

	componentDidUpdate(prevProps, prevState, shouldScrollToBottom) {
		if (this.props.messages !== prevProps.messages) {
			if (shouldScrollToBottom || prevProps.messages.length === 0) {
				this.wrapper.current.scrollTop = this.wrapper.current.scrollHeight;
			}

			if (this.polling) {
				clearTimeout(this.polling)
			}

			this.setupPolling();
		}
	}

	componentWillUnmount() {
		clearInterval(this.polling);
	}

	setupPolling() {
		this.polling = setTimeout(() => {
			if (!this.props.loading) {
				this.props.fetchMessages(this.props.mostRecentTime);
			}
		}, 3000);
	}

	render() {
		return (
			<div className="layout messages-wrapper" ref={this.wrapper}>
				<div className="messages-holder"> 
					<div className="inner messages" role="log" aria-live="polite" aria-busy={this.props.loading}>
						{this.props.loading && <Spinner />}

						{this.props.messages.length && this.props.messages.map(message => (
							<Message message={message} key={message._id} />
						))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	messages: mergeMessages(state),
	loading: state.loading,
	errors: state.messagesErrors,
	mostRecentTime: getMostRecentTime(state),
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchMessages
		}, dispatch);

const ConnectedMessages = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default ConnectedMessages;
