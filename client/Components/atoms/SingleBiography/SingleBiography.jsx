import React from "react";
import renderHTML from "react-render-html";
import { Link, withRouter } from "react-router-dom";
import reactCookie from "react-cookies";

import { Card } from "antd";
import TextArea from "antd/lib/input/TextArea";
const { Meta } = Card;

function showing100Characters(sentence) {
	var result = sentence;
	var resultArray = result.split(" ");
	if (resultArray.length > 10) {
		resultArray = resultArray.slice(0, 30);
		result = resultArray.join(" ");
	}
	return result;
}

const SingleBiography = props => {
	return (
		//
		<div
			class="col-sm-12 col-lg-6"
			style={{
				paddingRight: "0px",
				paddingLeft: "0px",
				top: "-35px",
				zIndex: "1"
			}}
		>
			{/* <article className="post-modern wow fadeInUpSmall"> */}
			<article>
				<Link
					to={{
						pathname: "/biograhyDetails",
						state: {
							title_en: props.title_en,
							title_ru: props.title_ru,
							content_en: props.content_en,
							content_ru: props.content_ru,
							img: props.img
						}
					}}
				>
					<Card
						hoverable
						className="biographyCard"
						cover={
							<img
								alt="example"
								style={{
									width: "123px",
									height: "123px",
									objectFit: "contain",
									marginTop: "34px",
									marginLeft: "5%",
									marginRight: "353px"
								}}
								className="img-fluid"
								src={props.img}
							/>
						}
					>
						<div
							style={{
								marginLeft: "5%",
								fontFamily: "Charter",
								fontSize: "18px",
								fontWeight: "bold",
								fontStyle: "normal",
								fontStretch: "normal",
								lineHeight: "normal",
								letterSpacing: "normal",
								color: "#000000"
							}}
						>
							{reactCookie.load("languageCode") === "en"
								? props.title_en
								: props.title_ru
								? props.title_ru
								: props.title_en}
						</div>
						{/* <div style={{
							width: '415px',
							height: '125px',
							fontFamily: 'Charter-Roman',
							fontSize: '16px',
							fontWeight: 'normal',
							fontStyle: 'normal',
							fontStretch: 'normal',
							lineHeight: '1.56',
							letterSpacing: 'normal',
							color: '#787878',
							textAlign:"justify"
						}}>
							{renderHTML(
								showing100Characters(
									reactCookie.load('languageCode') === 'en'
										? props.content_en
										: props.content_ru
											? props.content_ru
											: props.content_en
								)
							)}
						</div> */}
						<br />
						<div
							style={{
								marginLeft: "5%",
								marginRight: "5%",
								fontFamily: "Charter-Roman",
								fontSize: "16px",
								color: "#787878",
								textAlign: "justify"
							}}
						>
							{renderHTML(
								"<div > " +
									showing100Characters(
										reactCookie.load("languageCode") === "en"
											? props.content_en
											: props.content_ru
											? props.content_ru
											: props.content_en
									) +
									"</div>"
							)}{" "}
						</div>
						<Link
							// className="button-winona post-modern-title"
							to={{
								pathname: "/biograhyDetails",
								state: {
									title_en: props.title_en,
									title_ru: props.title_ru,
									content_en: props.content_en,
									content_ru: props.content_ru,
									img: props.img
								}
							}}
						>
							<button
								style={{
									width: "123px",
									height: "47px",
									borderRadius: "4px",
									border: "solid 1px #ff7c2b",
									backgroundColor: "white",
									marginTop: "5%",
									marginLeft: "5%",
									marginRight: "353px",
									position: "absolute"
								}}
							>
								Read More...
							</button>
						</Link>
					</Card>
				</Link>
			</article>
		</div>
	);
};

export default withRouter(SingleBiography);
