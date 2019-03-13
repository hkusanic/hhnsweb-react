import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLectures } from '../../../actions/lectureActions';
import * as queryString from 'query-string';

export class AudioList extends Component {
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
        const values = queryString.parse(location.search)
        this.setState({
            lectures: this.props.lecturesDetails.lectures,
            currentPage: this.props.lecturesDetails.currentPage,
            totalItem: this.props.lecturesDetails.totalLectures
        })
        console.log('======>',values);
        this.props.getLectures({page:1,event:values.event,topic:values.topic,title:values.title,verse: values.verse});
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
        console.log('======>',values);
        this.props.getLectures({page:pageNumber,event:values.event,topic:values.topic,title:values.title,verse: values.verse});
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
                      <form class="rd-form rd-mailform" data-form-output="form-output-global" data-form-type="contact" method="post">
                      <div style={{"marginLeft": "10px","margin-right": "10px"}} class="row row-10">
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-first-name">Title</label>
                            <input class="form-input" id="contact-2-first-name" type="text" name="title" data-constraints="@Required"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-last-name">Author</label>
                            <input class="form-input" id="contact-2-last-name" type="text" name="topic" data-constraints="@Required"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-email">Translation</label>
                            <input class="form-input" id="contact-2-email" type="email" name="translation" data-constraints="@Email @Required"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-phone">Location</label>
                            <input class="form-input" id="contact-2-phone" type="text" name="location" data-constraints="@PhoneNumber"/>
                          </div>
                        </div>
                      
                      </div>
                      <div style={{"marginLeft": "10px","margin-right": "10px"}} class="row row-10">
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-first-name">Topic</label>
                            <input class="form-input" id="contact-2-first-name" type="text" name="topic" data-constraints="@Required"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-last-name">Song</label>
                            <input class="form-input" id="contact-2-last-name" type="text" name="song" data-constraints="@Required"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-email">Chapter</label>
                            <input class="form-input" id="contact-2-email" type="email" name="chapter" data-constraints="@Email @Required"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-phone">Verse</label>
                            <input class="form-input" id="contact-2-phone" type="text" name="verse" data-constraints="@PhoneNumber"/>
                          </div>
                        </div>
                      
                      </div>
                      <div style={{"marginLeft": "10px","margin-right": "10px"}} class="row row-10">
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-first-name">Event</label>
                            <input class="form-input" id="contact-2-first-name" type="text" name="event" data-constraints="@Required"/>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-wrap">
                            <label class="form-label-outside" for="contact-2-last-name">Date</label>
                            <input class="form-input" id="contact-2-last-name" type="text" name="date" data-constraints="@Required"/>
                          </div>
                        </div>
                        <div style={{"marginTop":"25px"}}class="col-md-3">
                        <button class="button button-primary button-winona" type="submit">Search</button>
                      
                        </div>
                      </div>
                    
            </form>
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


export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
