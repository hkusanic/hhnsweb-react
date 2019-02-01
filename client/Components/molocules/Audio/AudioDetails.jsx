import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export class AudioDetails extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("props=====>>", this.props);
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
                                <div style={{paddingTop: '2em', paddingBottom: '1em'}}>
                                    <audio controls>
                                        <source src={renderHTML(this.props.location.state.audio)} type="audio/mpeg" />
                                    </audio>
                                </div>
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{ paddingTop: '1em', paddingBottom: '1em' }}><b><span style={{width:'85px', display:'inline-block'}}>Event</span> :</b></td><td style={{ paddingTop: '1em', paddingBottom: '1em', paddingLeft:'1em' }}>{this.props.location.state.event}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ paddingTop: '1em', paddingBottom: '1em' }}><b><span style={{width:'85px', display:'inline-block'}}>Durations</span> :</b></td  ><td style={{ paddingTop: '1em', paddingBottom: '1em', paddingLeft:'1em'  }}>{this.props.location.state.duration}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ paddingTop: '1em', paddingBottom: '1em' }}><b><span style={{width:'85px', display:'inline-block'}}>Location</span> :</b></td ><td style={{ paddingTop: '1em', paddingBottom: '1em', paddingLeft:'1em'  }}>{this.props.location.state.location}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ paddingTop: '1em', paddingBottom: '1em' }}><b><span style={{width:'85px', display:'inline-block'}}>Download</span> :</b></td><td style={{ paddingTop: '1em', paddingBottom: '1em', paddingLeft:'1em'  }}>{this.props.location.state.downloads}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ paddingTop: '1em', paddingBottom: '1em' }}><b><span style={{width:'85px', display:'inline-block'}}>Topic</span> :</b></td><td style={{ paddingTop: '1em', paddingBottom: '1em', paddingLeft:'1em'  }}>{this.props.location.state.topic}</td>
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

