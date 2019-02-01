import React, { Component } from 'react';
import axios from 'axios';
import SingleLecture from '../../Components/molocules/SingleLecture/SingleLecture';
import Pagination from 'react-js-pagination';
import renderHTML from 'react-render-html';
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

    showing100Characters = (sentence) => {
        var result = sentence;
        var resultArray = result.split(' ');
        if (resultArray.length > 10) {
            resultArray = resultArray.slice(0, 10);
            result = resultArray.join(' ') + '...';
        }
        return result;
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
                        {/* <div className="table-responsive wow fadeIn">
                            <table className="table table-hover table-job-positions">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Title</th>
                                        <th>Event</th>
                                        <th>date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.lectures.map((item, key) => {
                                            return <tr key={key}>
                                                <td style={{ color: '#ff830a' }}>{renderHTML(this.showing100Characters(item.title.en))}</td>
                                                <td>{item.event}</td>
                                                <td>{ new Date(item.date).getDate()}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> */}
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