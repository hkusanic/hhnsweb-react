import React from 'react';
import moment from 'moment';
import Replies from './Replies.jsx';
import MathJax from 'react-mathjax-preview';
import commetsApi from '../../../utils/api/comment';
class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.modules = {
			toolbar: [
				[{ header: [1, 2, false] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ script: 'super' }, { script: 'sub' }],
				[{ list: 'ordered' }, { list: 'bullet' }],
				['clean'],
				['table'],
			],
		};
		this.state = {
			reply: false,
			commentReply: '',
			showAllReplies: false,
			replies: [],
		};
	}

	componentDidMount() {
		commetsApi
			.getReplies({ comment_uuid: this.props.comment.uuid })
			.then(response => {
				const replies = response.data.replies;
				this.setState({ replies });
			});
	}

	componentWillReceiveProps() {
		commetsApi
			.getReplies({ comment_uuid: this.props.comment.uuid })
			.then(response => {
				const replies = response.data.replies;
				this.setState({ replies });
			});
	}

	handleReply = () => {
		let reply = this.state.reply;
		reply = !reply;
		this.setState({ reply, commentReply: '' });
	};

	handleReplyChange = event => {
		const value = event.target.value;
		this.setState({
			commentReply: value,
		});
	};

	uuidv4 = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	};

	handleReplySubmit = () => {
		const body = {
			uuid: this.uuidv4(),
			comment_uuid: this.props.comment.uuid,
			author_name: `${this.props.user.firstName} ${this.props.user.last}`,
			author_email: this.props.user.email,
			message: this.state.commentReply,
			approved: '2',
		};
		this.setState(
			{
				reply: false,
				commentReply: '',
			},
			() => {
				this.props.createReply(body);
			}
		);
	};

	handleShowAllReplies = () => {
		this.setState({
			showAllReplies: !this.state.showAllReplies,
		});
	};

	handleDeleteComment = () => {
		this.props.deleteComment(this.props.comment.uuid);
	};

	checkUserEmail = () => {
		if (this.props.comment.author_email && this.props.userEmail) {
			if (this.props.comment.author_email === this.props.userEmail) {
				return true;
			}
		}
		return false;
	};

	render() {
		if (!this.state && !this.state.replies.length > 0) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<div className="comment-holder">
					<div className="clearafter">
						{/* <div className="comment-iconholder">
							<img
								src="https://ik.imagekit.io/gcwjdmqwwznjl/user_Hkl1ywJtN.png"
								alt="hello"
							/>
						</div> */}
						<div>
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
											{this.props.comment.author_name}{' '}
										</p>
										<div class="comment-classic-text">
											<p>
												<MathJax math={this.props.comment.message} />
											</p>
										</div>
										<ul class="comment-classic-meta">
											<li>
												<time datetime="2018">
													{moment(
														this.props.comment.dateCreated,
														'YYYYMMDDTHHmmssZ'
													).format('h:mm a, MMMM Do YYYY')}
												</time>
											</li>
											<li>
												{!this.state.reply ? (
													<a
														class="comment-classic-reply"
														onClick={this.handleReply}
														aria-label="reply"
													/>
												) : (
													<a
														class="comment-classic-cancelReply"
														onClick={this.handleReply}
														aria-label="cancel"
													/>
												)}
												{this.checkUserEmail() ? (
													<a
													class="comment-classic-delete"
													onClick={this.handleDeleteComment}
													aria-label="delete"
												/>
												) : null}
												{!this.state.showAllReplies ? (
												<a
													class="comment-classic-showAll"
													onClick={this.handleShowAllReplies}
													aria-label="showAll"
												/>
												) : (
													<a
													class="comment-classic-hideAll"
													onClick={this.handleShowAllReplies}
													aria-label="showAll"
												/>
												)}
												{/* <span>({this.state.replies.length})</span> */}
											</li>
										</ul>
									</div>
								</article>
							</div>
							{/* <div className="comments-header-type clearafter headerDiv">
								<div className="flexLeft">
									<span className="commented-person">
										{this.props.comment.author_name}
									</span>
									<span> commented on </span>
									<span>
										&nbsp;
										{moment(
											this.props.comment.dateCreated,
											'YYYYMMDDTHHmmssZ'
										).format('h:mm a, MMMM Do YYYY')}
									</span>
									<div className="comment_report posRight">
										<button className="button button-primary button-winona commentBtn">
											Report
										</button>
									</div>
								</div>
							</div>
							<div className="comments-block blockHeight">
								<MathJax math={this.props.comment.message} />
							</div> */}
							{this.state.reply ? (
								<textarea
									className="reply_textbox"
									placeholder="Submit Reply"
									style={{ width: '100%' }}
									type="text"
									value={this.state.commentReply}
									onChange={this.handleReplyChange}
									rows="2"
								/>
							) : null}

							<div style={{ margin: '5px 0 20px 0' }}>
								{/* <button
									className="button button-primary button-winona commentBtn"
									onClick={this.handleShowAllReplies}
								>
									{this.state.showAllReplies ? (
										<span>Hide all replies</span>
									) : (
										<span>Show All {this.state.replies.length} Replies</span>
									)}
								</button> */}
								{/* <button
									className="button button-primary button-winona commentBtn"
									style={{ margin: '0 0 0 10px' }}
									onClick={this.handleReply}
								>
									{this.state.reply ? (
										<span>Discard reply</span>
									) : (
										<span>Reply</span>
									)}
								</button> */}
								{/* {this.checkUserEmail() ? (
									<button
										className="button button-primary button-winona commentBtn"
										style={{ margin: '0 0 0 10px' }}
										onClick={this.handleDeleteComment}
									>
										<span>Delete</span>
									</button>
								) : null} */}
								{this.state.reply && this.state.commentReply.length > 0 ? (
									<button
										className="button button-primary button-winona commentBtn"
										onClick={this.handleReplySubmit}
										style={{ margin: '0 0 0 10px' }}
									>
										Submit Reply
									</button>
								) : null}
							</div>
							{this.state.showAllReplies &&
							this.state.replies &&
							this.state.replies.length > 0 ? (
								<Replies repliesArray={this.state.replies} />
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Comment;
