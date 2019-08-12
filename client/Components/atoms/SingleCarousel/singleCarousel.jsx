import React from 'react';

const SingleCarousel = props => {
	return (
		<div className="swiper-slide" data-slide-bg={props.image} style={{  width: "100%" ,height: "764px"}}>
			<div className="slide-inner">
				<div className="container textCarousel">
					<div className="swiper-slide-caption">
						<h1 className="wow-outer carouselFont">
							<span className="font-weight-light wow-outer">
								<span style={{color:"black"}} className="wow" data-caption-animate="slideInDown">
									{props.heading}
									{' '}
								</span>
							</span>
							<span className="font-weight-bold wow-outer">
								<span
									className="wow"
									data-caption-animate="slideInDown"
									data-wow-delay="0"
								>
									<h4 style={{color:"black"}}> {props.text} </h4>
								</span>
							</span>
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCarousel;
