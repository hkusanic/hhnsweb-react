import React, { Component } from 'react';
import SingleBlog from '../../Components/molocules/SingleBlog/SIngleBlog';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { getBlogs, getBlog } from '../../actions/blogActions';
import blogHeaderImage from '../../assets/images/blog/blog_header.png';
import Auth from "../../utils/Auth";

export class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItem: null,
            currentPage: null,
            page: null,
            blogs: [],
            isUserLogin: false
        }

        this.props.getBlog({ "uuid": "02d47a4e-2dfc-11e9-b210-d663bd873d93" });
    }

    componentDidMount() {
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({
            totalItem: this.props.blogsDetails.totalBlogs,
            blogs: this.props.blogsDetails.blogs,
            currentPage: this.props.blogsDetails.currentPage,
            isUserLogin
        })
        this.props.getBlogs(1);
    }

    componentWillReceiveProps(nextprops) {
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({
            totalItem: nextprops.blogsDetails.totalBlogs,
            blogs: nextprops.blogsDetails.blogs,
            currentPage: nextprops.blogsDetails.currentPage,
            isUserLogin
        })
    }

    handlePageChange = (pageNumber) => {
        this.props.getBlogs(pageNumber);
    }

    render() {
        return (
            <div>
                <section className="breadcrumbs-custom bg-image context-dark" style={{ backgroundImage: "url(" + blogHeaderImage + ")" }}>
                    <div className="breadcrumbs-custom-inner">
                        <div className="container breadcrumbs-custom-container">
                        </div>
                    </div>
                </section>
                {
                    !this.state.isUserLogin ?
                    <section className="section section-lg">
                        <div className="container centerAlign">
                            <div className="row row-50 row-xxl-70">
                                {this.state.blogs.map((item, key) => {
                                    return <SingleBlog blog={item} key={key} />
                                })}
                            </div>
                            <Pagination
                                className="paginationStyle"
                                innerClass='pagination'
                                activeClass='page-item active'
                                itemClass='page-item'
                                linkClass='page-link button-winona'
                                activePage={this.state.currentPage}
                                itemsCountPerPage={4}
                                totalItemsCount={this.state.totalItem}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                            />
                        </div>
                    </section>
                    : ''
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogsDetails: state.blogReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBlogs: (page) => {
            dispatch(getBlogs(page));
        },
        getBlog: (body) => {
            dispatch(getBlog(body));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
