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
				<section class="section-lg text-center" >
				<h3>TITLE GOES HERE </h3>
							<h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h4>
							<br />
							<br />
					<div class="container">
						<div class="row row-50 row-lg-70 offset-top-2">

							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/audio.jpg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.audio')}
										</Translate>
									</p>
								}
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/audio"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/video.jpg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.video')}
										</Translate>
									</p>
								}
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/video"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/tour-7-270x200.jpg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.Transcriptions')}
										</Translate>
									</p>
								}
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/transcriptions"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/tour-8-270x200.jpg"
								menu={
									<p>
										<Translate>
											{({ translate }) => translate('HOME.Summaries')}
										</Translate>
									</p>
								}
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/summaries"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/tour-1-270x200.jpg"
								menu="Gallery"
								link="/gallery"
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
							/>
							{/* <SingleGridMenu 
                                handleNavigationClick={this.handleNavigationClick} 
                                image='images/tour-2-270x200.jpg' 
                                menu={<p><Translate>{({ translate }) => translate('HOME.calendar')}</Translate></p>} 
                                link="/calender" /> */}
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/tour-3-270x200.jpg"
								menu="MKV"
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/mkv"
							/>
							{/* <SingleGridMenu 
                                handleNavigationClick={this.handleNavigationClick} 
                                image='images/tour-4-270x200.jpg' 
                                menu={<p><Translate>{({ translate }) => translate('lecturesTitle')}</Translate></p>} 
                                link="/lectures" /> */}
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/tour-4-270x200.jpg"
								menu="Sadhana Sheet"
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/sadhanaList"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/tour-3-270x200.jpg"
								menu="Kirtan"
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
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
