import React, { Component } from 'react';

export class LatestLecture extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <div>
               <section className="section section-lg text-center">
                    <div className="container">
                        <h3 className="wow-outer text-center"><span className="wow slideInDown">Latest Lectures</span></h3>
                        <div className="row row-50">
                            <div className="col-md-6 wow-outer">

                                <article className="post-modern wow slideInLeft"><a className="post-modern-media"><img src="images/grid-blog-1-571x353.jpg" alt="" width="571" height="353" /></a>
                                    <h4 className="post-modern-title"><a>How to Plan Your Vacation in Advance</a></h4>
                                    <ul className="post-modern-meta">
                                        <li>by Theresa Barnes</li>
                                        <li>
                                            <time dateTime="2018">Apr 21, 2018 at 12:05 pm</time>
                                        </li>
                                        <li><a className="button-winona" href="#">News</a></li>
                                    </ul>
                                    <p>There are different types of travelers but all of them often ask us about proper travel planning. In this post, we decided to gather tips from our staff and famous travelers that we hope will help you...</p>
                                </article>
                            </div>
                            <div className="col-md-6 wow-outer">

                                <article className="post-modern wow slideInLeft"><a className="post-modern-media" href="single-blog-post.html"><img src="images/grid-blog-2-571x353.jpg" alt="" width="571" height="353" /></a>
                                    <h4 className="post-modern-title"><a href="single-blog-post.html">Your Personal Guide to 5 Best Places</a></h4>
                                    <ul className="post-modern-meta">
                                        <li>by Theresa Barnes</li>
                                        <li>
                                            <time dateTime="2018">Apr 21, 2018 at 12:05 pm</time>
                                        </li>
                                        <li><a className="button-winona" href="#">News</a></li>
                                    </ul>
                                    <p>Popular destinations change from year to year and what was trending in 2017 isn’t so interesting now. However, we have picked 5 best places worth visiting where most travelers haven’t been yet...</p>
                                </article>
                            </div>
                        </div>
                        <div className="wow-outer button-outer"><a className="button button-primary-outline button-winona wow slideInUp" href="grid-blog.html">View all Lecture</a></div>
                    </div>
                </section>
            </div>
        )
    }
}

export default LatestLecture;