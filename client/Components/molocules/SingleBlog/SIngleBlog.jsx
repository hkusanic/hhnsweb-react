import React, { Component } from 'react';
import { Icon } from 'antd';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import reactCookie from 'react-cookies';
import { Card } from 'antd';
const { Meta } = Card;

export class SingleBlog extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	showing100Characters = (sentence) => {
		var result = sentence;
		var resultArray = result.split(' ');
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(' ') + '...';
		}
		return result;
	};

	render() {
		return (
			<div className="col-md-6 scaleFadeInWrap">
				<div className="wow scaleFadeIn" data-wow-delay=".1s">
					<article className="post-modern">
						{/* <h4 className="post-modern-title">
							<Link to={{ pathname: '/blogDetails', state: this.props.blog }}>
								{renderHTML(
									reactCookie.load('languageCode') === 'en'
										? this.props.blog.title_en
										: this.props.blog.title_ru
								)}
							</Link>
						</h4>
						<ul className="post-modern-meta">
							<li>by {this.props.blog.author}</li>
							<li>
								<time dateTime="2018">
									{new Date(this.props.blog.date).toDateString()}
								</time>
							</li>
						</ul>
						{renderHTML(
							this.showing100Characters(
								reactCookie.load('languageCode') === 'en'
									? this.props.blog.body_en
									: this.props.blog.body_ru
							)
            )} */}

						<Card style={{ width: 350 }}>
							<Meta
								title={
									<Link
										to={{ pathname: `/blogDetails/${this.props.blog.uuid}`, state: this.props.blog }}>
										{renderHTML(
											reactCookie.load('languageCode') === 'en'
												? this.props.blog.title_en
												: this.props.blog.title_ru
										)}
									</Link>
								}
								description={
									<div>
										<ul className="post-modern-meta">
											<li>by {this.props.blog.author}</li>
											<li>
												<time dateTime="2018">
													{new Date(this.props.blog.date).toDateString()}
												</time>
											</li>
										</ul>
										{renderHTML(
											this.showing100Characters(
												reactCookie.load('languageCode') === 'en'
													? this.props.blog.body_en
													: this.props.blog.body_ru
											)
										)}
									</div>
								}
							/>
						</Card>
					</article>
				</div>
			</div>
		);
	}
}
export default SingleBlog;
