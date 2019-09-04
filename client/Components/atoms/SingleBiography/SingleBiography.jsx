import React from "react";
import renderHTML from "react-render-html";
import { Link, withRouter } from "react-router-dom";
import reactCookie from "react-cookies";
import { Translate } from "react-localize-redux";

import { Card } from "antd";
import TextArea from "antd/lib/input/TextArea";
const { Meta } = Card;

function showing100Characters(sentence) {
	var result = sentence;
	var resultArray = result.split(" ");
	if (resultArray.length > 10) {
		resultArray = resultArray.slice(0, 25);
		result = resultArray.join(" ");
	}
	return result;
}

const SingleBiography = props => {
	return (
		<div
			className="col-sm-12 col-lg-6"
			style={{
				paddingRight: "0px",
				paddingLeft: "0px",
				top: "-35px",
				zIndex: "1"
			}}
		>
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
						className={
							props.title_en === "His Holiness Niranjana Swami"
								? "orange"
								: "white"
						}
						cover={
							<img
								alt="example"
								className="singleBiography_cover img-fluid"
								src={props.img}
							/>
						}
					>
						<div
							className={
								props.title_en === "His Holiness Niranjana Swami"
									? "singleBiography_card_orange"
									: "singleBiography_card_white"
							}
						>
							{reactCookie.load("languageCode") === "en"
								? props.title_en
								: props.title_ru
									? props.title_ru
									: props.title_en}
						</div>
						<br />
						<div
							className={
								props.title_en === "His Holiness Niranjana Swami"
									? "singleBiography_text_orange"
									: "singleBiography_text_white"
							}
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
							)}
							&nbsp;
						</div>
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
							<button className="singleBiography_button">
								<Translate>
									{({ translate }) => translate("FOOTER.readmore")}
								</Translate>
							</button>
						</Link>
					</Card>
				</Link>
			</article>
		</div>
	);
};

export default withRouter(SingleBiography);
