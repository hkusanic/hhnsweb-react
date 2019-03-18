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
                <section className="section section-lg">
                    <div className="container">
                        <div style={{"paddingLeft":"15%"}} className="row row-100">
                            <div className="col-lg-12">
                                <article className="post-creative">
                                    <h3 className="post-creative-title">
                                        {renderHTML(this.props.location.state.en.title)}
                                    </h3>
                                    <ul className="post-creative-meta">
                                        <li><span className="icon mdi mdi-calendar-clock"></span>
                                            <time dateTime="2018">
                                                {new Date(this.props.location.state.created_date).toDateString()}
                                            </time>
                                        </li>
                                        <li><span className="icon mdi mdi-tag-multiple"></span><a>Lecture</a></li>
                                    </ul>
                                </article>
                                <div className="audioStyle">
                                    <audio controls>
                                        <source src={renderHTML(this.props.location.state.audio_link)} type="audio/mpeg" />
                                    </audio>
                                </div>
                                <div>
                                    <table className="maintable">
                                        <tbody>
                                            <tr>
                                                <td><b><span>Event</span> :</b></td><td className="padLeftRow">{this.props.location.state.en.event}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Durations</span> :</b></td  ><td className="padLeftRow">{this.props.location.state.duration}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Location</span> :</b></td ><td className="padLeftRow">{this.props.location.state.en.location}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Download</span> :</b></td><td className="padLeftRow">{this.props.location.state.downloads}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Topic</span> :</b></td><td className="padLeftRow">{this.props.location.state.en.topic}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default AudioDetails;

