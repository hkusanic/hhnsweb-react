import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Icon, Button } from 'antd';
import renderHTML from 'react-render-html';
import SingleBlogHome from '../../molocules/SingleBlog/Singlebloghome'
import { connect } from 'react-redux';
import { getBlogs, getBlog } from '../../../actions/blogActions';
import Auth from '../../../utils/Auth';
import { Translate } from 'react-localize-redux';
import QuoteOfDay from '../../molocules/SingleQuote/QuotesOfDay';
import {Redirect} from 'react-router-dom';

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
            blog: false,
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

    readmoreclicked = (e) => {
        // console.log("hi")
        this.setState({
            blog: true
        })
    }

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
        // console.log(this.state.blog)
        if(this.state.blog)
        {
            <Redirect to='/blog' />
        }

        return (
            <div>
                {!this.state.isUserLogin ? (
                    <section>
                        <div style={{ textAlign: 'center' }}>
                            {/* <p className="bookingForm">
                                <Translate>
                                    {({ translate }) => translate('HOME.blog')}
                                </Translate>
                            </p> */}
                            <h3 style={{marginTop:'25px'}}> BLOGS </h3>
                            <h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h4>
                            <br />
                            <br />
                        </div>
                        <div className="container centerAlign">
                            <div className="row row-50 row-xxl-70">
                                {/* {this.state.blogs.map((item, key) => {
									return <SingleBlogHome blog={item} key={key} />;
                                })} */}
                                <SingleBlogHome
                                    handleNavigationClick={this.handleNavigationClick}
                                    author="Juanma Gironella"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm tempor incididunt ut labore et dolore magna aliqua. Ut enim ad min veniam"
                                    link="/"
                                />
                                <SingleBlogHome
                                    handleNavigationClick={this.handleNavigationClick}
                                    author="John dinker"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm tempor incididunt ut labore et dolore magna aliqua. Ut enim ad min veniam"
                                    link="/"
                                />
                                <SingleBlogHome
                                    handleNavigationClick={this.handleNavigationClick}
                                    author="Naveen arshad"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm tempor incididunt ut labore et dolore magna aliqua. Ut enim ad min veniam"
                                    link="/"
                                />
                                <SingleBlogHome
                                    handleNavigationClick={this.handleNavigationClick}
                                    author="Juanma Gironella"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm tempor incididunt ut labore et dolore magna aliqua. Ut enim ad min veniam"
                                    link="/"
                                />
                            </div>
                        </div>
                        <br />
                        <br />
                        
                        <div style={{ textAlign: "center" }}> <button onClick={this.readmoreclicked} style={{
                                width: "123px",
                                height: "47px",
                                borderRadius: "4px",
                                border: "1px solid rgb(255, 124, 43)",
                                backgroundColor: "white"
                        }}> Read More... </button>
                        <br />
                        <br />
                        </div>
                    </section>
                ) : <QuoteOfDay />}
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
