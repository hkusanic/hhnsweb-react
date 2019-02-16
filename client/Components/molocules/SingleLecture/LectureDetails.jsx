import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export class LectureDetails extends Component {
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
                        <div className="row row-50">
                            <div className="col-lg-8">
                                <article className="post-creative">
                                    <h3 className="post-creative-title">
                                        {renderHTML(this.props.location.state.title.en)}
                                    </h3>
                                    <ul className="post-creative-meta">
                                        <li><span className="icon mdi mdi-calendar-clock"></span>
                                            <time dateTime="2018">
                                                {new Date(this.props.location.state.date).toDateString()}
                                            </time>
                                        </li>
                                        <li><span className="icon mdi mdi-tag-multiple"></span><a>Lecture</a></li>
                                    </ul>
                                </article>
                                <div>
                                    <table className="maintable">
                                        <tbody>
                                            <tr>
                                                <td><b><span>Event</span> :</b></td><td className="padLeftRow">{this.props.location.state.event}</td>
                                            </tr>
                                            <tr>
                                                <td><b><span>Durations</span> :</b></td><td className="padLeftRow">{this.props.location.state.duration}</td>
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
                                    <div className="padTop">
                                        <table>
                                            <tbody>
                                                {
                                                    this.props.location.state.youtube.map((item, key) => {
                                                        return <tr key={key}>
                                                            <td>
                                                                <iframe className="iframeStyle"
                                                                    src={item}>
                                                                </iframe>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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

export default LectureDetails;

