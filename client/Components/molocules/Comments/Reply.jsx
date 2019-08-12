import React from 'react';
import MathJax from 'react-mathjax-preview';
import moment from 'moment';
class Reply extends React.Component {
	componentWillReceiveProps (props) {
		this.props = props;
	}

	render () {
		return (
			<div class="comment-classic-group">
				<article class="comment-classic">
					<figure class="comment-classic-figure">
						<img
							class="comment-classic-image"
							src="https://ik.imagekit.io/gcwjdmqwwznjl/user_Hkl1ywJtN.png"
							alt=""
							width="48"
							height="48"
						/>
					</figure>
					<div class="comment-classic-main">
						<p class="comment-classic-name">
							{this.props.replyItems.author_name}
							<span style={{ paddingLeft: '20px' }}>{moment(
								this.props.replyItems.dateCreated,
								'YYYYMMDDTHHmmssZ'
							).format('h:mm a, MMMM Do YYYY')}</span>
						</p>
						<div class="comment-classic-text">
							<p>
								<MathJax math={this.props.replyItems.message} />
							</p>
						</div>
					</div>
				</article>
			</div>
			// <div className="reply-item">
			// 	<div className="clearafter">
			// 		<div className="reply-icon">
			// 			<img
			// 				src="https://ik.imagekit.io/gcwjdmqwwznjl/user_Hkl1ywJtN.png"
			// 				alt="hello"
			// 			/>
			// 		</div>
			// 		<div className="commented-name">
			// 			<div className="flexLeft">
			// 				<span onClick={this.redirect} className="commented-person">
			// 					{this.props.replyItems.author_name}
			// 				</span>
			// 				<span> replied at </span>
			// 				<b>
			// 					<span>
			// 						{moment(
			// 							this.props.replyItems.dateCreated,
			// 							'YYYYMMDDTHHmmssZ'
			// 						).format('h:mm a, MMMM Do YYYY')}
			// 					</span>
			// 				</b>
			// 			</div>
			// 			<div className="comment_report">
			// 				<button className="button button-primary button-winona commentBtn">
			// 					Report
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<br />
			// 		<div className="reply-message">
			// 			<MathJax math={this.props.replyItems.message} />
			// 		</div>
			// 	</div>
			// </div>
		);
	}
}
export default Reply;
