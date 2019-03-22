import React, { Component } from 'react';
import SingleLecture from '../../Components/molocules/SingleLecture/SingleLecture';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { searchLecture } from '../../actions/lectureActions';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';

export class Lectures extends Component {
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
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({
            lectures: this.props.lecturesDetails.lectures,
            currentPage: this.props.lecturesDetails.currentPage,
            totalItem: this.props.lecturesDetails.totalLectures,
            isUserLogin
        })
        this.props.searchLecture({page: 1});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lectures: nextProps.lecturesDetails.lectures,
            currentPage: nextProps.lecturesDetails.currentPage,
            totalItem: nextProps.lecturesDetails.totalLectures
        })
    }

    handlePageChange = (pageNumber) => {
        this.props.searchLecture({page: pageNumber});
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
                    <img  className="img-banner-width" src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
                </section>
                {
                    !this.state.isUserLogin ?
                        <div className="container">
                            <div style={{ textAlign: 'center' }}>
                                <p className="bookingForm">
                                    <Translate>{({ translate }) => translate('lecturesTitle')}</Translate>
                                </p>
                            </div>
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
                        : 
                        <div style={{ textAlign: "center" }}>
                            <p className="bookingForm">Please Log in to Continue</p>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lecturesDetails: state.lectureReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchLecture: (page) => {
            dispatch(searchLecture(page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lectures);