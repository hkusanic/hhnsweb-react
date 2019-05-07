import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import reactCookie from 'react-cookies';

export class SingleLecture extends Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<div className="col-md-6 scaleFadeInWrap">
				<div className="wow scaleFadeIn" data-wow-delay=".1s">
					<article className="post-modern">
						<h4 className="post-modern-title">
							<Link
								to={{ pathname: `/lectureDetails/${this.props.lecture.uuid}`, state: this.props.lecture }}
							>
								{renderHTML(this.props.lecture.en.title)}
							</Link>
						</h4>
						<ul className="post-modern-meta">
							<li>
								{reactCookie.load('languageCode') === 'en'
									? this.props.lecture.en.event
									: this.props.lecture.ru.event}
							</li>
							<li>
								{this.props.lecture.created_date
									? new Date(this.props.lecture.created_date).toDateString()
									: ''}
							</li>
						</ul>
					</article>
				</div>
			</div>
		);
	}
}
export default SingleLecture;
