import React, { Component } from "react";
import {Link} from "react-router-dom";
export class MKV extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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
						<div class="row offset-top-2">
							<div class="col-sm-6 wow-outer OuterDiv">
								<article class="articleDiv wow slideInLeft">
									<div class="tour-default-caption">
										<Link to="/singlemkv">
											<p class="titleColor">20012</p>
										</Link>
									</div>
								</article>
							</div>
							<div class="col-sm-6 wow-outer OuterDiv">
								<article class="articleDiv wow slideInLeft">
									<div class="tour-default-caption">
										<Link to="/singlemkv">
											<p class="titleColor">20012</p>
										</Link>
									</div>
								</article>
							</div>
							<div class="col-sm-6 wow-outer OuterDiv">
								<article class="articleDiv wow slideInLeft">
									<div class="tour-default-caption">
										<Link to="/singlemkv">
											<p class="titleColor">20012</p>
										</Link>
									</div>
								</article>
							</div>
							<div class="col-sm-6 wow-outer OuterDiv">
								<article class="articleDiv wow slideInLeft">
									<div class="tour-default-caption">
										<Link to="/singlemkv">
											<p class="titleColor">20012</p>
										</Link>
									</div>
								</article>
							</div>
							<div class="col-sm-6 wow-outer OuterDiv">
								<article class="articleDiv wow slideInLeft">
									<div class="tour-default-caption">
										<Link to="/singlemkv">
											<p class="titleColor">20012</p>
										</Link>
									</div>
								</article>
							</div>
							<div class="col-sm-6 wow-outer OuterDiv">
								<article class="articleDiv wow slideInLeft">
									<div class="tour-default-caption">
										<Link to="/singlemkv">
											<p class="titleColor">20012</p>
										</Link>
									</div>
								</article>
							</div>
							<div class="col-sm-6 wow-outer OuterDiv">
								<article class="articleDiv wow slideInLeft">
									<div class="tour-default-caption">
										<Link to="/singlemkv">
											<p class="titleColor">20012</p>
										</Link>
									</div>
								</article>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default MKV;
