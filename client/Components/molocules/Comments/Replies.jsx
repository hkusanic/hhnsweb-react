import React from 'react';
// eslint-disable-next-line no-unused-vars
import Reply from './Reply.jsx';

class Replies extends React.Component {
	constructor (props) {
		super(props);
		this.keyCount = 0;
	}

	componentWillReceiveProps (props) {
		this.props = props;
	}
	render () {
		return (
			<div className="reply-holder replyDiv">
				{this.props.repliesArray && this.props.repliesArray.length > 0
					? this.props.repliesArray.map(item => (
						<Reply key={this.keyCount++} replyItems={item} />
					  ))
					: 'No Replies has been given'}
			</div>
		);
	}
}
export default Replies;
