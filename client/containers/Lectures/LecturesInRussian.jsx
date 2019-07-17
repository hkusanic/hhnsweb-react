import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRussianDubbedLecture } from '../../actions/lectureActions';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

class RussiaDubbedLectures extends Component {
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
			<Card className="centerAlign recentActivityCard" title="Lecture Dubbed in Russian" >
				{this.props.lectureDetails
                    && this.props.lectureDetails.lectures
                    && this.props.lectureDetails.lectures.map(eachLecture => {
                    	return <div style={{ paddingBottom: '6%' }} >
                    		<Link key={eachLecture.id} to={`/lectureDetails/${eachLecture.uuid}`} >{`New**  ${eachLecture.en.topic}`}</Link>
                    		<p style={{ marginTop: '0px' }} key={eachLecture.id}>{`Posted On     ${(new Date(eachLecture.created_date_time)).toLocaleString('en-GB')}`}</p>
                    	</div>;
                    })}
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
