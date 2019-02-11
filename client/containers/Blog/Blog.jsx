import React, { Component } from 'react';
import SingleBlog from '../../Components/molocules/SingleBlog/SIngleBlog';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { getBlogs,getBlog } from '../../actions/blogActions';
export class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItem: null,
            currentPage: null,
            page: null,
            blogs: []
        }

        this.props.getBlog({"date":"Wed, Nov 22, 2017",
        "language": "en"});
    }

    componentDidMount() {
        this.setState({
            totalItem: this.props.blogsDetails.totalBlogs,
            blogs: this.props.blogsDetails.blogs,
            currentPage: this.props.blogsDetails.currentPage
        })
        this.props.getBlogs(1);
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            totalItem: nextprops.blogsDetails.totalBlogs,
            blogs: nextprops.blogsDetails.blogs,
            currentPage: nextprops.blogsDetails.currentPage
        })
    }

    handlePageChange = (pageNumber) => {
        this.props.getBlogs(pageNumber);
    }

    render() {
        return (
            <div >
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
