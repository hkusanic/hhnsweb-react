import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SingleMKV extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<section className="bg-gray-100">
					<img src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v2_HkCb1eBDV.png" />
				</section>
				<div style={{ textAlign: "center" }}>
					<p className="bookingForm">MKV</p>
				</div>
				<section class="text-center">
					<div class="container">
						<div class="row offset-top-2 singleMkvTitle">
							<Link to="/mkvImage" className= "col-sm-6 wow-outer OuterDiv">
								<div>
									<article class="articleDiv wow slideInLeft">
										<div class="tour-default-caption">
											<p class="titleColor">Eng</p>
										</div>
									</article>
								</div>
							</Link>
							<Link to="/mkvImage" className= "col-sm-6 wow-outer OuterDiv">
								<div>
									<article class="articleDiv wow slideInLeft">
										<div class="tour-default-caption">
											<p class="titleColor">Rus</p>
										</div>
									</article>
								</div>
							</Link>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default SingleMKV;
