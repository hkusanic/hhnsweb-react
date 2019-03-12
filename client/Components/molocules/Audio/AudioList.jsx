import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLectures } from '../../../actions/lectureActions';
import * as queryString from 'query-string';
import Auth from '../../../utils/Auth';
export class AudioList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: true,
            totalItem: null,
            currentPage: null,
            page: null,
            lectures: []
        }
    }

    componentDidMount() {
        const values = queryString.parse(location.search)
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({
            lectures: this.props.lecturesDetails.lectures,
            currentPage: this.props.lecturesDetails.currentPage,
            totalItem: this.props.lecturesDetails.totalLectures,
            isUserLogin
        })
        this.props.getLectures({ page: 1, event: values.event, topic: values.topic, title: values.title });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lectures: nextProps.lecturesDetails.lectures,
            currentPage: nextProps.lecturesDetails.currentPage,
            totalItem: nextProps.lecturesDetails.totalLectures
        })
    }

    handlePageChange = (pageNumber) => {
        const values = queryString.parse(location.search)
        this.props.getLectures({ page: pageNumber, event: values.event, topic: values.topic, title: values.title });
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
                <section className="bg-gray-100">
                    <img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
                </section>
                {
                    !this.state.isUserLogin ?
                        <div>
                            <div className="container">
                                <div className="table-responsive wow fadeIn">
                                    <table className="table table-hover table-job-positions">
                                        <thead>
                                            <tr>
                                                <th className="align">Title</th>
                                                <th className="padLeft">Player</th>
                                                <th>Downloads</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.lectures.map((item, key) => {
                                                return <tr key={key}>
                                                    <td className="titleColor"> <Link to={{ pathname: '/audioDetails', state: item }}>{renderHTML(item.title.en)}</Link></td>
                                                    <td>
                                                        <audio controls>
                                                            <source src={renderHTML(item.audio_link)} type="audio/mpeg" />
                                                        </audio>
                                                    </td>
                                                    <td>{item.downloads}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="padLeft">
                                <Pagination
                                    className="paginationStyle"
                                    innerClass='pagination'
                                    activeClass='page-item active'
                                    itemClass='page-item'
                                    linkClass='page-link button-winona'
                                    activePage={this.state.currentPage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.state.totalItem}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange}
                                />
                            </div>
                        </div>
                        : ''
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lecturesDetails: state.lectureReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLectures: (page) => {
            dispatch(getLectures(page));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
