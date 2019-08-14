import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const SingleBlogHome = props => {
	return (
		<div class="col-sm-12 col-lg-6 page1">
			{/* <article
			> */}
			{/* <Link
            wow-outer
					to={props.link}
					class="tour-default-figure"
					onClick={props.handleNavigationClick}
				> */}
			<Card
				style={{
					// width: "268px", height: "289px",
					borderRadius: "4px"
					// boxShadow: "0 22px 34px 0 rgba(0, 0, 0, 0.08)",
					// border: "0.1% solid gray",
					// backgroundColor: "#ffffff"
				}}
			>
				{/* <img style={{
							marginTop: "25px",
							marginLeft: "15px",
							// margin: "auo",
							// marginRight "99px",
							width: "74px",
							height: "74px",
							objectFit: "contain",
							// margin: "auto"
						}} src={props.image} alt="" /> */}

				<div
					style={{
						fontFamily: "Charter",
						fontSize: "24px",
						fontWeight: "bold"
					}}
				>
					Title goes here
				</div>
				<br />
				<div
					style={{
						fontFamily: "Charter-Roman",
						fontSize: "16px",
						lineHeight: "1.38"
					}}
				>
					{props.description}
				</div>
				<br />
				<hr />
				<br />
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						flexWrap: "wrap"
					}}
				>
					<div
						style={{
							// float: "left",
							fontFamily: "Charter",
							fontSize: "16px",
							fontWeight: "bold",
							lineHeight: "1.13",
							color: "#ff7c2b"
						}}
					>
						{" "}
						{props.author}
						<br />
						<div
							style={{
								// float: "left",
								fontFamily: "Charter-Roman",
								fontSize: "13px",
								fontWeight: "bold",
								lineHeight: "1.13",
								color: "black"
							}}
						>
							{" "}
							1 month ago{" "}
						</div>
					</div>
					<div>
						<button
							style={{
								// float: "right",
								// style={{ marginLeft: "36%" }}
								width: "95px",
								height: "40px",
								borderRadius: "22.5px",
								border: "1px solid #eae8ea",
								backgroundColor: "#eae8ea",
								fontFamily: "Charter",
								fontSize: "14px",
								fontWeight: "bold",
								color: "#242422"
								// opacity: "0.29"
							}}
						>
							{" "}
							Devotee{" "}
						</button>
						<button
							style={{
								// float: "right",
								width: "95px",
								height: "40px",
								borderRadius: "22.5px",
								border: "1px solid #eae8ea",
								backgroundColor: "#eae8ea",
								fontFamily: "Charter",
								fontSize: "14px",
								fontWeight: "bold",
								color: "#242422"
								// opacity: "0.29"
							}}
						>
							India
						</button>
						<button
							style={{
								// float: "right",
								width: "95px",
								height: "40px",
								borderRadius: "22.5px",
								border: "1px solid #eae8ea",
								backgroundColor: "#eae8ea",
								fontFamily: "Charter",
								fontSize: "14px",
								fontWeight: "bold",
								color: "#242422"
								// opacity: "0.29"
							}}
						>
							Quote
						</button>
					</div>
					{/* <br />
                    <div style={{
                        float: "left",
                        fontFamily: "Charter-Roman",
                        fontSize: "13px",
                        fontWeight: "bold",
                        lineHeight: "1.13",

                    }} > 1 month ago </div> */}
					{/* <div style={{ float: "right" }}> */}

					{/* </div> */}
				</div>
				{/* className="tour-default-title CommonFontFamily gridMenuText" */}
			</Card>
			{/* </Link> */}
			{/* </article> */}
		</div>
	);
};

export default SingleBlogHome;
