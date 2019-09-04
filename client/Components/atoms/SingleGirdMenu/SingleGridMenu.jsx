import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const SingleGridMenu = props => {
	return (
		<div class="col-sm-6 col-lg-3 wow-outer page1">
			<article>
				<Card className="singleGrid_card">
					<Link
						to={props.link}
						class="tour-default-figure"
						onClick={props.handleNavigationClick}
					>
						<img className="singleGrid_img" src={props.image} alt="" />

						<div className="singleGrid_menu">{props.menu}</div>
						{/* <br /> */}
						{/* <div className="singleGrid_description">{props.description}</div> */}
					</Link>
				</Card>
			</article>
		</div>
	);
};

export default SingleGridMenu;
