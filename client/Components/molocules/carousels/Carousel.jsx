import React, { Component } from 'react';
import  script  from "../../../assets/script";

export class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        script();
    }
    render() {
        return (
            <div>
                <section className="swiper-container swiper-slider swiper-slider-light bg-gray-700" data-loop="true" data-autoplay="5000" data-simulate-touch="false" data-custom-slide-effect="inter-leave-effect" data-inter-leave-offset="-.5">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" data-slide-bg="images/slide-1-1920x776.jpg">
                            <div className="slide-inner">
                                <div className="container">
                                    <div className="swiper-slide-caption">
                                        <h1 className="wow-outer"><span className="font-weight-light wow-outer"><span className="wow" data-caption-animate="slideInDown">Unique Travel</span></span><span className="font-weight-bold wow-outer"><span className="wow" data-caption-animate="slideInDown" data-wow-delay="0">Insights & Tips</span></span></h1>
                                        <div className="wow-outer button-outer"><a className="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" data-slide-bg="images/slide-2-1920x776.jpg">
                            <div className="slide-inner">
                                <div className="container">
                                    <div className="swiper-slide-caption">
                                        <h1 className="wow-outer"><span className="font-weight-light wow-outer"><span className="wow" data-caption-animate="slideInDown">Enjoy Your</span></span><span className="font-weight-bold wow-outer"><span className="wow" data-caption-animate="slideInDown" data-wow-delay="0">Dream Vacation</span></span></h1>
                                        <div className="wow-outer button-outer"><a className="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" data-slide-bg="images/slide-3-1920x776.jpg">
                            <div className="slide-inner">
                                <div className="container">
                                    <div className="swiper-slide-caption">
                                        <h1 className="wow-outer"><span className="font-weight-light wow-outer"><span className="wow" data-caption-animate="slideInDown">Wide Variety of</span></span><span className="font-weight-bold wow-outer"><span className="wow" data-caption-animate="slideInDown" data-wow-delay="0">Amazing Tours</span></span></h1>
                                        <div className="wow-outer button-outer"><a className="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-pagination-outer container">
                        <div className="swiper-pagination swiper-pagination-modern swiper-pagination-marked" data-index-bullet="true"></div>
                    </div>
                </section>


            </div>
        );
    }
}

export default Carousel;