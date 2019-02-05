import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import {
    Link
} from 'react-router-dom'
export class SingleLecture extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="col-md-6 scaleFadeInWrap">
                <div className="wow scaleFadeIn" data-wow-delay=".1s">
                    <article className="post-modern">
                        <h4 className="post-modern-title"><Link to={{ pathname: '/lectureDetails', state:this.props.lecture }}><a href="single-blog-post.html">{renderHTML(this.props.lecture.title.en)}</a></Link></h4>
                        <ul className="post-modern-meta">
                            <li>{this.props.lecture.event}</li>
                            <li>
                                { this.props.lecture.date ? new Date(this.props.lecture.date).toDateString() : ""}
                            </li>
                        </ul>
                    </article>
                </div>
            </div>

        );
    }
}
export default SingleLecture;