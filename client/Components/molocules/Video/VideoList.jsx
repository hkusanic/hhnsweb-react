import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLectures } from '../../../actions/lectureActions';

export class VideoList extends Component {
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
        this.setState({
            lectures: this.props.lecturesDetails.lectures,
            currentPage: this.props.lecturesDetails.currentPage,
            totalItem: this.props.lecturesDetails.totalLectures
        })
        this.props.getLectures(1);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lectures: nextProps.lecturesDetails.lectures,
            currentPage: nextProps.lecturesDetails.currentPage,
            totalItem: nextProps.lecturesDetails.totalLectures
        })
    }

    handlePageChange = (pageNumber) => {
        this.props.getLectures(pageNumber);
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
                                        <th className="align">Title</th>
                                        <th className="padLeft">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.lectures.map((item, key) => {
                                        return <tr key={key}>
                                            <td className="titleColor"><Link to={{ pathname: '/videoDetails', state: item }}>{renderHTML(item.title.en)}</Link></td>
                                            <td className="padLeft">60</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)