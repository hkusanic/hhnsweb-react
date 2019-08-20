import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const SingleGridMenu = props => {
	return (
		<div class="col-sm-6 col-lg-3 wow-outer page1">
			<article>
				<Link
					to={props.link}
					class="tour-default-figure"
					onClick={props.handleNavigationClick}
				>
					<Card
						style={{
							height: "289px",
							borderRadius: "4px",

							border: "0.1% solid gray",
							backgroundColor: "#ffffff"
						}}
					>
						<img
							style={{
								marginTop: "25px",
								marginLeft: "15px",

								width: "74px",
								height: "74px",
								objectFit: "contain"
							}}
							src={props.image}
							alt=""
						/>

						<div
							style={{
								height: "22px",
								marginTop: "35px",
								fontFamily: "Charter",
								fontSize: "18px",
								fontWeight: "bold",
								textAlign: "center",
								color: "#000000"
							}}
						>
							{props.menu}
						</div>
						<br />
						<div
							style={{
								height: "44px",
								fontFamily: "Charter-Roman",
								fontSize: "15px",
								lineHeight: "1.47",
								textAlign: "center",

								color: "#727272"
							}}
						>
							{props.description}
						</div>
					</Card>
				</Link>
			</article>
		</div>
	);
};

export default SingleGridMenu;
