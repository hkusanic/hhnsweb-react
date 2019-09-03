import React, { Component } from "react";
import reactCookie from "react-cookies";
import { Translate } from "react-localize-redux";
import ContentDetails from "../../../containers/contents/ContentDetails";
import { Card, Tabs } from "antd";
import RussiaDubbedLectures from "../../../containers/Lectures/LecturesInRussian";
const { TabPane } = Tabs;
export class Announcement extends Component {
	announcement = () => {
		if (reactCookie.load("languageCode") === "en") {
			return (
				<Card className="centerAlign announcement_card">
					<div>
						<div className="announcement_div">
							<h4 className="announcement_heading">Announcement</h4>
						</div>
						<p className="announcement_hare">Hare Krishna!</p>

						<p style={{ textAlign: "justify", fontFamily: "Charter" }}>
							For devotees who are visiting Mayapura between March 13-March 22
							and wish to have darshan of Niranjana Swami during that time, we
							have created this website&nbsp;
							<a href="http://booking.niranjanswami.net" target="_blank">
								https://booking.niranjanaswami.net
							</a>
							&nbsp; to arrange individual meetings.
							<span className="fontWeight">
								&nbsp; This is the only way to request a meeting with Niranjana
								Swami during this visit.
							</span>
						</p>

						<p style={{ textAlign: "justify", fontFamily: "Charter" }}>
							This website, which is still under construction, will also be used
							in the future to schedule meetings when Maharaja is visiting North
							America. If you encounter any trouble, please contact Dina
							Gauranga dasa at the email listed at the bottom of this page. Over
							the next few weeks,&nbsp;
							<a href="http://booking.niranjanaswami.net" target="_blank">
								https://booking.niranjanaswami.net
							</a>
							&nbsp; and&nbsp;
							<a href="http://www.niranjanaswami.net" target="_blank">
								http://www.niranjanaswami.net
							</a>
							&nbsp; will be merged into a single website. Stay tuned for
							details!
						</p>

						<p className="fontWeight">Your servants</p>

						<p>Site administrators</p>
					</div>
				</Card>
			);
		} else {
			return (
				<Card className="centerAlign announcement_card">
					<div>
						<div className="announcement_div">
							<h4 className="announcement_heading">Объявление</h4>
						</div>

						<p className="fontWeight">Харе Кришна!</p>

						<p align="justify">
							Для преданных, которые посещают Маяпур в период с 13 по 22 марта и
							хотят получить даршан с Ниранджаной Свами в течение этого времени,
							мы создали следующий веб-сайт&nbsp;
							<a href="https://booking.niranjanaswami.net" target="_blank">
								https://booking.niranjanaswami.net
							</a>
							&nbsp; для организации индивидуальных встреч.
							<span className="fontWeight">
								Это единственный способ запросить встречу с Ниранджаной Свами во
								время этого визита.
							</span>
						</p>

						<p align="justify">
							Этот веб-сайт, который все еще находится в стадии разработки,
							также будет использоваться в будущем для планирования встреч,
							когда Махарадж посещает Северную Америку. Если у вас возникнут
							какие-либо проблемы, пожалуйста, свяжитесь с Dina Gauranga dasa по
							электронной почте, указанной в нижней части этой страницы. В
							течение следующих нескольких недель&nbsp;
							<a href="https://booking.niranjanaswami.net" target="_blank">
								https://booking.niranjanaswami.net
							</a>
							&nbsp; и&nbsp;
							<a href="https://www.niranjanaswami.net" target="_blank">
								https://www.niranjanaswami.net
							</a>
							&nbsp; будут объединены в один веб-сайт. Следите за подробностями!
						</p>

						<p className="fontWeight">Ваши слуги</p>

						<p>Администраторы сайта</p>
					</div>
				</Card>
			);
		}
	};

	render() {
		const maxWidth = window.screen.width;
		const mobileBrkPnt = 1023;
		return (
			<section>
				<div className="container">{this.announcement()}</div>
			</section>
		);
	}
}

export default Announcement;
