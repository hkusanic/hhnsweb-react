import React from 'react';
import { Link } from 'react-router-dom';

const SingleGridMenu = props => {
	return (
		<div class="col-sm-6 col-lg-3 wow-outer">
			<article class="tour-default wow slideInLeft" data-wow-delay=".1s">
				<Link
					to={props.link}
					class="tour-default-figure"
					onClick={props.handleNavigationClick}
				>
					<img src={props.image} alt="" width="270" height="200" />
				</Link>
				<div class="tour-default-caption">
					<h5 class="tour-default-title">
						<Link to={props.link} onClick={props.handleNavigationClick}>
							{props.menu}
						</Link>
					</h5>
				</div>
			</article>
		</div>
	);
};

export default SingleGridMenu;
