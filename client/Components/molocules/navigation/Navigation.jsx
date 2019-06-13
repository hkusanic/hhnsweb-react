import React, { Component } from 'react';
import { setActiveLanguage, withLocalize } from 'react-localize-redux';
import { Select } from 'antd';
import Login from './../../../containers/Login/Login';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../../../utils/Auth';
import { Translate } from 'react-localize-redux';
import { LanguageSwitch } from '../../atoms/LanguageSwitch/LanguageSwitch';
import * as DATA from '../../../constants/biographies';
import reactCookie from 'react-cookies';


const Option = Select.Option;

export class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			Niranjana_swami_bio: '',
			Prabhupada_swami_bio: '',
			floatImage: '',
			index: 1,
			redirect: false,
			login: false,
		};
	}

	componentDidMount() {
		const Prabhupada_swami_bio = {
			img: 'https://ik.imagekit.io/gcwjdmqwwznjl/Prabhupada-Bio_BkS_T-HUE.png',
			title_en: DATA.BIOGRAPHY.one_title_en,
			title_ru: DATA.BIOGRAPHY.one_title_ru,
			content_en: DATA.BIOGRAPHY.one_content_en,
			content_ru: DATA.BIOGRAPHY.one_content_ru,
		};
		const Niranjana_swami_bio = {
			img: 'https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png',
			title_en: DATA.BIOGRAPHY.two_title_en,
			title_ru: DATA.BIOGRAPHY.two_title_ru,
			content_en: DATA.BIOGRAPHY.two_content_en,
			content_ru: DATA.BIOGRAPHY.two_content_ru,
		};
		const isUserLogin = Auth.isUserAuthenticated();
		let tabIndex = localStorage.getItem('tabIndex');
		if (tabIndex) {
			tabIndex = parseInt(tabIndex, 10);
		}
		this.setState({
			isUserLogin,
			Niranjana_swami_bio,
			Prabhupada_swami_bio,
			index: tabIndex ? tabIndex : 1,
		});

		window.addEventListener('scroll', this.handleScroll);
	}

	handleRedirect = () => {
		this.setState({ redirect: !this.state.redirect });
	};

	handleLogin = () => {
		this.setState({ login: !this.state.login });
	};

	componentWillReceiveProps() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({ isUserLogin });
	}

	componentWillMount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = event => {
		if ($('.rd-navbar--is-stuck')) {
			if ($('.rd-navbar--is-stuck').length === 1) {
				if (this.state.floatImage === '')
					this.setState({ floatImage: 'styleImage' });
			} else {
				if (this.state.floatImage === 'styleImage')
					this.setState({ floatImage: '' });
			}
		}
	};

	handleNavigationClick = index => {
		this.handleTabIndex(index);
		$('.login-modal-2').removeClass('active');
		$('.register-modal-2').removeClass('active');
		if (this.state.isUserLogin) {
			$('.login-modal-2').addClass('active');
			$('.rd-navbar-toggle').removeClass('active');
			$('.rd-navbar-nav-wrap').removeClass('active');
		}
	};

	handleRemoveModal = index => {
		this.handleTabIndex(index);
		$('.login-modal-2').removeClass('active');
		$('.rd-navbar-nav-wrap').removeClass('active');
		$('.register-modal-2').removeClass('active');
		$('.rd-navbar-toggle').removeClass('active');
	};

	handleTabIndex = index => {
		// alert('inside handletabindex: ' + index);
		if (index) {
			this.setState({ index });
		}
		localStorage.setItem('tabIndex', index);
	};

	handleBiographyClick = () => {
		$('.biography-submenu').removeClass('focus');
		$('.biography-submenu').removeClass('opened');
	};

	languageToggle (language) {
		setActiveLanguage(language);
		reactCookie.save('languageCode', language, { path: '/' });
		window.location.reload();

	}

	render() {
		const maxWidth = window.screen.width;
		let currentLanguage = 'en';
		if (reactCookie.load('languageCode')) {
			currentLanguage = reactCookie.load('languageCode');
		}
		return (
			<div>
				<header className="section page-header">
					<div className="rd-navbar-wrap">
						<nav
							className="rd-navbar rd-navbar-corporate"
							data-layout="rd-navbar-fixed"
							data-sm-layout="rd-navbar-fixed"
							data-md-layout="rd-navbar-fixed"
							data-md-device-layout="rd-navbar-fixed"
							data-lg-layout="rd-navbar-static"
							data-lg-device-layout="rd-navbar-fixed"
							data-xl-layout="rd-navbar-static"
							data-xl-device-layout="rd-navbar-static"
							data-xxl-layout="rd-navbar-static"
							data-xxl-device-layout="rd-navbar-static"
							data-lg-stick-up-offset="46px"
							data-xl-stick-up-offset="46px"
							data-xxl-stick-up-offset="46px"
							data-lg-stick-up="true"
							data-xl-stick-up="true"
							data-xxl-stick-up="true"
						>
							<div className="rd-navbar-aside-outer banner outSideBanner banner1">
								{maxWidth <= 1210 ? (
									<div className="rd-navbar-aside head ">
										<div className="rd-navbar-panel">
											<button
												className="rd-navbar-toggle"
												data-rd-navbar-toggle="#rd-navbar-nav-wrap-1"
											>
												<span />
											</button>
											<div style={{ width: '100%' }}>
												<div className="topMenu" style={{ float: 'right' }}>
													<ul className="rd-navbar-nav">
														<li className="rd-nav-item">
															<li>
																<a className="rd-nav-link">
																	<Login
																		notActive={false}
																		handleRedirect={this.handleRedirect}
																		handleLogin={this.handleLogin}
																		handleTabIndex={this.handleTabIndex}
																	/>
																</a>
															</li>
														</li>
													</ul>
												</div>
												<div
													className="topMenu languageToggle"
													style={{ float: 'right' }}
												>
													<ul className="rd-navbar-nav">
														<li className="rd-nav-item">
															<LanguageSwitch />
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								) : (
									''
								)}
								<img
									className="img-banner-width"
									src="https://ik.imagekit.io/gcwjdmqwwznjl/banner1_HyhqTWrIE.png"
								/>
							</div>
							<div className="bg-gray-100" style={{width: '100vw', backgroundColor:'#f6f6f6'}}>
							<div className="rd-navbar-main-outer menubanner container">
								{/* <div className="menulogoDiv">
									<img
										className={'menulogoImg' + ' ' + this.state.floatImage}
										src="https://ik.imagekit.io/gcwjdmqwwznjl/logo_S1yq6Zr8N.png"
									/>
								</div> */}
								<div className="rd-navbar-main MenuPad">
									<div
										className="rd-navbar-nav-wrap padTopMenu"
										id="rd-navbar-nav-wrap-1"
									>
										<ul className= {maxWidth >= 1200 ?"rd-navbar-nav navbarItemAlign" : "rd-navbar-nav"}>
											<li
												onClick={() => {
													this.handleRemoveModal(1);
												}}
												className="rd-nav-item"
											>
												<Link
													className={`rd-nav-link ${
														this.state.index === 1 ? 'active1' : ''
													} `}
													to="/"
												>
													<Translate>
														{({ translate }) => translate('HOME.home')}
													</Translate>
												</Link>
											</li>
											<li className="rd-nav-item biography-submenu">
												<a
													className={`rd-nav-link ${
														this.state.index === 2 ? 'active1' : ''
													} `}
												>
													<Translate>
														{({ translate }) => translate('HOME.biography')}
													</Translate>
												</a>
												<ul className="rd-menu rd-navbar-dropdown">
													<li
														onClick={() => {
															this.handleRemoveModal(2);
														}}
														className="rd-dropdown-item"
													>
														<Link
															to={{
																pathname: '/biograhyDetails',
																state: this.state.Niranjana_swami_bio,
															}}
															onClick={this.handleBiographyClick}
															className="rd-dropdown-link"
														>
															<Translate>
																{({ translate }) =>
																	translate('HOME.niranjanaswami')
																}
															</Translate>
														</Link>
													</li>
													<li
														onClick={() => {
															this.handleRemoveModal(2);
														}}
														className="rd-dropdown-item"
													>
														<Link
															to={{
																pathname: '/biograhyDetails',
																state: this.state.Prabhupada_swami_bio,
															}}
															onClick={this.handleBiographyClick}
															className="rd-dropdown-link"
														>
															<Translate>
																{({ translate }) =>
																	translate('HOME.swami_prabhupada')
																}
															</Translate>
														</Link>
													</li>
													
												</ul>
											</li>
											<li className="rd-nav-item">
												<Link
													className={`rd-nav-link ${
														this.state.index === 10 ? 'active1' : ''
													} `}
													to={{
														pathname: '/audio',
														// state: {
														// 	handleNavigationClick: 'this.handleNavigationClick'
														// }
													}}
													onClick={() => {
														this.handleNavigationClick(10);
													}}
												>
													<Translate>
														{({ translate }) => translate('HOME.audio')}
													</Translate>
												</Link>
											</li>
											<li className="rd-nav-item">
												<Link
													className={`rd-nav-link ${
														this.state.index === 11 ? 'active1' : ''
													} `}
													to="/video"
													onClick={() => {
														this.handleNavigationClick(11);
													}}
												>
													<Translate>
														{({ translate }) => translate('HOME.video')}
													</Translate>
												</Link>
											</li>
											<li className="rd-nav-item">
												<Link
													className={`rd-nav-link ${
														this.state.index === 3 ? 'active1' : ''
													} `}
													to="/blog"
													onClick={() => {
														this.handleNavigationClick(3);
													}}
												>
													<Translate>
														{({ translate }) => translate('HOME.blog')}
													</Translate>
												</Link>
											</li>
											<li className="rd-nav-item">
												<Link
													className={`rd-nav-link ${
														this.state.index === 4 ? 'active1' : ''
													} `}
													to="/transcriptions"
													onClick={() => {
														this.handleNavigationClick(4);
													}}
												>
													<Translate>
														{({ translate }) =>
															translate('HOME.Transcriptions')
														}
													</Translate>
												</Link>
											</li>
											<li className="rd-nav-item">
												<Link
													className={`rd-nav-link ${
														this.state.index === 5 ? 'active1' : ''
													} `}
													to="/summaries"
													onClick={() => {
														this.handleNavigationClick(5);
													}}
												>
													<Translate>
														{({ translate }) => translate('HOME.Summaries')}
													</Translate>
												</Link>
											</li>
											{this.props.isAdmin && this.props.isLogin ? (
												<li className="rd-nav-item">
													<Link
														className={`rd-nav-link ${
															this.state.index === 6 ? 'active1' : ''
														} `}
														to="/"
													>
														Admin
													</Link>
												</li>
											) : (
												''
											)}
											<li className="rd-nav-item hideMenu">
												<a className="rd-nav-link">
													<Login
														notActive={false}
														handleRedirect={this.handleRedirect}
														handleLogin={this.handleLogin}
														handleTabIndex={this.handleTabIndex}
													/>
												</a>
											</li>
											<li className={`rd-nav-item hideMenu ${reactCookie.load('languageCode') === 'en' ? 'enToggle' : 'ruToggle' } `}
												style={{padding:0, float:"right"}} >
												{/* <LanguageSwitch /> */}
												<Select
													showSearch
													className="langaugeDropDown"
													style={{ width: 70, color: '#000', backgroundColor: '#f6f6f6'}}
													defaultValue={currentLanguage}
													placeholder="Select language"
													optionFilterProp="children"
													onChange={this.languageToggle}
													filterOption={(input, option) =>
														option.props.children
															.toLowerCase()
															.indexOf(input.toLowerCase()) >= 0
													}
												>
													<Option value="en">En</Option>
													<Option value="ru">Ru</Option>
												</Select>
											</li>
										</ul>
									</div>
								</div>
								{this.state.redirect ? <Redirect to="/registration" /> : ''}
								{this.state.login ? <Redirect to="/" /> : ''}
							</div>
							</div>
						</nav>
					</div>
				</header>
			</div>
		);
	}
}

export default withLocalize(Navigation);
