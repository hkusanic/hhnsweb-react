import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Icon } from 'antd';
import renderHTML from 'react-render-html';
import SingleBlog from '../../Components/molocules/SingleBlog/SIngleBlog';
import { connect } from 'react-redux';
import { getBlogs, getBlog } from '../../actions/blogActions';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import QuoteOfDay from  '../../Components/molocules/SingleQuote/QuotesOfDay';

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
			pagination: {},
		};

		this.props.getBlog({ uuid: '02d47a4e-2dfc-11e9-b210-d663bd873d93' });
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
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/blog_header_BJ1M6bS8E.png)',
					}}
				>
					{/* <img
						className="img-banner-width"
						src="https://ik.imagekit.io/gcwjdmqwwznjl/blog_header_BJ1M6bS8E.png"
					/> */}
					<div class="breadcrumbs-custom-inner headingImage">
						<div class="container breadcrumbs-custom-container">
							<ul class="breadcrumbs-custom-path">
								<li>
									<Link to="" onClick={() => this.props.history.push('/')}>
										<Breadcrumb.Item>Home</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">Blogs</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
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
							{/* <Breadcrumb>
								<Link to=" " onClick={() => this.props.history.push('/')}>
									<Breadcrumb.Item>Home</Breadcrumb.Item>
								</Link>
								<Icon
									type="double-right"
									style={{
										alignSelf: 'center',
										paddingLeft: 5,
										paddingRight: 5,
									}}
								/>
								<Breadcrumb.Item active>Blog</Breadcrumb.Item>
							</Breadcrumb> */}

							<div className="row row-50 row-xxl-70">
								{this.state.blogs.map((item, key) => {
									return <SingleBlog blog={item} key={key} />;
								})}
							</div>
							<div className="padLeft pt-5 pb-5 PosRight">
								<Pagination
									defaultPageSize={this.state.pagination.defaultPageSize}
									current={this.state.pagination.current}
									total={this.state.pagination.total}
									onChange={this.handleTableChange}
								/>
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
