import React, { Component } from "react";
import { Button, Table, Icon } from "antd";
import Auth from "../../../utils/Auth";
import { connect } from "react-redux";
import { searchLecture, resetState } from "../../../actions/lectureActions";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import SearchFilter from "../SeachFilter/SearchFilter";
import { Collapse } from "react-collapse";
import reactCookie from "react-cookies";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import QuoteOfDay from "../../molocules/SingleQuote/QuotesOfDay";

const defaultPageSize = 20;
export class Summaries extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			page: null,
			iconSearch: true,
			body: {
				page: 1,
				summaries: true
			},
			isSearch: false,
			data: [],
			pagination: {},
			loading: false
		};
	}

	componentDidMount() {
		let body = { ...this.state.body };
		body.page = this.props.lecturesDetails.currentPage || 1;

		this.setState({ loading: true });
		const pagination = { ...this.state.pagination };
		pagination.total = this.props.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = this.props.lecturesDetails.currentPage || 1;

		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin,
			loading: false,
			pagination
		});
		this.props.searchLecture(body);
	}
	componentWillReceiveProps(nextProps) {
		let body = { ...this.state.body };
		body.page = nextProps.lecturesDetails.currentPage;
		body.summaries = true;

		const pagination = { ...this.state.pagination };
		pagination.total = nextProps.lecturesDetails.totalLectures;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = nextProps.lecturesDetails.currentPage;

		this.setState({
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

		let body = { ...this.state.body };
		body.page = pagination.current;
		this.props.searchLecture(body);
	};

	searchData = body => {
		body.summaries = true;
		this.setState({ body, isSearch: true }, () => {
			this.props.searchLecture(body);
		});
	};

	onClickIcon = value => {
		this.setState({ iconSearch: value });
	};

	render() {
		const columns = [
			{
				title: "Title",
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
							pathname: `/summariesDetails/${record.uuid}`,
							state: record
						}}
					>
						{renderHTML(
							reactCookie.load("languageCode") === "en"
								? record.en.title
								: record.ru.title
								? record.ru.title
								: record.en.title
						)}
					</Link>
				)
			},
			{
				title: "View",
				dataIndex: renderHTML(
					reactCookie.load("languageCode") === "en"
						? "counters.en_summary_view"
						: "counters.ru_summary_view"
						? "counters.ru_summary_view"
						: "counters.ru_summary_view"
				)
			}
		];
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
									<a className="textColor">Summaries</a>
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
									<div className="table-responsive wow">
										{this.props.lecturesDetails.lectures.length > 0 ? (
											<div>
												<Table
													columns={columns}
													rowKey={record => record.uuid}
													dataSource={this.props.lecturesDetails.lectures}
													pagination={this.state.pagination}
													loading={this.state.loading}
													onChange={this.handleTableChange}
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
		resetState: () => {
			dispatch(resetState());
		},
		resetState: () => {
			dispatch(resetState());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Summaries);
