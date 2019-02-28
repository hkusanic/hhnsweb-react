import React from 'react';

const singleCarousel = (props) => {
    let text = props.text;
    return <div className="swiper-slide" data-slide-bg={props.image}>
        <div className="slide-inner">
            <div className="container textCarousel">
                <div className="swiper-slide-caption">
                    <h1 className="wow-outer"><span className="font-weight-light wow-outer"><span className="wow" data-caption-animate="slideInDown">{props.heading} </span></span><span className="font-weight-bold wow-outer"><span className="wow" data-caption-animate="slideInDown" data-wow-delay="0">{props.text}</span></span></h1>
                </div>
            </div>
        </div>
    </div>
}

export default singleCarousel;