import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export class AudioDetails extends Component {
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
                        <div class="row row-100">
                            <div class="col-lg-12">
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
                                <div className="audioStyle">
                                    <audio controls>
                                        <source src={renderHTML(this.props.location.state.audio)} type="audio/mpeg" />
                                    </audio>
                                </div>
                                <div>
                                    <table className="maintable">
                                        <tbody>
                                            <tr>
                                                <td><b><span>Event</span> :</b></td><td className="padLeftRow">{this.props.location.state.event}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Durations</span> :</b></td  ><td className="padLeftRow">{this.props.location.state.duration}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Location</span> :</b></td ><td className="padLeftRow">{this.props.location.state.location}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Download</span> :</b></td><td className="padLeftRow">{this.props.location.state.downloads}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Topic</span> :</b></td><td className="padLeftRow">{this.props.location.state.topic}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <div class="col-lg-4">
                            </div> */}
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default AudioDetails;

