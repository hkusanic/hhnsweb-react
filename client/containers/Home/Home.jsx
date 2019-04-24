import React, { Component } from 'react';
import script from '../../assets/script.js';
import Navigation from '../../Components/molocules/navigation/Navigation';
import Carousel from '../../Components/molocules/carousels/Carousel';
import Footer from '../../Components/molocules/Footer/Footer';
import Blog from '../../containers/Blog/Blog';
import Calender from '../../containers/Calender/Calender';
import Lectures from '../../containers/Lectures/Lectures';
import Quotes from '../../containers/Quote/Quote';
import Booking from '../../containers/Booking/Booking';
import BlogDetails from '../../Components/molocules/SingleBlog/BlogDetails';
import BiographyDetails from '../../Components/molocules/Biography/BiographyDetails';
import LectureDetails from '../../Components/molocules/SingleLecture/LectureDetails';
import QuoteDetails from '../../Components/molocules/SingleQuote/QuoteDetails';
import AudioList from './../../Components/molocules/Audio/AudioList';
import VideoList from '../../Components/molocules/Video/VideoList';
import AudioDetails from '../../Components/molocules/Audio/AudioDetails';
import VideoDetails from '../../Components/molocules/Video/VideoDetails';
import ForgotPassword from '../../Components/organisms/Form/ForgotPassword';
import ShellCompoenent from '../../Components/organisms/ShellComponent/ShellComponent';
import ResetPassword from '../../Components/organisms/Form/ResetPasswordForm';
import UserProfile from '../../Components/molocules/Profile/UserProfile';
import Registration from '../../Components/molocules/Registration/Registration';
import Contact from '../../Components/organisms/Form/Contact';
import AppointmentListing from '../../Components/molocules/AppointmentListing/AppointmentListing';
import Photos from '../../Components/molocules/Photos/Photos';
import Gallery from '../../Components/molocules/Gallery/Gallery';
import SubGallery from '../../Components/molocules/Gallery/SubGallery';
import ScrollToTop from '../../Components/atoms/ScrollToTop/ScrollToTop';
import Summaries from '../../Components/molocules/Summaries/Summaries';
import Transcritpion from '../../Components/molocules/Transcriptions/Transcriptions';
import TranscriptionDetails from '../../Components/molocules/Transcriptions/TranscriptionsDetails';
import SummariesDetails from '../../Components/molocules/Summaries/SummariesDetails';
import Kirtan from '../../Components/molocules/Kirtan/Kirtan';
import KirtanDetails from '../../Components/molocules/Kirtan/KirtanDetails';
import MKV from '../../Components/molocules/MKV/mkv';

import { Route, Switch } from 'react-router-dom';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			isAdmin: false,
			userId: ''
		};
	}

	componentDidMount() {
		script();
	}

	render() {
		return (
			<div>
				<div className="page">
					<Navigation />
					<Switch>
						<ScrollToTop>
							<Route exact path="/" component={Carousel} />
							<Route path="/forgotPassword" component={ForgotPassword} />
							<Route path="/reset-password" component={ResetPassword} />
							<Route path="/biograhyDetails" component={BiographyDetails} />
							<Route path="/registration" component={Registration} />
							<Route path="/contact" component={Contact} />
							<Route path="/appointmentList" component={AppointmentListing} />
							<Route path="/photos" component={Photos} />
							<Route path="/gallery" component={Gallery} />
							<Route path="/subGallery" component={SubGallery} />
							<ShellCompoenent>
								<Route path="/blog" component={Blog} />
								<Route path="/booking" component={Booking} />
								<Route path="/calender" component={Calender} />
								<Route path="/lectures" component={Lectures} />
								<Route path="/quotes" component={Quotes} />
								<Route path="/blogDetails" component={BlogDetails} />
								<Route path="/quoteDetails" component={QuoteDetails} />
								<Route path="/lectureDetails" component={LectureDetails} />
								<Route
									path="/audio"
									component={AudioList}
									location={this.props.location}
									{...this.props}
								/>
								<Route path="/audioDetails" component={AudioDetails} />
								<Route path="/video" component={VideoList} />
								<Route path="/videoDetails" component={VideoDetails} />
								<Route path="/profile" component={UserProfile} />
								<Route path="/transcriptions" component={Transcritpion} />
								<Route path="/summaries" component={Summaries} />
								<Route path="/summariesDetails" component={SummariesDetails} />
								<Route
									path="/transcriptionDetails"
									component={TranscriptionDetails}
								/>
								<Route path="/kirtan" component={Kirtan} />
								<Route path="/kirtanDetails" component={KirtanDetails} />
								<Route path="/mkv" component={MKV} />
							</ShellCompoenent>
						</ScrollToTop>
					</Switch>
					<Footer />
				</div>
				<div className="preloader">
					<div className="preloader-logo">
						<img
							src="images/logo-default-256x50.png"
							alt=""
							width="256"
							height="50"
						/>
					</div>
					<div className="preloader-body">
						<div id="loadingProgressG">
							<div className="loadingProgressG" id="loadingProgressG_1" />
						</div>
					</div>
				</div>

				<div className="snackbars" id="form-output-global" />
			</div>
		);
	}
}

export default Home;
