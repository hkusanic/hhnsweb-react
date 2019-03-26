import React, { Component } from "react";
import { connect } from "react-redux";
import { getMkv } from "../../../actions/mkv";
export class MKV extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTabs: false,
			array: [],
			selectedMkv: {}
		};
	}

	componentDidMount() {
		this.props.getMkv({});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			array: nextProps.mkv.mkv
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
				<section className="bg-gray-100">
					<img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section>
				<div style={{ textAlign: "center" }}>
					<p className="bookingForm">MKV</p>
				</div>
				<section className="text-center">
					<div className="container yearList">
						<div className="row offset-top-2">
							{this.state.array.map((item, key) => {
								return (
									<div
										key={key}
										className={this.state.selectedMkv.year === item.year ? "col-sm-6 wow-outer OuterDiv outer" : "col-sm-6 wow-outer OuterDiv"}
										onClick={() => this.handleShowTabs({ item })}
									>
										<article className="articleDiv wow slideInLeft">
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
				{this.state.showTabs ? (
					<section className="section section-lg">
						<div className="container tabPadLeft">
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
													Russain
												</a>
											</li>
										</ul>
										<div className="tab-content">
											<div className="tab-pane fade show active" id="tabs-1-1">
												<div className="row row-50 row-lg-70 offset-top-2">
													<div className="col-sm-6 col-lg-3 wow-outer">
														<article className="thumbnail-light wow slideInLeft">
															<a
																className="thumbnail-light-media"
																href={this.state.selectedMkv.en.issue_path}
																target="_blank"
															>
																<img
																	className="thumbnail-light-image tabImg"
																	src={this.state.selectedMkv.en.issue_cover}
																	alt=""
																	width="270"
																	height="300"
																/>
															</a>
															<p className="titleColor">
																{this.state.selectedMkv.en.issue_name}
															</p>
														</article>
													</div>
												</div>
											</div>
											<div className="tab-pane fade" id="tabs-1-2">
												<div className="row row-50 row-lg-70 offset-top-2">
													<div className="col-sm-6 col-lg-3 wow-outer">
														<article className="thumbnail-light wow slideInLeft">
															<a
																className="thumbnail-light-media"
																href={this.state.selectedMkv.ru.issue_path}
																target="_blank"
															>
																<img
																	className="thumbnail-light-image tabImg"
																	src={this.state.selectedMkv.ru.issue_cover}
																	alt=""
																	width="270"
																	height="300"
																/>
															</a>
															<p className="titleColor">
																{this.state.selectedMkv.ru.issue_name}
															</p>
														</article>
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
		mkv: state.mkvReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getMkv: body => {
			dispatch(getMkv(body));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MKV);
