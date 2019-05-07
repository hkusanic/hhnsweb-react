import React from 'react';
import renderHTML from 'react-render-html';
import { Link, withRouter } from 'react-router-dom';
import reactCookie from 'react-cookies';

import { Card } from 'antd';
const { Meta } = Card;

function showing100Characters (sentence) {
	var result = sentence;
	var resultArray = result.split(' ');
	if (resultArray.length > 10) {
		resultArray = resultArray.slice(0, 30);
		result = resultArray.join(' ');
	}
	return result;
}

const SingleBiography = props => {
	return (
		<div className="col-md-6 wow-outer">
			<article className="post-modern wow slideInLeft">
				<Link
					to={{
						pathname: '/biograhyDetails',
						state: {
							title_en: props.title_en,
							title_ru: props.title_ru,
							content_en: props.content_en,
							content_ru: props.content_ru,
							img: props.img,
						},
					}}
				>
					<Card
						hoverable
						style={{ width: 440 }}
						cover={<img alt="example" src={props.img} />}
					>
						<Meta
							title={
								reactCookie.load('languageCode') === 'en'
									? props.title_en
									: props.title_ru
							}
							description={renderHTML(
								showing100Characters(
									reactCookie.load('languageCode') === 'en'
										? props.content_en
										: props.content_ru
								)
							)}
						/>
						<Link
							className="button-winona post-modern-title"
							to={{
								pathname: '/biograhyDetails',
								state: {
									title_en: props.title_en,
									title_ru: props.title_ru,
									content_en: props.content_en,
									content_ru: props.content_ru,
									img: props.img,
								},
							}}
						>
							Read More...
						</Link>
					</Card>
				</Link>
			</article>
		</div>
	);
};

export default withRouter(SingleBiography);
