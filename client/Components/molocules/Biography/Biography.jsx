import React, { Component } from 'react';
import SingleBiography from '../../atoms/SingleBiography/SingleBiography';
import * as DATA from '../../../constants/biographies';

export class Biography extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	redirect = params => {
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
				img,
			},
		});
	};

	render() {
		return (
			<section className="section" style={{top:'100px'}}>
				<div >
					<div className="row row-50">
						<SingleBiography
							// img="https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png"
							img="images/person1.jpg"
							title_en={DATA.BIOGRAPHY.two_title_en}
							title_ru={DATA.BIOGRAPHY.two_title_ru}
							content_en={DATA.BIOGRAPHY.two_content_en}
							content_ru={DATA.BIOGRAPHY.two_content_ru}
						/>
						<SingleBiography
							img="images/person2.jpg"
							title_en={DATA.BIOGRAPHY.one_title_en}
							title_ru={DATA.BIOGRAPHY.one_title_ru}
							content_en={DATA.BIOGRAPHY.one_content_en}
							content_ru={DATA.BIOGRAPHY.one_content_ru}
						/>
					</div>
				</div>
			</section>
		);
	}
}

export default Biography;
