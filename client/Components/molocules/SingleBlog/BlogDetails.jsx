import React, { Component } from 'react';
import renderHTML from 'react-render-html';

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
                    <div class="container">
                        <div class="row row-50">
                            <div class="col-lg-8">
                                <article class="post-creative">
                                    <h3 class="post-creative-title">
                                        {renderHTML(this.props.location.state.title)}
                                    </h3>
                                    <ul class="post-creative-meta">
                                        <li><span class="icon mdi mdi-calendar-clock"></span>
                                            <time datetime="2018">
                                                {new Date(this.props.location.state.date).toDateString()}
                                            </time>
                                        </li>
                                        <li><span class="icon mdi mdi-tag-multiple"></span><a>Blog</a></li>
                                    </ul>
                                    {renderHTML(this.props.location.state.body)}
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

