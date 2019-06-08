import React, { Component } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import SingleQuote from '../../Components/molocules/SingleQuote/SingleQuote';
import { connect } from 'react-redux';
import { searchQuote } from '../../actions/quoteActions';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export class Quotes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLogin: true,
			totalItem: null,
			currentPage: null,
			page: null,
			quotes: [],
		};
	}
	componentDidMount() {
		const isUserLogin = Auth.isUserAuthenticated();
		const author = this.props.location.state;
		console.log(this.props.quoteDetails.totalQuotes);
		this.setState({
			quotes: this.props.quoteDetails.quotes,
			currentPage: this.props.quoteDetails.currentPage,
			totalItem: this.props.quoteDetails.totalQuotes,
			isUserLogin,
		});
		if (author) {
			this.props.searchQuote({ page: 1, author });
		} else {
			this.props.searchQuote({ page: 1 });
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.quoteDetails.totalQuotes);

		this.setState({
			quotes: nextProps.quoteDetails.quotes,
			currentPage: nextProps.quoteDetails.currentPage,
			totalItem: nextProps.quoteDetails.totalQuotes,
		});
	}

	handlePageChange = pageNumber => {
		const author = this.props.location.state;
		if (author) {
			this.props.searchQuote({ page: pageNumber, author });
		} else {
			this.props.searchQuote({ page: pageNumber });
		}
	};

	showing100Characters = sentence => {
		var result = sentence;
		var resultArray = result.split(' ');
		if (resultArray.length > 10) {
			resultArray = resultArray.slice(0, 10);
			result = resultArray.join(' ') + '...';
		}
		return result;
	};
	render() {
		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png)',
					}}
				>
					{!this.state.isUserLogin ? (
						<div class="breadcrumbs-custom-inner headingImage">
							<div class="container breadcrumbs-custom-container">
								<ul class="breadcrumbs-custom-path">
									<li>
										<Link to="" onClick={() => this.props.history.push('/')}>
											<Breadcrumb.Item>Home</Breadcrumb.Item>
										</Link>
									</li>
									<li>
										<a className="textColor">Quotes</a>
									</li>
								</ul>
							</div>
						</div>
					) : null}
				</section>
				<div className="container">
					<div style={{ textAlign: 'center' }}>
						<p className="bookingForm">{this.props.location.state}</p>
					</div>
					<div className="row row-50 row-xxl-70 centerAlign">
						{this.state.quotes.map((item, key) => {
							return <SingleQuote quote={item} key={key} />;
						})}
					</div>
					<Pagination
						className="paginationStyle antPage"
						innerClass="pagination"
						activeClass="page-item active"
						itemClass="page-item"
						linkClass="page-link button-winona"
						activePage={this.state.currentPage}
						itemsCountPerPage={20}
						total={this.state.totalItem}
						pageRangeDisplayed={10}
						onChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		quoteDetails: state.quoteReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		searchQuote: page => {
			dispatch(searchQuote(page));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Quotes);
