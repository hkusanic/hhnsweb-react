import React from 'react';
import SingleGridMenu from '../../atoms/SingleGirdMenu/SingleGridMenu';
import Auth from '../../../utils/Auth';
import { Translate } from 'react-localize-redux';
export class GridLayoutMenus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
		};
	}
	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({ isUserLogin });
	}

	handleNavigationClick = () => {
		setTimeout(() => {
			$('.login-modal-2').removeClass('active');
			$('.register-modal-2').removeClass('active');
			if (this.state.isUserLogin) {
				$('.login-modal-2').addClass('active');
				$('.rd-navbar-toggle').removeClass('active');
				$('.rd-navbar-nav-wrap').removeClass('active');
			}
		}, 500);
	};

	render() {
		return (
			<div>
				<section
					className="section-lg text-center"
					style={{ position: 'relative', zIndex: '1' }}
				>
					<div className="container">
						<div className="row row-50 row-lg-70 offset-top-2">
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/audio.svg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.audio')}
										</Translate>
									</p>
								}
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/audio"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/video.svg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.video')}
										</Translate>
									</p>
								}
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/video"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/transcriptions.svg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.Transcriptions')}
										</Translate>
									</p>
								}
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/transcriptions"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/summaries.svg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.Summaries')}
										</Translate>
									</p>
								}
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/summaries"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/gallery.svg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.gallery')}
										</Translate>
									</p>
								}
								link="/gallery"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
							/>

							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/mkv.svg"
								menu="MKV"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/mkv"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/lectures.svg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('lecturesTitle')}
										</Translate>
									</p>
								}
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/lectures"
							/>

							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/kirtan.svg"
								menu="Kirtan"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/kirtan"
							/>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default GridLayoutMenus;
