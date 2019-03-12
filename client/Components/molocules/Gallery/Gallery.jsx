import React, { Component } from 'react';

export class Gallery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="oh text-center text-sm-left padBottom">
                    <div style={{ textAlign: 'center' }}>
                        <p className="bookingForm">
                            Gallery
                        </p>
                    </div>
                    <div className="container">
                        <div className="isotope isotope-responsive row">
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 3">
                                <a className="thumbnail-modern" href="images/gallery-original-1.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-1-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 2">
                                <a className="thumbnail-modern" href="images/gallery-original-2.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-2-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 1">
                                <a className="thumbnail-modern" href="images/gallery-original-3.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-3-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 2">
                                <a className="thumbnail-modern" href="images/gallery-original-4.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-4-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 3">
                                <a className="thumbnail-modern" href="images/gallery-original-5.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-5-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 1">
                                <a className="thumbnail-modern" href="images/gallery-original-6.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-6-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 3">
                                <a className="thumbnail-modern" href="images/gallery-original-7.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-7-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 1">
                                <a className="thumbnail-modern" href="images/gallery-original-8.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-8-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                            <div className="col-sm-6 col-lg-4 isotope-item" data-filter="Type 2">
                                <a className="thumbnail-modern" href="images/gallery-original-9.jpg" data-lightgallery="item"><img className="thumbnail-modern-image" src="images/grid-layout-9-370x256.jpg" alt="" width="370" height="256" />
                                    <div className="thumbnail-modern-caption"><span className="icon mdi mdi-magnify"> </span></div>
                                    <div className="thumbnail-modern-dummy"></div></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Gallery;