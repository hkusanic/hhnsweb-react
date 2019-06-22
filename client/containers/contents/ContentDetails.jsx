import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { getContents } from '../../actions/contentAction';
import { Link } from 'react-router-dom';
import RussiaDubbedLectures from '../Lectures/LecturesInRussian';

class ContentDetails extends Component {
	constructor (props) {
		super(props);
		this.state = {
			content: [],
		};
	}

	componentDidMount () {
		this.setState({
			content: this.props.contentDetails.content,
		});
		this.props.getContents({ page: 1 });
	}

	render () {
		return (
			<Card className="centerAlign recentActivityCard" title="Recent Activities" >
				{this.props.contentDetails
					&& this.props.contentDetails.content
					&& this.props.contentDetails.content.map(eachContent => {
						return <div style={{ paddingBottom: '3%' }}>
							<Link key={eachContent.d} to={`/${eachContent.content_type.toLowerCase()}Details/${eachContent.content_uuid}`} >
								{`New**     ${eachContent.content_type}`}
							</Link>
							<p style={{ marginTop: '0px' }} key={eachContent.content_id}>{`Posted On     ${(new Date(eachContent.created_date_time)).toLocaleString('en-GB')}`}</p>
						</div>;
					})}
			</Card>


		);
	}
}

const mapStateToProps = state => {
	return {
		contentDetails: state.contentReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getContents: page => {
			dispatch(getContents(page));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentDetails);
