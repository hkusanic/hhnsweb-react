import React from 'react';
import renderHTML from 'react-render-html';
import { Link, withRouter } from 'react-router-dom';
import reactCookie from 'react-cookies';

import { Card } from 'antd';
const { Meta } = Card;

function showing100Characters(sentence) {
	var result = sentence;
	var resultArray = result.split(' ');
	if (resultArray.length > 10) {
		resultArray = resultArray.slice(0, 30);
		result = resultArray.join(' ');
	}
	return result;
}

const redirect = (props) => {
	props.history.push({
		pathname: '/biograhyDetails',
		state: {
			title_en: props.title_en,
			title_ru: props.title_ru,
			content_en: props.content_en,
			content_ru: props.content_ru,
			img: props.img
		}
	});
};

const SingleBiography = (props) => {
	return (
		<div className="col-md-6 wow-outer">
			<article className="post-modern wow slideInLeft">
				<Card
					hoverable
					style={{ width: 440 }}
					cover={
						<img
							alt="example"
							src={props.img}
							onClick={() => redirect(props)}
						/>
					}>
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
						to=" "
						onClick={() => redirect(props)}>
						Read More...
					</Link>
				</Card>

				{/* <Link to={{ pathname: '/biograhyDetails', state: props }}>
					<img src={props.img} />
				</Link>
				<h4 className="post-modern-title">
					{reactCookie.load('languageCode') === 'en'
						? props.title_en
						: props.title_ru}
				</h4>
				{renderHTML(
					showing100Characters(
						reactCookie.load('languageCode') === 'en'
							? props.content_en
							: props.content_ru
					)
				)}
				<Link
					className="button-winona post-modern-title"
					to={{ pathname: '/biograhyDetails', state: props }}>
					Read More...
				</Link> */}
			</article>
		</div>
	);
};

export default withRouter(SingleBiography);
