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
				<section className="section-lg text-center">
				<h3>TITLE GOES HERE </h3>
							<h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h4>
							<br />
							<br />
					<div className="container" >

					{/* style={{width: "268px", height: "289px",
						borderRadius: "4px",
						boxShadow: "0 22px 34px 0 rgba(0, 0, 0, 0.08)",
						border: "solid 1px rgba(151, 151, 151, 0.17)",
						backgroundColor: "#ffffff"}}> */}
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
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
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
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
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
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
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
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/summaries"
							/>
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/gallery.svg"
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
								image="images/mkv.svg"
								menu="MKV"
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/mkv"
							/>
							<SingleGridMenu 
                                handleNavigationClick={this.handleNavigationClick} 
                                image='images/lectures.svg' 
								menu={<p><Translate>{({ translate }) => translate('lecturesTitle')}</Translate></p>}
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit" 
                                link="/lectures" 
							/>
							{/* <SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/lectures.svg"
								menu="Sadhana Sheet"
								description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								link="/sadhanaList"
							/> */}
							<SingleGridMenu
								handleNavigationClick={this.handleNavigationClick}
								image="images/kirtan.svg"
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
