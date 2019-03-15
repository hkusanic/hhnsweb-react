import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import {
	getEvents,
	getLocations,
	getTopics
} from "../../../actions/searchFilter";

export class SearchFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: "",
			location: "",
			topic: "",
			years: [],
			year: ""
		};
	}

	componentDidMount() {
		this.props.getEvents();
		this.props.getLocations();
		this.props.getTopics();
		const years = this.getYearsList(1980, 2080);
		this.setState({ years });
	}

	renderOptions = (item, key) => {
		return (
			<Dropdown.Item bsPrefix="dropdown-item" key={key}>
				{item.title}
			</Dropdown.Item>
		);
	};

	renderYearsList = (item, key, type) => {
		return (
			<Dropdown.Item bsPrefix="dropdown-item" key={key} onSelect={()=>this.handleChange(type, item)}>
				{item}
			</Dropdown.Item>
		);
	};

	handleChange = (type, value) => {
		alert("clicked");
		console.log("type, value=====>>>", type, value);
		this.setState({
			...this.state,
			[type]: value
		}, () => {
			console.log("this.state======>>>", this.state);
		});
	};

	getYearsList = (startYear, endYear) => {
		startYear = typeof startYear == "undefined" ? 1980 : startYear;
		var years = [];
		for (var i = startYear; i <= endYear; i++) {
			years.push(i);
		}
		return years;
	};

	render() {
		if (!this.props.searchFilterReducer.events.length > 0) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<div className="container filterDiv titleDiv">
					<div className="titleSearch">
						<input className="form-input" type="text" placeholder="Title" />
					</div>
					<div className="titleSearch">
						<input className="form-input" type="text" placeholder="Songs" />
					</div>
					<div className="titleSearch">
						<input className="form-input" type="text" placeholder="Chapter" />
					</div>
					<div className="titleSearch">
						<input className="form-input" type="text" placeholder="Verse" />
					</div>
				</div>
				<div className="container filterDiv titleDiv">
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">Author</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								<Dropdown.Item bsPrefix="dropdown-item">
									Niranjana Swami
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">Translation</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								<Dropdown.Item bsPrefix="dropdown-item">All</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">Location</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.locations.length > 0
									? this.props.searchFilterReducer.locations.map((item, key) =>
											this.renderOptions(item, key, 'location')
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle bsPrefix="dropdown-toggle" variant="success">
								Topic
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.topics.length > 0
									? this.props.searchFilterReducer.topics.map((item, key) =>
											this.renderOptions(item, key, 'topic')
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>

				<div className="container filterDiv titleDiv">
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">Event</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.events.length > 0
									? this.props.searchFilterReducer.events.map((item, key) =>
											this.renderOptions(item, key, 'event')
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">Date</Dropdown.Toggle>

							<Dropdown.Menu>
								{this.state.years.length > 0
									? this.state.years.map((item, key) =>
											this.renderYearsList(item, key, 'year')
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="form-wrap btnDiv">
						<button className="button button-block button-primary-lighten button-winona">
							Search
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		searchFilterReducer: state.searchFilterReducer
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getEvents: () => {
			dispatch(getEvents());
		},
		getLocations: () => {
			dispatch(getLocations());
		},
		getTopics: () => {
			dispatch(getTopics());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchFilter);
