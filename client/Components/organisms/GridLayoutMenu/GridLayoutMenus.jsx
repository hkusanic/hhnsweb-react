import React from 'react';

export class GridLayoutMenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <section class="section-lg text-center bg-gray-100">
                    <div class="container">
                        {/* <h3 class="wow-outer"><span class="wow slideInUp">Our Best Tours</span></h3> */}
                        <div class="row row-50 row-lg-70 offset-top-2">
                            <div class="col-sm-6 col-lg-3 wow-outer">
                                <article class="tour-default wow slideInLeft"><a class="tour-default-figure" href="#"><img src="images/tour-1-270x200.jpg" alt="" width="270" height="200" /></a>
                                    <div class="tour-default-caption">
                                        <h5 class="tour-default-title"><a href="#">France, Paris</a></h5>
                                    </div>
                                </article>
                            </div>
                            <div class="col-sm-6 col-lg-3 wow-outer">
                                <article class="tour-default wow slideInLeft" data-wow-delay=".05s"><a class="tour-default-figure" href="#"><img src="images/tour-2-270x200.jpg" alt="" width="270" height="200" /></a>
                                    <div class="tour-default-caption">
                                        <h5 class="tour-default-title"><a href="#">USA, Boston</a></h5>
                                        <div class="heading-5 tour-default-price">$380</div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-sm-6 col-lg-3 wow-outer">
                                <article class="tour-default wow slideInLeft" data-wow-delay=".1s"><a class="tour-default-figure" href="#"><img src="images/tour-3-270x200.jpg" alt="" width="270" height="200" /></a>
                                    <div class="tour-default-caption">
                                        <h5 class="tour-default-title"><a href="#">Italy, Venice</a></h5>
                                    </div>
                                </article>
                            </div>
                            <div class="col-sm-6 col-lg-3 wow-outer">
                                <article class="tour-default wow slideInLeft" data-wow-delay=".15s"><a class="tour-default-figure" href="#"><img src="images/tour-4-270x200.jpg" alt="" width="270" height="200" /></a>
                                    <div class="tour-default-caption">
                                        <h5 class="tour-default-title"><a href="#">Spain, Benidorm</a></h5>
                                    </div>
                                </article>
                            </div>
                            <div class="col-sm-6 col-lg-3 wow-outer">
                                <article class="tour-default wow slideInLeft"><a class="tour-default-figure" href="#"><img src="images/tour-5-270x200.jpg" alt="" width="270" height="200" /></a>
                                    <div class="tour-default-caption">
                                        <h5 class="tour-default-title"><a href="#">Egypt, Cairo</a></h5>
                                    </div>
                                </article>
                            </div>
                            <div class="col-sm-6 col-lg-3 wow-outer">
                                <article class="tour-default wow slideInLeft" data-wow-delay=".05s"><a class="tour-default-figure" href="#"><img src="images/tour-6-270x200.jpg" alt="" width="270" height="200" /></a>
                                    <div class="tour-default-caption">
                                        <h5 class="tour-default-title"><a href="#">Swiss Alps</a></h5>
                                    </div>
                                </article>
                            </div>
                            <div class="col-sm-6 col-lg-3 wow-outer">
                                <article class="tour-default wow slideInLeft" data-wow-delay=".1s"><a class="tour-default-figure" href="#"><img src="images/tour-7-270x200.jpg" alt="" width="270" height="200" /></a>
                                    <div class="tour-default-caption">
                                        <h5 class="tour-default-title"><a href="#">Czech Republic</a></h5>
                                    </div>
                                </article>
                            </div>
                            <div class="col-sm-6 col-lg-3 wow-outer">
                                <article class="tour-default wow slideInLeft" data-wow-delay=".15s"><a class="tour-default-figure" href="#"><img src="images/tour-8-270x200.jpg" alt="" width="270" height="200" /></a>
                                    <div class="tour-default-caption">
                                        <h5 class="tour-default-title"><a href="#">Great Britain, London</a></h5>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default GridLayoutMenus;