import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import {
    Link
} from 'react-router-dom'
export class SingleBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
            <div className="col-md-6 scaleFadeInWrap">

                <div className="wow scaleFadeIn" data-wow-delay=".1s">
                    <article className="post-modern">
                        <a className="post-modern-media">
                        </a>
                        <h4 className="post-modern-title"><Link to={{ pathname: '/blogDetails', state:this.props.blog }}><a href="single-blog-post.html">{renderHTML(this.props.blog.title)}</a></Link></h4>
                        <ul className="post-modern-meta">
                            <li>by {this.props.blog.author}</li>
                            <li>
                                <time datetime="2018">{new Date(this.props.blog.date).toDateString()}</time>
                            </li>
                        </ul>
                        <p>{renderHTML(this.showing100Characters(this.props.blog.body))}</p>
                    </article>
                </div>
            </div>

        );
    }
}
export default SingleBlog;