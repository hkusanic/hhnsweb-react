import React, { Component } from 'react';

export class Photos extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="section section-lg oh text-center text-sm-left">
                    <div className="container">
                        <div className="isotope isotope-responsive row">
                            <div className="col-sm-6 col-lg-4 isotope-item">
                                <a className="thumbnail-corporate thumbnail-corporate-light" href="images/gallery-original-9.jpg" data-lightgallery="item"><img className="thumbnail-corporate-image" src="images/grid-layout-9-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-corporate-caption">
                                        <p className="thumbnail-corporate-title">2017</p>
                                    </div>
                                    <div className="thumbnail-corporate-dummy"> </div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item">
                                <a className="thumbnail-corporate thumbnail-corporate-light" href="images/gallery-original-3.jpg" data-lightgallery="item"><img className="thumbnail-corporate-image" src="images/grid-layout-3-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-corporate-caption">
                                        <p className="thumbnail-corporate-title">2018</p>
                                    </div>
                                    <div className="thumbnail-corporate-dummy"> </div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item">
                                <a className="thumbnail-corporate thumbnail-corporate-light" href="images/gallery-original-5.jpg" data-lightgallery="item"><img className="thumbnail-corporate-image" src="images/grid-layout-5-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-corporate-caption">
                                        <p className="thumbnail-corporate-title">2019</p>
                                    </div>
                                    <div className="thumbnail-corporate-dummy"> </div></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Photos;