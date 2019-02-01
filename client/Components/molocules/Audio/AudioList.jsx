import React, { Component } from 'react';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Pagination from 'react-js-pagination';

export class AudioList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lectures: [],
            totalItem: null,
            currentPage: null
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
                <section className="section section-lg text-center">
                    <div className="container">
                        <div className="table-responsive wow fadeIn">
                            <table className="table table-hover table-job-positions">
                                <thead>
                                    <tr>
                                        <th style={{textAlign:'center'}}>Title</th>
                                        <th style={{ paddingLeft: '10%' }}>Player</th>
                                        <th>Downloads</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.lectures.map((item, key) => {
                                        return <tr key={key}>
                                            <td style={{color:'#ff830a'}}>{renderHTML(item.title.en)}</td>
                                            <td>
                                                <audio controls>
                                                    <source src={renderHTML(item.audio)} type="audio/mpeg" />
                                                </audio>
                                            </td>
                                            <td>{item.downloads}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ paddingLeft: '10%' }}>
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
        );
    }
}

export default AudioList