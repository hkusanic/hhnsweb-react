import React, { Component } from 'react';
import script from "../../../assets/script";
import image1 from './../../../assets/images/carousel/1.png';
import image2 from './../../../assets/images/carousel/2.png';
import image3 from './../../../assets/images/carousel/3.png';
import image4 from './../../../assets/images/carousel/4.jpg';
import SingleCarousel from '../../atoms/SingleCarousel/singleCarousel';
import Biography from '../Biography/Biography';

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
                        image={image1}
                        heading="The Official Website "
                        text="H.H. Niranjana Swami" />
                    <SingleCarousel
                        image={image2}
                        heading=""
                        text="" />
                    <SingleCarousel
                        image={image3}
                        heading=""
                        text="" />
                    <SingleCarousel
                        image={image4}
                        heading=""
                        text="" />
                </div>
                <div className="swiper-pagination-outer container alignment">
                    <div className="swiper-pagination swiper-pagination-modern swiper-pagination-marked" data-index-bullet="true"></div>
                </div>
            </section>
            <Biography></Biography>
            </div>
          
        );
    }
}

export default Carousel;
