import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMkv } from '../../../actions/mkv';
import Auth from '../../../utils/Auth';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import QuoteOfDay from '../../molocules/SingleQuote/QuotesOfDay';
export class MKV extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTabs: false,
			array: [],
			selectedMkv: {},
			isUserLogin: false,
		};
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin,
		});
		this.props.getMkv({});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			array: nextProps.mkv.mkv,
		});
	}
	handleShowTabs = item => {
		this.setState({ showTabs: true, selectedMkv: item.item });
	};
	render() {
		if (!(this.state.array.length > 0)) {
			return <p>Loading...</p>;
		}

		return (
			<div>
				{/* <section className="bg-gray-100">
					<img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section> */}
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png)',
					}}
				>
					<div class="breadcrumbs-custom-inner headingImage">
						<div class="container breadcrumbs-custom-container">
							<ul class="breadcrumbs-custom-path">
								<li>
									<Link to="" onClick={() => this.props.history.push('/')}>
										<Breadcrumb.Item>Home</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">MKV</a>
								</li>
							</ul>
						</div>
					</div>
				</section>

				{!this.state.isUserLogin ? (
					<section className="text-center">
						<div className="container">
							{/* <div className="BreadCrumDiv">
								<Breadcrumb>
									<Link to=" " onClick={() => this.props.history.push("/")}>
										<Breadcrumb.Item>Home</Breadcrumb.Item>
									</Link>
									<Icon
										type="double-right"
										style={{
											alignSelf: "center",
											paddingLeft: 5,
											paddingRight: 5
										}}
									/>
									<Breadcrumb.Item active>MKV</Breadcrumb.Item>
								</Breadcrumb>
							</div> */}
							<div style={{ textAlign: 'center' }}>
								<p className="title">MKV</p>
							</div>
							<div className="row" style={{ margin: 0, textAlign: 'center' }}>
								{this.state.array.map((item, key) => {
									return (
										<div
											key={key}
											className={
												this.state.selectedMkv.year === item.year
													? 'col-sm-6 wow-outer OuterDiv outer'
													: 'col-sm-6 wow-outer OuterDiv'
											}
											onClick={() => this.handleShowTabs({ item })}
										>
											<article className="articleDiv wow fadeInUpSmall">
												<div className="tour-default-caption">
													<p className="titleColor">{item.year}</p>
												</div>
											</article>
										</div>
									);
								})}
							</div>
						</div>
					</section>
				) : (
					<QuoteOfDay />
				)}
				{this.state.showTabs ? (
					<section className="section section-lg">
						<div className="container centerAlign">
							<div className="row">
								<div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
									<div
										className="tabs-custom tabs-horizontal tabs-line"
										id="tabs-1"
									>
										<ul className="nav nav-tabs tabLeft">
											<li className="nav-item" role="presentation">
												<a
													className="nav-link active"
													href="#tabs-1-1"
													data-toggle="tab"
												>
													English
												</a>
											</li>
											<li className="nav-item" role="presentation">
												<a
													className="nav-link"
													href="#tabs-1-2"
													data-toggle="tab"
												>
													Russian
												</a>
											</li>
										</ul>
										<div className="tab-content">
											<div className="tab-pane fade show active" id="tabs-1-1">
												<div className="row row-50 row-lg-70 offset-top-2">
													<div class="col-sm-6 col-lg-4 isotope-item">
														<a
															class="thumbnail-modern thumbnail-modern-lg"
															href={this.state.selectedMkv.en.issue1.issue_path}
															target="_blank"
															data-lightgallery="item"
														>
															<img
																class="thumbnail-modern-image"
																src={
																	this.state.selectedMkv.en.issue1.issue_cover
																}
																alt=""
																width="390"
																height="576"
															/>
															{/* <div class="thumbnail-modern-caption">
																<span class="icon mdi mdi-magnify"> </span>
															</div> */}
															<div class="thumbnail-modern-dummy" />
														</a>
													</div>
													<div class="col-sm-6 col-lg-4 isotope-item">
														<a
															class="thumbnail-modern thumbnail-modern-lg"
															href={this.state.selectedMkv.en.issue2.issue_path}
															target="_blank"
															data-lightgallery="item"
														>
															<img
																class="thumbnail-modern-image"
																src={
																	this.state.selectedMkv.en.issue2.issue_cover
																}
																alt=""
																width="390"
																height="576"
															/>
															{/* <div class="thumbnail-modern-caption">
																<span class="icon mdi mdi-magnify"> </span>
															</div> */}
															<div class="thumbnail-modern-dummy" />
														</a>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="tabs-1-2">
												<div className="row row-50 row-lg-70 offset-top-2">
													<div class="col-sm-6 col-lg-4 isotope-item">
														<a
															class="thumbnail-modern thumbnail-modern-lg"
															href={this.state.selectedMkv.ru.issue1.issue_path}
															target="_blank"
															data-lightgallery="item"
														>
															<img
																class="thumbnail-modern-image"
																src={
																	this.state.selectedMkv.ru.issue1.issue_cover
																}
																alt=""
																width="390"
																height="576"
															/>
															{/* <div class="thumbnail-modern-caption">
																<span class="icon mdi mdi-magnify"> </span>
															</div> */}
															<div class="thumbnail-modern-dummy" />
														</a>
													</div>
													<div class="col-sm-6 col-lg-4 isotope-item">
														<a
															class="thumbnail-modern thumbnail-modern-lg"
															href={this.state.selectedMkv.ru.issue2.issue_path}
															target="_blank"
															data-lightgallery="item"
														>
															<img
																class="thumbnail-modern-image"
																src={
																	this.state.selectedMkv.ru.issue2.issue_cover
																}
																alt=""
																width="390"
																height="576"
															/>
															{/* <div class="thumbnail-modern-caption">
																<span class="icon mdi mdi-magnify"> </span>
															</div> */}
															<div class="thumbnail-modern-dummy" />
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		mkv: state.mkvReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getMkv: body => {
			dispatch(getMkv(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MKV);
