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
                <section class="section section-lg">
                    <div class="container padLeftBlog">
                        <div class="row row-50">
                            <div class="col-lg-12">
                                <article class="post-creative">
                                    <h3 class="post-creative-title alignment padLeft">
                                        {renderHTML(reactCookie.load('languageCode') === 'en'?this.props.location.state.title_en : this.props.location.state.title_ru)}
                                    </h3>
                                    <ul class="post-creative-meta">
                                        <li><span class="icon mdi mdi-calendar-clock"></span>
                                            <time dateTime="2018">
                                                {new Date(this.props.location.state.date).toDateString()}
                                            </time>
                                        </li>
                                        <li><span class="icon mdi mdi-tag-multiple"></span><a>Blog</a></li>
                                    </ul>
                                    {renderHTML(reactCookie.load('languageCode') === 'en'?this.props.location.state.body_en : this.props.location.state.body_ru)}
                                </article>
                            </div>
                            <div class="col-lg-4">
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default BlogDetails;

