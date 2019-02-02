import React, { Component } from 'react';
import renderHTML from 'react-render-html';
export class VideoDetails extends Component {
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
                                        {renderHTML(this.props.location.state.title.en)}
                                    </h3>
                                    <ul class="post-creative-meta">
                                        <li><span class="icon mdi mdi-calendar-clock"></span>
                                            <time datetime="2018">
                                                {new Date(this.props.location.state.date).toDateString()}
                                            </time>
                                        </li>
                                        <li><span class="icon mdi mdi-tag-multiple"></span><a>Lecture</a></li>
                                    </ul>
                                </article>
                                <div>
                                   
                                    <div  className="row row-50 row-xxl-70 padTop">
                                        {
                                            this.props.location.state.youtube.map((item, key) => {
                                                return  <iframe className="iframeStyle"
                                                            src={item}>
                                                        </iframe>
                                                    
                                            })
                                        }
                                    </div>
                                    {/* <div className="row row-50 row-xxl-70">
                                    </div> */}
                                </div>
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

export default VideoDetails;

