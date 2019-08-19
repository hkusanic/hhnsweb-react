import React, { Component } from "react";
import { throttle } from "lodash";
import { setActiveLanguage, withLocalize } from "react-localize-redux";
import { Select } from "antd";
import Login from "./../../../containers/Login/Login";
import { Link, Redirect } from "react-router-dom";
import Auth from "../../../utils/Auth";
import { Translate } from "react-localize-redux";
import { LanguageSwitch } from "../../atoms/LanguageSwitch/LanguageSwitch";
import * as DATA from "../../../constants/biographies";
import reactCookie from "react-cookies";
import Column from "antd/lib/table/Column";

const Option = Select.Option;
const maxWidth = window.screen.width;
const screenwidth = window.innerWidth;
export class Navigation extends Component {
	constructor(props) {
		super(props);
		this.resize = throttle(this.resize.bind(this), 100);
		this.state = {
			isUserLogin: true,
			Niranjana_swami_bio: "",
			Prabhupada_swami_bio: "",
			floatImage: "",
			index: 1,
			redirect: false,
			login: false,
			width: screenwidth
		};
	}

	resize = () => {
		console.log(maxWidth);
		let width = window.innerWidth;
		// if (width - this.state.width >= 200 || width - this.state.width <= -200) {
		// 	console.log(width);
		// 	// window.location.href = window.location.href;
		// 	window.location.reload(false);
		// }
		if (this.state.width > 1210 && (width >= 0 && width <= 1210)) {
			console.log("state width ===> " + this.state.width);
			console.log("width===>" + width);
			this.setState({
				width: width
			});
			window.location.reload(false);
		}
		if (this.state.width <= 600 && width >= 600) {
			console.log("state width ===> " + this.state.width);
			console.log("width===>" + width);
			this.setState({
				width: width
			});
			window.location.reload(false);
		}
		if (
			this.state.width > 600 &&
			this.state.width <= 1210 &&
			(width >= 1210 || width <= 600)
		) {
			// this.setState({
			// 	reload: true
			// });
			console.log("state width ===> " + this.state.width);
			console.log("width===>" + width);
			this.setState({
				width: width
			});
			window.location.reload(false);
		}
	};

	// this.forceUpdate();
	// window.location.href = window.location.href;
	// componentDidMount() {
	// 	window.addEventListener("resize", this.resize);
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener("resize", this.resize);
	// }

	componentDidMount() {
		window.addEventListener("resize", this.resize);
		// window.addEventListener("click", this.)
		const Prabhupada_swami_bio = {
			img: "https://ik.imagekit.io/gcwjdmqwwznjl/Prabhupada-Bio_BkS_T-HUE.png",
			title_en: DATA.BIOGRAPHY.one_title_en,
			title_ru: DATA.BIOGRAPHY.one_title_ru,
			content_en: DATA.BIOGRAPHY.one_content_en,
			content_ru: DATA.BIOGRAPHY.one_content_ru
		};
		const Niranjana_swami_bio = {
			img: "https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png",
			title_en: DATA.BIOGRAPHY.two_title_en,
			title_ru: DATA.BIOGRAPHY.two_title_ru,
			content_en: DATA.BIOGRAPHY.two_content_en,
			content_ru: DATA.BIOGRAPHY.two_content_ru
		};
		const isUserLogin = Auth.isUserAuthenticated();
		let tabIndex = localStorage.getItem("tabIndex");
		if (tabIndex) {
			tabIndex = parseInt(tabIndex, 10);
		}

		this.setState({
			isUserLogin,
			Niranjana_swami_bio,
			Prabhupada_swami_bio,
			index: tabIndex ? tabIndex : 1
		});
		window.addEventListener("scroll", this.handleScroll);
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
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll = event => {
		if ($(".rd-navbar--is-stuck")) {
			if ($(".rd-navbar--is-stuck").length === 1) {
				if (this.state.floatImage === "")
					this.setState({ floatImage: "styleImage" });
			} else {
				if (this.state.floatImage === "styleImage")
					this.setState({ floatImage: "" });
			}
		}
	};

	handleNavigationClick = index => {
		this.handleTabIndex(index);
		$(".login-modal-2").removeClass("active");
		$(".register-modal-2").removeClass("active");
		if (this.state.isUserLogin) {
			$(".login-modal-2").addClass("active");
			$(".rd-navbar-toggle").removeClass("active");
			$(".rd-navbar-nav-wrap").removeClass("active");
		}
	};

	handleRemoveModal = index => {
		this.handleTabIndex(index);
		$(".login-modal-2").removeClass("active");
		$(".rd-navbar-nav-wrap").removeClass("active");
		$(".register-modal-2").removeClass("active");
		$(".rd-navbar-toggle").removeClass("active");
	};

	handleTabIndex = index => {
		if (index) {
			this.setState({ index });
		}
		localStorage.setItem("tabIndex", index);
	};

	handleBiographyClick = () => {
		$(".biography-submenu").removeClass("focus");
		$(".biography-submenu").removeClass("opened");
	};

	languageToggle(language) {
		setActiveLanguage(language);
		reactCookie.save("languageCode", language, { path: "/" });
		window.location.reload();
	}

	render() {
		let currentLanguage = "en";
		if (reactCookie.load("languageCode")) {
			currentLanguage = reactCookie.load("languageCode");
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
							{/* <div className="rd-navbar-aside-outer"> */}
							{maxWidth <= 1210 && maxWidth >= 600 ? (
								<div className="rd-navbar-aside head ">
									<div className="rd-navbar-panel">
										<button
											className="rd-navbar-toggle toggle-original"
											data-rd-navbar-toggle="#rd-navbar-nav-wrap-1"
										>
											<span />
										</button>
										<div style={{ width: "100%" }}>
											<div className="topMenu" style={{ float: "left" }}>
												<ul className="rd-navbar-nav">
													<li
														// onClick={() => {
														// 	this.handleRemoveModal(1);
														// }}
														className="rd-nav-item"
													>
														<Link
															style={{ backgroundColor: "white" }}
															className={`rd-nav-link ${
																this.state.index === 1 ? "active1" : ""
															} `}
															to="/"
														>
															<img
																style={
																	{
																		// width: "252.1px",
																		// height: "48.3px"
																		// style={{ marginLeft: "13%" }}
																		// paddingLeft: "4%",
																		// paddingTop: "3%"
																	}
																}
																src="images/swami.svg"
															/>
														</Link>
													</li>
												</ul>
											</div>
											<div className="topMenu" style={{ float: "right" }}>
												<ul className="rd-navbar-nav">
													<li
														className="rd-nav-item"
														// style={{ paddingTop: "10%" }}
													>
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
												style={{ float: "right" }}
											>
												<ul className="rd-navbar-nav">
													<li
														className="rd-nav-item"
														// style={{ paddingTop: "23%" }}
													>
														<LanguageSwitch />
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							) : (
								""
							)}

							{maxWidth <= 600 ? (
								<div className="rd-navbar-aside head ">
									<div className="rd-navbar-panel">
										<button
											className="rd-navbar-toggle toggle-original"
											data-rd-navbar-toggle="#rd-navbar-nav-wrap-1"
										>
											<span />
										</button>
										<div style={{ width: "100%" }}>
											{/* <div className="topMenu" style={{ float: "left" }}>
												<ul className="rd-navbar-nav">
													<li className="rd-nav-item">
														<img
															// style={{
															// 	// width: "252.1px",
															// 	// height: "48.3px"
															// 	// style={{ marginLeft: "13%" }}
															// 	marginLeft: "15%"
															// }}
															src="images/swami.svg"
														/>
													</li>
												</ul>
											</div> */}
											<div className="topMenu" style={{ float: "right" }}>
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
												style={{ float: "right" }}
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
								""
							)}

							{/* <img
									className="img-banner-width"
									src="https://ik.imagekit.io/gcwjdmqwwznjl/banner1_HyhqTWrIE.png"
								/> */}
							{/* </div> */}
							<div>
								{/* <div className="rd-navbar-main-outer container"> */}
								{/* <div className="menulogoDiv">
									<img
										className={'menulogoImg' + ' ' + this.state.floatImage}
										src="https://ik.imagekit.io/gcwjdmqwwznjl/logo_S1yq6Zr8N.png"
									/>
									className="rd-navbar-main MenuPad"
								</div> */}
								<div>
									<div
										className="rd-navbar-nav-wrap padTopMenu"
										id="rd-navbar-nav-wrap-1"
										// style={{backgroundColor: "white"}}
									>
										<ul
											className={
												maxWidth >= 1210
													? "rd-navbar-nav navbarItemAlign"
													: "rd-navbar-nav"
											}
										>
											<li
												onClick={() => {
													this.handleRemoveModal(1);
												}}
												className="rd-nav-item hideMenu"
											>
												<Link
													className={`rd-nav-link ${
														this.state.index === 1 ? "active1" : ""
													} `}
													to="/"
												>
													<img
														style={{
															// width: "252.1px",
															// height: "48.3px"
															// style={{ marginLeft: "13%" }}
															marginLeft: "15%"
														}}
														src="images/swami.svg"
													/>{" "}
												</Link>
											</li>
											{/* <span style={{ marginLeft: "13%", float: "right" }}> */}
											<span
												style={
													maxWidth <= 1210
														? {
																// float: "right",
																// justifyContent: "space-between",
																// display: "flex",
																marginRight: "5%"
																// flexDirection: "column"
														  }
														: {
																// float: "right",
																justifyContent: "space-between",
																display: "flex",
																marginRight: "5%",
																marginTop: "-2%",
																marginLeft: "42%"
														  }
												}
											>
												<li
													// style={{
													// 	marginLeft: "13%"
													// }}
													onClick={() => {
														this.handleRemoveModal(1);
													}}
													className="rd-nav-item"
												>
													<Link
														className={`rd-nav-link ${
															this.state.index === 1 ? "active1" : ""
														} `}
														to="/"
													>
														{/* <Translate>
														{({ translate }) => translate('HOME.home')}
													</Translate> */}
														Home
													</Link>
												</li>
												<li className="rd-nav-item biography-submenu">
													<a
														className={`rd-nav-link ${
															this.state.index === 2 ? "active1" : ""
														} `}
													>
														Biography
														{/* <Translate>
														{({ translate }) => translate('HOME.biography')}
													</Translate> */}
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
																	pathname: "/biograhyDetails",
																	state: this.state.Niranjana_swami_bio
																}}
																onClick={this.handleBiographyClick}
																className="rd-dropdown-link"
															>
																<Translate>
																	{({ translate }) =>
																		translate("HOME.niranjanaswami")
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
																	pathname: "/biograhyDetails",
																	state: this.state.Prabhupada_swami_bio
																}}
																onClick={this.handleBiographyClick}
																className="rd-dropdown-link"
															>
																<Translate>
																	{({ translate }) =>
																		translate("HOME.swami_prabhupada")
																	}
																</Translate>
															</Link>
														</li>
													</ul>
												</li>
												<li className="rd-nav-item">
													<Link
														className={`rd-nav-link ${
															this.state.index === 10 ? "active1" : ""
														} `}
														to={{
															pathname: "/audio"
															// state: {
															// 	handleNavigationClick: 'this.handleNavigationClick'
															// }
														}}
														onClick={() => {
															this.handleRemoveModal(10);
															this.handleNavigationClick(10);
														}}
													>
														<Translate>
															{({ translate }) => translate("HOME.audio")}
														</Translate>
													</Link>
												</li>
												<li className="rd-nav-item">
													<Link
														className={`rd-nav-link ${
															this.state.index === 11 ? "active1" : ""
														} `}
														to="/video"
														onClick={() => {
															this.handleRemoveModal(11);
															this.handleNavigationClick(11);
														}}
													>
														<Translate>
															{({ translate }) => translate("HOME.video")}
														</Translate>
													</Link>
												</li>
												<li className="rd-nav-item">
													<Link
														className={`rd-nav-link ${
															this.state.index === 3 ? "active1" : ""
														} `}
														to="/blog"
														onClick={() => {
															this.handleRemoveModal(3);
															this.handleNavigationClick(3);
														}}
													>
														Blog
														{/* <Translate>
														{({ translate }) => translate('HOME.blog')}
													</Translate> */}
													</Link>
												</li>
												<li className="rd-nav-item">
													<Link
														className={`rd-nav-link ${
															this.state.index === 4 ? "active1" : ""
														} `}
														to="/transcriptions"
														onClick={() => {
															this.handleRemoveModal(4);
															this.handleNavigationClick(4);
														}}
													>
														<Translate>
															{({ translate }) =>
																translate("HOME.Transcriptions")
															}
														</Translate>
													</Link>
												</li>
												<li className="rd-nav-item">
													<Link
														className={`rd-nav-link ${
															this.state.index === 5 ? "active1" : ""
														} `}
														to="/summaries"
														onClick={() => {
															this.handleRemoveModal(5);
															this.handleNavigationClick(5);
														}}
													>
														<Translate>
															{({ translate }) => translate("HOME.Summaries")}
														</Translate>
													</Link>
												</li>
												{this.props.isAdmin && this.props.isLogin ? (
													<li className="rd-nav-item">
														<Link
															className={`rd-nav-link ${
																this.state.index === 6 ? "active1" : ""
															} `}
															to="/"
														>
															Admin
														</Link>
													</li>
												) : (
													""
												)}
												<li
													className="rd-nav-item hideMenu"
													// style={{ width: "7%" }}
												>
													<a className="rd-nav-link">
														<Login
															notActive={false}
															handleRedirect={this.handleRedirect}
															handleLogin={this.handleLogin}
															handleTabIndex={this.handleTabIndex}
														/>
													</a>
												</li>

												<li
													className={`rd-nav-item hideMenu ${
														reactCookie.load("languageCode") === "en"
															? "enToggle"
															: "ruToggle"
													} `}
													// style={{ width: "15%" }}
												>
													{/* <LanguageSwitch /> */}
													<select
														showSearch
														className="langaugeDropDown"
														style={{
															// width: "90px",
															color: "#000",
															backgroundColor: "white",
															border: "1px solid white"
														}}
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
														<option
															style={{ border: "1px solid white" }}
															value="en"
														>
															Eng
														</option>
														<option
															style={{ border: "1px solid white" }}
															value="ru"
														>
															Rus
														</option>
													</select>
												</li>

												<li className="rd-nav-item hideMenu">
													{" "}
													<img
														style={{ height: "34px", width: "34px" }}
														src="images/Iskcon_logo.jpg"
														alt="Iskcon Logo"
													/>{" "}
												</li>
											</span>
										</ul>
										<br />
									</div>
								</div>
								{this.state.redirect ? <Redirect to="/registration" /> : ""}
								{this.state.login ? <Redirect to="/" /> : ""}
							</div>
							{/* </div> */}
						</nav>
					</div>
				</header>
			</div>
		);
	}
}

export default withLocalize(Navigation);
