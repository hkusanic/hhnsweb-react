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
				<Card
					className="centerAlign"
					style={{
						border: "1px solid orange",
						width: "100%",
						// height: "500px",
						boxShadow: "0 62px 94px 0 rgba(79, 42, 97, 0.14)"
					}}
				>
					<div>
						<div
							style={{
								marginTop: "25px",
								width: "194px",
								height: "45px",
								borderRadius: "3px",
								backgroundColor: "#FAE5D3"
							}}
						>
							<h4
								style={{
									width: "169px",
									// marginTop: "40px",
									marginLeft: "20px",
									height: "30px",
									fontFamily: "Charter",
									fontSize: "24px",
									fontWeight: "bold",
									// textAlign: "center",
									color: "#ff7c2b"
								}}
							>
								Announcement
							</h4>
						</div>
						<p
							style={{
								fontFamily: "Charter-Roman",
								fontSize: "18px",
								color: "#6c6c6c",
								lineHeight: "1.78"
							}}
						>
							Hare Krishna!
						</p>

						<p style={{ textAlign: "justify", fontFamily: "Charter" }}>
							For devotees who are visiting Mayapura between March 13-March 22
							and wish to have darshan of Niranjana Swami during that time, we
							have created this website{" "}
							<a href="http://booking.niranjanswami.net" target="_blank">
								https://booking.niranjanaswami.net
							</a>{" "}
							to arrange individual meetings.
							<span className="fontWeight">
								{" "}
								This is the only way to request a meeting with Niranjana Swami
								during this visit.
							</span>
						</p>

						<p style={{ textAlign: "justify", fontFamily: "Charter" }}>
							This website, which is still under construction, will also be used
							in the future to schedule meetings when Maharaja is visiting North
							America. If you encounter any trouble, please contact Dina
							Gauranga dasa at the email listed at the bottom of this page. Over
							the next few weeks,{" "}
							<a href="http://booking.niranjanaswami.net" target="_blank">
								https://booking.niranjanaswami.net
							</a>{" "}
							and{" "}
							<a href="http://www.niranjanaswami.net" target="_blank">
								http://www.niranjanaswami.net
							</a>{" "}
							will be merged into a single website. Stay tuned for details!
						</p>

						<p className="fontWeight">Your servants</p>

						<p>Site administrators</p>
					</div>
				</Card>
			);
		} else {
			return (
				<div className="padTop">
					<p className="fontWeight">Харе Кришна!</p>

					<p align="justify">
						Для преданных, которые посещают Маяпур в период с 13 по 22 марта и
						хотят получить даршан с Ниранджаной Свами в течение этого времени,
						мы создали следующий веб-сайт{" "}
						<a href="https://booking.niranjanaswami.net" target="_blank">
							https://booking.niranjanaswami.net
						</a>{" "}
						для организации индивидуальных встреч.
						<span className="fontWeight">
							Это единственный способ запросить встречу с Ниранджаной Свами во
							время этого визита.
						</span>
					</p>

					<p align="justify">
						Этот веб-сайт, который все еще находится в стадии разработки, также
						будет использоваться в будущем для планирования встреч, когда
						Махарадж посещает Северную Америку. Если у вас возникнут какие-либо
						проблемы, пожалуйста, свяжитесь с Dina Gauranga dasa по электронной
						почте, указанной в нижней части этой страницы. В течение следующих
						нескольких недель{" "}
						<a href="https://booking.niranjanaswami.net" target="_blank">
							https://booking.niranjanaswami.net
						</a>{" "}
						и{" "}
						<a href="https://www.niranjanaswami.net" target="_blank">
							https://www.niranjanaswami.net
						</a>{" "}
						будут объединены в один веб-сайт. Следите за подробностями!
					</p>

					<p className="fontWeight">Ваши слуги</p>

					<p>Администраторы сайта</p>
				</div>
			);
		}
	};

	render() {
		const maxWidth = window.screen.width;
		const mobileBrkPnt = 1023;
		return (
			<section>
				<div className="container">
					{this.announcement()}
					{/* <Tabs defaultActiveKey="1" tabPosition={maxWidth > mobileBrkPnt ? "left" : "top"}>
                        <TabPane tab="Announcement" key={1}>
                            {this.announcement()}
                        </TabPane>
                        {/* <TabPane tab="Recent Activities" key={2}>
                            <ContentDetails />
                        </TabPane>
                        <TabPane tab="Russian Dubbed Lectures" key={3}>
                            <RussiaDubbedLectures />
                        </TabPane>
                    </Tabs>  */}
				</div>
			</section>
		);
	}

	// render() {
	//     return (
	//         <section class="section-lg text-center bg-gray-100">
	//             <div className="container">
	//                 <div className="row row-50">
	//                     <div className="col-12 col-md-4">
	//                         {this.announcement()}
	//                     </div>
	//                     <div className="col-12 col-md-4">
	//                         <ContentDetails />
	//                     </div>
	//                     <div className="col-12 col-md-4">
	//                         <RussiaDubbedLectures />
	//                     </div>
	//                 </div>
	//             </div>
	//         </section>
	//     );
	// }
}

export default Announcement;

{
	/* <h3 class="wow-outer"><span class="wow slideInUp bookingForm">
                            <Translate>
                                {({ translate }) => translate('HOME.announcement')}
                            </Translate></span></h3>
                        <div className="announcementDiv">{this.announcement()}</div> */
}
