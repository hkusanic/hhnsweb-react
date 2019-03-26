import React, { Component } from "react";

export class MKVImage extends Component {
	constructor(props) {
		super(props);
    }
    
	render() {
		return (
			<div>
				<section class="text-center">
					<div>
						<div class="col-sm-6 col-lg-3 wow-outer imgMkv">
							<article class="tour-default wow slideInLeft">
								<img
									src="https://nrs-site.s3.amazonaws.com/mkv/2002/Eng/2002_01_Guru Katha_Cover.jpg"
									alt=""
									width="270"
									height="200"
								/>
								<div class="tour-default-caption">
									<h5 class="titleColor">20012</h5>
								</div>
							</article>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default MKVImage;
