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
                                                {this.props.location.state.date}
                                            </time>
                                        </li>
                                        <li><span class="icon mdi mdi-tag-multiple"></span><a>Lecture</a></li>
                                    </ul>
                                </article>
                                <div>
                                    <table>
                                        <tbody>
                                            <tr style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                                                <td><b>Event :</b></td><td>{this.props.location.state.event}</td>
                                            </tr>
                                            <tr style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                                                <td><b>Durations :</b></td><td>{this.props.location.state.duration}</td>
                                            </tr>
                                            <tr style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                                                <td><b>Location :</b></td><td>{this.props.location.state.location}</td>
                                            </tr>
                                            <tr style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                                                <td><b>Download :</b></td><td>{this.props.location.state.downloads}</td>
                                            </tr>
                                            <tr style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                                                <td><b>Topic :</b></td><td>{this.props.location.state.topic}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div style={{paddingTop: '1em'}}>
                                        {
                                            this.props.location.state.youtube.map((item, key) => {
                                                return <tr>
                                                    <td>
                                                        <iframe width="420" height="315"
                                                            src={item}>
                                                        </iframe>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </div>
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

export default LectureDetails;

