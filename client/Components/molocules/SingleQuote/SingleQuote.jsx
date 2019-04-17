import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import {
    Link
} from 'react-router-dom';
import reactCookie from "react-cookies";

export class SingleQuote extends Component {
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
                        <h4 className="post-modern-title"><Link to={{ pathname: '/quoteDetails', state:this.props.quote }}>{renderHTML(this.props.quote.en.title)}</Link></h4>
                        <ul className="post-modern-meta">
                            <li>
                                {reactCookie.load("languageCode") === "en"
                                ? this.props.quote.en.body
                                : this.props.quote.ru.body}
                            </li>
                            <li>
                                { this.props.quote.date ? new Date(this.props.quote.date).toDateString() : ""}
                            </li>
                        </ul>
                    </article>
                </div>
            </div>

        );
    }
}
export default SingleQuote;