import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import {
	getComments,
	getReplies,
	createCommet,
	createReply,
	deleteComment,
	resetState,
} from '../../../actions/comment';
import Comment from './comment';

export class Comments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			username: '',
			subject: '',
			comment: '',
			comments: [],
		};
		this.props.resetState();
	}
	componentDidMount() {
		const user = JSON.parse(sessionStorage.getItem('user'));
		this.setState(
			{
				user,
			},
			() => {
				this.props.getComments({
					lecture_uuid: this.props.lecture_uuid,
				});
			}
		);
	}

	componentWillReceiveProps(nextProps) {
		if (
			!this.props.commentReducer.isCommentSubmited &&
			nextProps.commentReducer.isCommentSubmited
		) {
			this.setState(
				{
					username: '',
					comment: '',
					subject: '',
				},
				() => {
					this.props.getComments({
						lecture_uuid: this.props.lecture_uuid,
					});
				}
			);
		}
		if (
			!this.props.commentReducer.isCommentDeleted &&
			nextProps.commentReducer.isCommentDeleted
		) {
			this.props.getComments({
				lecture_uuid: this.props.lecture_uuid,
			});
		}
	}
	handleSubject = event => {
		const value = event.target.value;
		this.setState({
			subject: value,
		});
	};
	handleComment = event => {
		const value = event;
		this.setState({
			comment: value,
		});
	};
	handleUsername = event => {
		const value = event.target.value;
		this.setState({
			username: value,
		});
	};

	uuidv4 = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	};
	submitComment = event => {
		event.preventDefault();
		const body = {
			lecture_uuid: this.props.lecture_uuid,
			uuid: this.uuidv4(),
			message: this.state.comment,
			author_email: this.state.user.email,
			author_name: `${this.state.user.firstName} ${this.state.user.last}`,
			approved: false,
		};
		this.props.createCommet(body);
	};

	render() {
		if (!this.state.user) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<div>
					{this.props.commentReducer.comments.map((comment, index) => {
						return (
							<Comment
							 	key={index}
								comment={comment}
								replies={this.props.commentReducer.replies}
								user={this.state.user}
								createReply={this.props.createReply}
								getReplies={this.props.getReplies}
								deleteComment={this.props.deleteComment}
								userEmail={this.state.user.email}
							/>
						);
					})}
				</div>
				<div className="commentContainer">
					<form className="rd-form">
						<div className="row row-10">
							<div className="col-md-6 wow-outer">
								<div className="form-wrap wow fadeSlideInUp">
									<label htmlFor="contact-first-name">
										<b>User Name</b>
									</label>
									<input
										className="form-input inputBox"
										style={{ backgroundColor: '#f6f6f6' }}
										type="text"
										name="name"
										readOnly={true}
										value={`${this.state.user.firstName} ${
											this.state.user.last
										}`}
										onChange={event => {
											this.handleUsername(event);
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 wow-outer" />
							<div className="col-md-6 wow-outer">
								<div className="form-wrap wow fadeSlideInUp">
									<label htmlFor="contact-email">
										<b>Subject</b>
									</label>
									<input
										className="form-input inputBox"
										type="text"
										name="text"
										value={this.state.subject}
										onChange={event => {
											this.handleSubject(event);
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 wow-outer" />
							<div className="col-12 wow-outer">
								<div className="form-wrap wow fadeSlideInUp">
									<label htmlFor="contact-message">
										<b>Comment</b>
									</label>
									<ReactQuill
										className="commentBox"
										value={this.state.comment}
										onChange={this.handleComment}
									/>
								</div>
							</div>
						</div>
						<div className="group group-middle">
							<div className="wow-outer">
								<button
									className="button button-primary button-winona"
									onClick={event => {
										this.submitComment(event);
									}}
								>
									<span>Comment</span>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		commentReducer: state.commentReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getComments: body => {
			dispatch(getComments(body));
		},
		getReplies: body => {
			dispatch(getReplies(body));
		},
		createCommet: body => {
			dispatch(createCommet(body));
		},
		createReply: body => {
			dispatch(createReply(body));
		},
		deleteComment: uuid => {
			dispatch(deleteComment(uuid));
		},
		resetState: () => {
			dispatch(resetState());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Comments);
