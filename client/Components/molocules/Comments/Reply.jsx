import React from 'react';
import MathJax from 'react-mathjax-preview';
import moment from 'moment';
class Reply extends React.Component {
	componentWillReceiveProps (props) {
		this.props = props;
	}

	render () {
		return (
			<div className="reply-item">
				<div className="clearafter">
					<div className="reply-icon">
						<img
							src="https://ik.imagekit.io/gcwjdmqwwznjl/user_Hkl1ywJtN.png"
							alt="hello"
						/>
					</div>
					<div className="commented-name">
						<div className="flexLeft">
							<span onClick={this.redirect} className="commented-person">
								{this.props.replyItems.author_name}
							</span>
							<span> replied at </span>
							<b>
								<span>
									{moment(
										this.props.replyItems.dateCreated,
										'YYYYMMDDTHHmmssZ'
									).format('h:mm a, MMMM Do YYYY')}
								</span>
							</b>
						</div>
						<div className="comment_report">
							<button className="button button-primary button-winona commentBtn">
								Report
							</button>
						</div>
					</div>
					<br />
					<div className="reply-message">
						<MathJax math={this.props.replyItems.message} />
					</div>
				</div>
			</div>
		);
	}
}
export default Reply;
