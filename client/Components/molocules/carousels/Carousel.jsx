import React, { Component } from 'react';
import  script  from "../../../assets/script";
import image1 from './../../../assets/images/_DSC1480.png';
import image2 from './../../../assets/images/1.jpg';
import image3 from './../../../assets/images/IMG_1709.jpg';
import image4 from './../../../assets/images/IMG_2570.jpg';
import image5 from './../../../assets/images/IMG_2735.jpg';


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
                        <div className="swiper-slide" data-slide-bg={image1}>
                            <div className="slide-inner">
                                <div className="container">
                                    <div className="swiper-slide-caption">
                                        <h1 className="wow-outer"><span className="font-weight-light wow-outer"><span className="wow" data-caption-animate="slideInDown">The Official Website </span></span><span className="font-weight-bold wow-outer"><span className="wow" data-caption-animate="slideInDown" data-wow-delay="0">H.H. Niranjana Swami</span></span></h1>
                                        <div className="wow-outer button-outer"><a className="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s"> </a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" data-slide-bg={image2}>
                            <div className="slide-inner">
                                <div className="container">
                                    <div className="swiper-slide-caption">
                                        <h1 className="wow-outer"><span className="font-weight-light wow-outer"><span className="wow" data-caption-animate="slideInDown">Enjoy Your</span></span><span className="font-weight-bold wow-outer"><span className="wow" data-caption-animate="slideInDown" data-wow-delay="0">Dream Vacation</span></span></h1>
                                        <div className="wow-outer button-outer"><a className="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" data-slide-bg={image3}>
                            <div className="slide-inner">
                                <div className="container">
                                    <div className="swiper-slide-caption">
                                        <h1 className="wow-outer"><span className="font-weight-light wow-outer"><span className="wow" data-caption-animate="slideInDown">Enjoy Your</span></span><span className="font-weight-bold wow-outer"><span className="wow" data-caption-animate="slideInDown" data-wow-delay="0">Dream Vacation</span></span></h1>
                                        <div className="wow-outer button-outer"><a className="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" data-slide-bg={image4}>
                            <div className="slide-inner">
                                <div className="container">
                                    <div className="swiper-slide-caption">
                                        <h1 className="wow-outer"><span className="font-weight-light wow-outer"><span className="wow" data-caption-animate="slideInDown">Enjoy Your</span></span><span className="font-weight-bold wow-outer"><span className="wow" data-caption-animate="slideInDown" data-wow-delay="0">Dream Vacation</span></span></h1>
                                        <div className="wow-outer button-outer"><a className="button button-lg button-primary button-winona wow" href="#" data-caption-animate="slideInDown" data-wow-delay=".2s">Learn More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" data-slide-bg={image5}>
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