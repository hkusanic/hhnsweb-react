import React, { Component } from "react";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Icon, Button } from "antd";
import {
	searchLecture,
	updateCounters,
	resetState
} from "../../../actions/lectureActions";
import Auth from "../../../utils/Auth";
import SearchFilter from "../SeachFilter/SearchFilter";
import { Collapse } from "react-collapse";
import reactCookie from "react-cookies";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import QuoteOfDay from "../../molocules/SingleQuote/QuotesOfDay";

const defaultPageSize = 20;

export class AudioList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			currentPage: null,
			page: null,
			lectures: [],
			body: {},
			iconSearch: true,
			isSearch: false,
			data: [],
			pagination: {},
			loading: false
		};
		const { resetState } = this.props;
		resetState();
	}

	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({ loading: true });

		let body = { ...this.state.body };
		body.page = this.props.lecturesDetails.currentPage || 1;
		const pagination = { ...this.state.pagination };
		pagination.total = this.props.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = this.props.lecturesDetails.currentPage || 1;

		this.setState({
			currentPage: this.props.lecturesDetails.currentPage,
			isUserLogin,
			loading: false,
			pagination
		});

		this.props.searchLecture(body);
	}

	componentWillReceiveProps(nextProps) {
		let body = { ...this.state.body };
		body.page = nextProps.lecturesDetails.currentPage;
		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = nextProps.lecturesDetails.currentPage;

		this.setState({
			currentPage: nextProps.lecturesDetails.currentPage,
			pagination
		});

		if (nextProps.lecturesDetails.Count) {
			this.props.searchLecture(body);
		}
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		pager.total = this.props.lecturesDetails.totalLectures;
		this.setState({
			pagination: pager
		});

		let body = Object.assign({}, this.state.body);
		body.page = pagination.current;
		this.props.searchLecture(body);
	};

	showing100Characters = sentence => {
		var result = sentence;
		var resultArray = result.split(" ");
		if (resultArray.length > 15) {
			resultArray = resultArray.slice(0, 15);
			result = resultArray.join(" ") + "...";
		}
		return result;
	};

	searchData = body => {
		this.setState({ body, isSearch: true }, () => {
			this.props.searchLecture(body);
		});
	};

	onClickIcon = value => {
		this.setState({ iconSearch: value });
	};

	handleUpdate = item => {
		const body = {
			uuid: item.uuid,
			downloads: true
		};
		this.props.updateCounters(body);
	};

	updateAudioPlayCount = uuid => {
		const body = {
			uuid: uuid,
			audio_play_count: true
		};
		this.props.updateCounters(body);
	};

	render() {
		const maxWidth = window.screen.width;
		const mobileBrkPnt = 767;
		const columns = [
			{
				title: maxWidth > mobileBrkPnt ? "Title" : "",
				className: "audioTable_title",
				dataIndex: renderHTML(
					reactCookie.load("languageCode") === "en"
						? "en.title"
						: "ru.title"
						? "ru.title"
						: "en.title"
				),
				render: (text, record, index) => (
					<Link
						to={{
							pathname: `/audioDetails/${record.uuid}`,
							state: record
						}}
					>
						{renderHTML(
							this.showing100Characters(
								reactCookie.load("languageCode") === "en"
									? record.en.title
									: record.ru.title
									? record.ru.title
									: record.en.title
							)
						)}
					</Link>
				)
			},
			{
				title: maxWidth > mobileBrkPnt ? "Audio" : "",
				dataIndex: "audio_link",
				className: "audioTable_audio",
				render: (text, record, index) => (
					<audio
						style={{ height: "30px" }}
						controls
						controlsList="nodownload"
						onPlay={() => {
							this.updateAudioPlayCount(record.uuid);
						}}
					>
						<source src={renderHTML(record.audio_link)} type="audio/mpeg" />
					</audio>
				)
			},
			{
				title: maxWidth > mobileBrkPnt ? "Downloads" : "",
				dataIndex: "counters.downloads",
				className: "downloadSign",
				render: (text, record, index) => (
					<React.Fragment>
						<span className="downloadDetails">{record.counters.downloads}</span>
						<a
							className="downloadIcon"
							href={record.audio_link}
							onClick={() => {
								this.handleUpdate(record);
							}}
							download="download"
						>
							<Icon type="download" style={{ fontSize: "1.5rem" }} />
							{maxWidth <= mobileBrkPnt ? " Download" : null}
						</a>
					</React.Fragment>
				)
			}
		];

		this.props.history.location.currentPage = this.state.currentPage;
		let class_icon_search = this.state.iconSearch
			? "icon-search fa fa-search"
			: "display-none-icon";
		let class_icon_close = this.state.iconSearch
			? "display-none-icon"
			: "icon-search fa fa-close";

		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							"url(https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png)"
					}}
				>
					<div class="breadcrumbs-custom-inner headingImage">
						<div class="container breadcrumbs-custom-container">
							<ul class="breadcrumbs-custom-path">
								<li>
									<Link to="" onClick={() => this.props.history.push("/")}>
										<Breadcrumb.Item>Home</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">Audio</a>
								</li>
							</ul>
						</div>
					</div>
				</section>

				{!this.state.isUserLogin ? (
					<div className="PadTop">
						<div className="container mt-5">
							<div
								className="row justify-content-center"
								style={{ marginTop: "0", marginBottom: "0" }}
							>
								<div className="col-lg-12">
									<div style={{ textAlign: "center" }}>
										<Button
											className="searchButtonColor searchIconBorder"
											type="primary"
											icon="search"
											shape="circle"
											onClick={() => this.onClickIcon(!this.state.iconSearch)}
										/>
									</div>
								</div>
							</div>

							{!this.state.iconSearch && (
								<div
									className="row justify-content-center"
									style={{ marginTop: "0" }}
								>
									<div className="col-lg-12">
										<Collapse isOpened={!this.state.iconSearch}>
											<SearchFilter
												searchData={this.searchData}
												cantoSearch={true}
												chapterSearch={true}
												verseSearch={true}
												translationSearch={true}
												yearSearch={true}
												locationSearch={true}
												topicSearch={true}
												eventSearch={true}
												isUpparRowSearch={true}
											/>
										</Collapse>
									</div>
								</div>
							)}

							<div
								className="row justify-content-center"
								style={{ paddingTop: "20px" }}
							>
								<div className="col-lg-12">
									<div className="table-responsive wow ">
										{this.props.lecturesDetails.lectures.length > 0 ? (
											<div>
												<Table
													columns={columns}
													rowKey={record => record.uuid}
													dataSource={this.props.lecturesDetails.lectures}
													pagination={this.state.pagination}
													loading={this.state.loading}
													onChange={this.handleTableChange}
													rowClassName="tableRow"
												/>
											</div>
										) : (
											<div style={{ textAlign: "center" }}>
												<p className="bookingForm">
													{this.state.isSearch
														? "No Record Found"
														: "Hare Krishna..."}
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<QuoteOfDay />
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		lecturesDetails: state.lectureReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		searchLecture: body => {
			dispatch(searchLecture(body));
		},
		updateCounters: body => {
			dispatch(updateCounters(body));
		},
		resetState: () => {
			dispatch(resetState());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioList);
