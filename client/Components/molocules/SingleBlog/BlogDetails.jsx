import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';

export class BlogDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.location.state) {
            return <div>Error Occured..........</div>
        }
        return (
            <div>
                <section className="section section-lg">
                    <div className="container padLeftBlog">
                        <div className="row row-50">
                            <div className="col-lg-12">
                                <article className="post-creative">
                                    <h3 className="post-creative-title alignment padLeft">
                                        {renderHTML(reactCookie.load('languageCode') === 'en'?this.props.location.state.title_en : this.props.location.state.title_ru)}
                                    </h3>
                                    <ul className="post-creative-meta">
                                        <li><span className="icon mdi mdi-calendar-clock"></span>
                                            <time dateTime="2018">
                                                {new Date(this.props.location.state.date).toDateString()}
                                            </time>
                                        </li>
                                        <li><span className="icon mdi mdi-tag-multiple"></span><a>Blog</a></li>
                                    </ul>
                                    {renderHTML(reactCookie.load('languageCode') === 'en'?this.props.location.state.body_en : this.props.location.state.body_ru)}
                                </article>
                            </div>
                            <div className="col-lg-4">
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default BlogDetails;

