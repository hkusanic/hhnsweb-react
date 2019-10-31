import React from 'react';
import { connect } from 'react-redux';
import { getRussianDubbedLecture } from '../../actions/lectureActions';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

class RussiaDubbedLectures extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			lecture: [],
		};
	}

	componentDidMount () {
		this.setState({
			lecture: this.props.lectureDetails.lecture,
		});
		this.props.getRussianDubbedLecture({
			page: 1,
			translation: 'Russian dubbed',
			limit: 5,
		});
	}

	render () {
		return (
			<Card
				className="centerAlign recentActivityCard"
				title="Lecture Dubbed in Russian"
			>
				<div style={{ height: '458px' }}>
					{this.props.lectureDetails
						&& this.props.lectureDetails.lectures
						&& this.props.lectureDetails.lectures.map(eachLecture => {
							return (
								<div className="lecture_div">
									<Link
										style={{ fontFamily: 'Charter' }}
										key={eachLecture.id}
										to={`/lectureDetails/${eachLecture.uuid}`}
									>{`${eachLecture.en.topic}`}</Link>
									<p
										className="content_p"
										key={eachLecture.id}
									>{`Posted On     ${new Date(
											eachLecture.created_date_time
										).toLocaleString('en-GB')}`}</p>
								</div>
							);
						})}
				</div>
			</Card>
		);
	}
}

const mapStateToProps = state => {
	return {
		lectureDetails: state.lectureReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getRussianDubbedLecture: page => {
			dispatch(getRussianDubbedLecture(page));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RussiaDubbedLectures);
