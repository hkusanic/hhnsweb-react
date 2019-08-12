import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Icon } from 'antd';
import renderHTML from 'react-render-html';
import SingleBlog from '../../molocules/SingleBlog/SIngleBlog'
import { connect } from 'react-redux';
import {getBlogs, getBlog} from '../../../actions/blogActions';
import Auth from '../../../utils/Auth';
import { Translate } from 'react-localize-redux';
import QuoteOfDay from '../../molocules/SingleQuote/QuotesOfDay';

const defaultPageSize = 20;

export class Blogs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalItem: null,
			currentPage: null,
			page: null,
			blogs: [],
			isUserLogin: false,
		};

		//this.props.getBlog({ uuid: '02d47a4e-2dfc-11e9-b210-d663bd873d93' });
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination;
		pager.total = this.props.blogsDetails.totalBlogs;
		this.setState({
			pagination: pager,
		});

		this.props.getBlogs(pagination);
	};

	componentDidMount() {
		const pagination = { ...this.state.pagination };
		pagination.total = this.props.blogsDetails.totalBlogs;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = this.props.blogsDetails.currentPage || 1;

		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			totalItem: this.props.blogsDetails.totalBlogs,
			blogs: this.props.blogsDetails.blogs,
			currentPage: this.props.blogsDetails.currentPage,
			isUserLogin,
			pagination,
		});
		this.props.getBlogs(this.props.blogsDetails.currentPage || 1);
	}

	componentWillReceiveProps(nextprops) {
		const isUserLogin = Auth.isUserAuthenticated();

		const pagination = { ...this.state.pagination };
		pagination.total = nextprops.blogsDetails.totalBlogs;
		pagination.defaultPageSize = defaultPageSize;
		pagination.current = nextprops.blogsDetails.currentPage;

		this.setState({
			totalItem: nextprops.blogsDetails.totalBlogs,
			blogs: nextprops.blogsDetails.blogs,
			currentPage: nextprops.blogsDetails.currentPage,
			isUserLogin,
			pagination,
		});
	}

	render() {
		return (
			<div>
				{!this.state.isUserLogin ? (
					<section>
						<div style={{ textAlign: 'center' }}>
							<p className="bookingForm">
								<Translate>
									{({ translate }) => translate('HOME.blog')}
								</Translate>
							</p>
						</div>
						<div className="container centerAlign">

							<div className="row row-50 row-xxl-70">
								{this.state.blogs.map((item, key) => {
									return <SingleBlog blog={item} key={key} />;
								})}
							</div>
						</div>
					</section>
				) : <QuoteOfDay /> }
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		blogsDetails: state.blogReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getBlogs: page => {
			dispatch(getBlogs(page));
		},
		getBlog: body => {
			dispatch(getBlog(body));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs);
