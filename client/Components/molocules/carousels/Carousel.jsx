import React, { Component } from 'react';
import script from "../../../assets/script";
import SingleCarousel from '../../atoms/SingleCarousel/singleCarousel';
import Biography from '../Biography/Biography';
import Announcement from '../../organisms/Announcement/Announcement';
export class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        script();
    }
    render() {
        return (
            <div>
                <section className="swiper-container swiper-slider swiper-slider-light bg-gray-700" data-loop="true" data-autoplay="5000" data-simulate-touch="false" data-custom-slide-effect="inter-leave-effect" data-inter-leave-offset="-.5">
                    <div className="swiper-wrapper">
                        <SingleCarousel
                            image="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_portrait_no_logo_rJorBWrIN.jpg"
                            heading=''
                            text='' />
                        <SingleCarousel
                            image="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture-abhishek_no_logo_rk3rB-HLV.jpg"
                            heading=''
                            text='' />
                        <SingleCarousel
                            image="https://ik.imagekit.io/gcwjdmqwwznjl/Home_Page-carousel_picture_kirtan_no_logo_HJiHHWrLN.jpg"
                            heading=''
                            text='' />
                    </div>
                    <div className="swiper-pagination-outer container alignment">
                        <div className="swiper-pagination swiper-pagination-modern swiper-pagination-marked" data-index-bullet="true"></div>
                    </div>
                </section>
                <Biography></Biography>
                <Announcement />
            </div>

        );
    }
}

export default Carousel;
