import React, { Component } from 'react';
import * as DATA from '../../constants/credentials';
import { Link } from 'react-router-dom';
import Auth from '../../utils/Auth';
import { Translate } from 'react-localize-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import QuoteOfDay from '../../Components/molocules/SingleQuote/QuotesOfDay';

export class Calender extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isUserLogin: false,
		};
	}

	componentDidMount () {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({ isUserLogin });
	}

	render () {
		let srcGoogle
			= 'https://calendar.google.com/calendar/embed?src=cvl1euujuo4p9dgqnhnfqqt2vg%40group.calendar.google.com&ctz=America%2FNew_York';
		let srcGoogleAvailability
			= 'https://calendar.google.com/calendar/embed?src=s6huen1msdhpf4309kb9fatog4%40group.calendar.google.com&ctz=Asia%2FKolkata';
		return (
			<div>
				<section
					className="bg-gray-100"
					style={{
						backgroundImage:
							'url(https://ik.imagekit.io/gcwjdmqwwznjl/Calendar_Page_copy_B1kq-PHUN.png)',
					}}
				>
					<div class="breadcrumbs-custom-inner headingImage">
						<div class="container breadcrumbs-custom-container">
							<ul class="breadcrumbs-custom-path">
								<li>
									<Link to="" onClick={() => this.props.history.push('/')}>
										<Breadcrumb.Item>Home</Breadcrumb.Item>
									</Link>
								</li>
								<li>
									<a className="textColor">Calendar</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				{!this.state.isUserLogin ? (
					<React.Fragment>
						<div className="align">
							<div style={{ textAlign: 'center' }}>
								<p className="bookingForm">
									<Translate>
										{({ translate }) => translate('HOME.calendar')}
									</Translate>
								</p>
							</div>
							<iframe
								src={srcGoogle}
								style={{ frameBorder: '0', Scrolling: 'no' }}
								className="calenderStyle"
							></iframe>
						</div>
						<div className="align">
							<div style={{ textAlign: 'center' }}>
								<p className="bookingForm">
									<Translate>
										{({ translate }) => translate('HOME.availability')}
									</Translate>
								</p>
							</div>
							<iframe
								src={srcGoogleAvailability}
								style={{ frameBorder: '0', Scrolling: 'no' }}
								className="calenderStyle"
							></iframe>
						</div>
					</React.Fragment>
				) : (
					<QuoteOfDay />
				)}
			</div>
		);
	}
}

export default Calender;
