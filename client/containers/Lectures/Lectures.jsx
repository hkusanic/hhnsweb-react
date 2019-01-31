import React, { Component } from 'react';
import axios from 'axios';
import SingleLecture from '../../Components/molocules/SingleLecture/SingleLecture';
import Pagination from 'react-js-pagination';

export class Lectures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItem: null,
            currentPage: null,
            page: null,
            lectures: []
        }
    }
    componentDidMount() {
        const API_URL = 'http://localhost:3000/api/lecture/';
        const request = axios.get(API_URL);
        request.then((response) => {
            this.setState({
                lectures: response.data.lecture.results,
                totalItem: response.data.lecture.total,
                currentPage: response.data.lecture.currentPage
            })
        })
            .catch((err) => {
                console.log("error occured", err);
            })
    }

    handlePageChange = (pageNumber) => {
        const API_URL = `http://localhost:3000/api/lecture?page=${pageNumber}`;
        const request = axios.get(API_URL);
        request.then((response) => {
            this.setState({
                lectures: response.data.lecture.results,
                totalItem: response.data.lecture.total,
                currentPage: response.data.lecture.currentPage
            })
        })
            .catch((err) => {
                console.log("error", err);
            })
    }
    render() {
        return (
            <div>
                <section className="section section-lg">
                    <div className="container">
                        <div className="row row-50 row-xxl-70">
                            {this.state.lectures.map((item, key) => {
                                return <SingleLecture lecture={item} key={key} />
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

export default Lectures;