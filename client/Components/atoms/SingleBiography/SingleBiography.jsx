import React from "react";
import renderHTML from "react-render-html";
import { Link, withRouter } from "react-router-dom";
import reactCookie from "react-cookies";
import { Translate } from "react-localize-redux";
import { Card } from "antd";

function showing100Characters(sentence) {
	// var result = sentence;
	// var resultArray = result.split(" ");
	// if (resultArray.length > 10) {
	// 	resultArray = resultArray.slice(0, 25);
	// 	result = resultArray.join(" ") + "...";
	// }
	// return result;
	var result = sentence;
	function GetNthOccurance(string, seek, occurance) {
		var index = 0,
			i = 1;

		while (index !== -1) {
			index = string.indexOf(seek, index + 1);
			if (occurance === i) {
				break;
			}
			i++;
		}
		if (index !== -1) {
			return index;
		}
	}
	let index1 = GetNthOccurance(sentence, ">", 2);
	if (result.length > 300) {
		result = result.substring(index1 + 1, index1 + 153) + "...";
	}
	return result;
}

const SingleBiography = props => {
	return (
		<div className="col-sm-12 col-lg-6 singleBioMain page1">
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
							<button
								className={
									props.title_en === "His Holiness Niranjana Swami"
										? "singleBiography_button_orange"
										: "singleBiography_button_white"
								}
							>
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
