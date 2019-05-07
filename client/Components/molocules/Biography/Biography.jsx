import React, { Component } from 'react';
import SingleBiography from '../../atoms/SingleBiography/SingleBiography';
import * as DATA from '../../../constants/biographies';
import { Link } from 'react-router-dom';

import reactCookie from 'react-cookies';
import renderHTML from 'react-render-html';
import TweenOne from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';

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

export class Biography extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	redirect = (params) => {
		const title_en =
			params === '1'
				? DATA.BIOGRAPHY.one_title_en
				: DATA.BIOGRAPHY.two_title_en;
		const title_ru =
			params === '1'
				? DATA.BIOGRAPHY.one_title_ru
				: DATA.BIOGRAPHY.two_title_ru;
		const content_en =
			params === '1'
				? DATA.BIOGRAPHY.one_content_en
				: DATA.BIOGRAPHY.two_content_en;
		const content_ru =
			params === '1'
				? DATA.BIOGRAPHY.one_content_ru
				: DATA.BIOGRAPHY.two_content_ru;
		const img =
			params === '1'
				? 'https://ik.imagekit.io/gcwjdmqwwznjl/Prabhupada-Bio_BkS_T-HUE.png'
				: 'https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png';
		this.props.history.push({
			pathname: '/biograhyDetails',
			state: {
				title_en,
				title_ru,
				content_en,
				content_ru,
				img
			}
		});
	};

	render() {
		return (
			<section className="section section-lg text-center">
				<div className="container">
					<div className="row row-50">
						{/* <Card
							hoverable
							style={{ width: 440 }}
							cover={
								<img
									alt="example"
									src="https://ik.imagekit.io/gcwjdmqwwznjl/Prabhupada-Bio_BkS_T-HUE.png"
									onClick={() => this.redirect('1')}
								/>
							}>
							<Meta
								title={
									reactCookie.load('languageCode') === 'en'
										? DATA.BIOGRAPHY.one_title_en
										: DATA.BIOGRAPHY.one_title_ru
								}
								description={renderHTML(
									showing100Characters(
										reactCookie.load('languageCode') === 'en'
											? DATA.BIOGRAPHY.one_content_en
											: DATA.BIOGRAPHY.one_content_ru
									)
								)}
							/>
							<Link
								className="button-winona post-modern-title"
								to=" "
								onClick={() => this.redirect('1')}>
								Read More...
							</Link>
						</Card> */}

						{/* <Card
							hoverable
							style={{ width: 440 }}
							cover={
								<img
									alt="example"
									src="https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png"
									onClick={() => this.redirect('2')}
								/>
							}>
							<Meta
								title={
									reactCookie.load('languageCode') === 'en'
										? DATA.BIOGRAPHY.two_title_en
										: DATA.BIOGRAPHY.two_title_ru
								}
								description={renderHTML(
									showing100Characters(
										reactCookie.load('languageCode') === 'en'
											? DATA.BIOGRAPHY.two_content_en
											: DATA.BIOGRAPHY.two_content_ru
									)
								)}
							/>
							<Link
								className="button-winona post-modern-title"
								to=" "
								onClick={() => this.redirect('2')}>
								Read More...
							</Link>
            </Card> */}

						

						<SingleBiography
							img="https://ik.imagekit.io/gcwjdmqwwznjl/Prabhupada-Bio_BkS_T-HUE.png"
							title_en={DATA.BIOGRAPHY.one_title_en}
							title_ru={DATA.BIOGRAPHY.one_title_ru}
							content_en={DATA.BIOGRAPHY.one_content_en}
							content_ru={DATA.BIOGRAPHY.one_content_ru}
              />
              
						<SingleBiography
							img="https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png"
							title_en={DATA.BIOGRAPHY.two_title_en}
							title_ru={DATA.BIOGRAPHY.two_title_ru}
							content_en={DATA.BIOGRAPHY.two_content_en}
							content_ru={DATA.BIOGRAPHY.two_content_ru}
						/>
					</div>
				</div>
			</section>
		);
	}
}

export default Biography;
