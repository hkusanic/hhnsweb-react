import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';
import { Translate } from 'react-localize-redux';

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
                    <div class="container padTop">
                        <div class="row row-50">
                            <div class="col-lg-12">
                                <article class="post-creative">
                                    <h3 class="post-creative-title">
                                        {renderHTML(reactCookie.load('languageCode') === 'en' ? this.props.location.state.en.title : this.props.location.state.ru.title)}
                                    </h3>
                                    <ul class="post-creative-meta">
                                        <li><span class="icon mdi mdi-calendar-clock"></span>
                                            <time datetime="2018">
                                                {new Date(this.props.location.state.created_date).toDateString()}
                                            </time>
                                        </li>
                                        <li><span class="icon mdi mdi-tag-multiple">
                                            </span><a><Translate>{({ translate }) => translate('HOME.video')}</Translate></a>
                                        </li>
                                    </ul>
                                </article>
                                <div>

                                    <div className="row row-50 row-xxl-70 padTop flexDiv padLeftRow">
                                        { 
                                            this.props.location.state.youtube ? 
                                            this.props.location.state.youtube.map((item, key) => {
                                                return <div key={key} className="flexRow">
                                                    <iframe className="iframeStyle"
                                                        src={item}>
                                                    </iframe>
                                                </div>

                                            })
                                            : null
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

