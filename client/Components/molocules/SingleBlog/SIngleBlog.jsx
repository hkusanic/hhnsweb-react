import React, { Component } from 'react';

export class SingleBlog extends Component {
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
                        <a className="post-modern-media">
                            {/* <img src="images/grid-blog-4-571x353.jpg" alt="" width="100" height="100" /> */}
                        </a>
                        <h4 className="post-modern-title"><a href="single-blog-post.html">How to Choose Your Ideal Travel Destination: Tips from Our Travel Agents</a></h4>
                        <ul className="post-modern-meta">
                            <li>by Theresa Barnes</li>
                            <li>
                                <time datetime="2018">Apr 21, 2018 at 12:05 pm</time>
                            </li>
                            <li><a className="button-winona" href="#">News</a></li>
                        </ul>
                        <p>Ubi est barbatus era? Impositios unda in barbatus sala! Danista, gemna, et abactor. Ecce. Nunquam quaestio cobaltum. Fuga de emeritis scutum, resuscitabo fraticinida!</p>
                    </article>
                </div>
            </div>

        );
    }
}

export default SingleBlog;