import React, { Component } from 'react';
import SingleBlog from '../../Components/molocules/SingleBlog/SIngleBlog';
import axios from 'axios';
import Pagination from 'react-js-pagination';

export class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItem: null,
            currentPage: null,
            page: null,
            blogs: []
        }
    }

    componentDidMount() {
        const API_URL = 'http://localhost:3000/api/blog/';
        const request = axios.get(API_URL);
        request.then((response) => {
            this.setState({
                blogs: response.data.blog.results,
                totalItem: response.data.blog.total,
                currentPage: response.data.blog.currentPage
            })
        })
            .catch((err) => {
                console.log("error", err);
            })
    }

    handlePageChange = (pageNumber) => {
        const API_URL = `http://localhost:3000/api/blog?page=${pageNumber}`;
        const request = axios.get(API_URL);
        request.then((response) => {
            this.setState({
                blogs: response.data.blog.results,
                totalItem: response.data.blog.total,
                currentPage: response.data.blog.currentPage
            })
        })
            .catch((err) => {
                console.log("error", err);
            })
    }
    render() {
        return (
            <div >
                <section className="section section-lg">
                    <div className="container">
                        <div className="row row-50 row-xxl-70">
                            {this.state.blogs.map((item, key) => {
                                return <SingleBlog blog={item} key={key} />
                            })}
                        </div>
                        <Pagination
                            style={{ fontSize: '30px', lineHeight: '2em' }}
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

export default Blogs;