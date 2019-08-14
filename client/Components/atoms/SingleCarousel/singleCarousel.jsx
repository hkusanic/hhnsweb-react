import React from "react";

const SingleCarousel = props => {
	return (
		<div
			className="swiper-slide"
			data-slide-bg={props.image}
			style={{ width: "100%", height: "116.28614916286149vh" }}
		>
			<div className="slide-inner">
				<div className="insideCarousel">
					<img
						src="images/person3.png"
						style={{
							width: "90px",
							height: "90px",
							objectFit: "contain",
							float: "left"
						}}
					/>

					<div style={{ paddingTop: "9px" }}>
						<p
							style={{
								fontFamily: "Charter",
								fontSize: "20px",
								fontWeight: "900",
								color: "white",
								lineHeight: "0.1",
								marginTop: "7%"
							}}
						>
							ISKCON Founder - Acarya{" "}
						</p>

						<p
							style={{
								fontFamily: "Charter",
								fontSize: "15px",
								color: "white"
							}}
						>
							A.C Bhakthivedanta swami prabhupada
						</p>
					</div>
				</div>

				<div
					className="container "
					style={{ marginLeft: "70px", marginTop: "40px" }}
					data-caption-animate="slideInDown"
				>
					<div className="swiper-slide-caption">
						<div className="row">
							<img
								src="images/quote.jpg"
								style={{
									width: "90px",
									height: "90px",
									opacity: "0.1",
									marginLeft: "7%",
									marginTop: "5%"
								}}
							/>
							<div
								style={{
									width: "100px",
									marginTop: "10vh",
									fontSize: "10px",
									height: "23px",
									padding: "4px",
									borderRadius: "4px",
									color: "white",
									backgroundImage: "linear-gradient(to right, #f25858, #ff9f63)"
								}}
								data-caption-animate="slideInDown"
							>
								{props.heading}
								<br />{" "}
							</div>
							{/* </span> */}
						</div>
						<div>
							<span
								className="quote"
								data-caption-animate="slideInDown"
								data-wow-delay="0"
							>
								<h4
									style={{
										color: "black",
										marginLeft: " 2.562225475841874vw",
										fontSize: "2.9282576866764276vw",
										fontStyle: "italic",
										fontWeight: "bold",
										fontFamily: "Charter"
									}}
								>
									{" "}
									"{props.text}"{" "}
								</h4>
								<p style={{ marginLeft: "35px", fontSize: "20px" }}>
									-{props.author}
								</p>
							</span>
						</div>
						{/* </h1> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCarousel;
