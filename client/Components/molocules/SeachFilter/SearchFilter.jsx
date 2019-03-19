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
			year: "",
			title: "",
			author: "",
			translation: "",
			verse: "",
			chapter: "",
			songs: ""
		};
	}

	componentDidMount() {
		this.props.getEvents();
		this.props.getLocations();
		this.props.getTopics();
		const years = this.getYearsList(1980, 2080);
		this.setState({ years });
	}

	renderOptions = (item, key, type) => {
		return (
			<Dropdown.Item
				bsPrefix="dropdown-item"
				key={key}
				onSelect={() => this.handleChange(type, item.title)}
			>
				{item.title}
			</Dropdown.Item>
		);
	};

	renderYearsList = (item, key, type) => {
		return (
			<Dropdown.Item
				bsPrefix="dropdown-item"
				key={key}
				onSelect={() => this.handleChange(type, item)}
			>
				{item}
			</Dropdown.Item>
		);
	};

	handleChange = (type, value) => {
		value = value.toString().trim();
		this.setState({
			...this.state,
			[type]: value
		});
	};

	handleTextChange = (type, event) => {
		const value = event.target.value.toString().trim();
		this.setState(
			{
				...this.state,
				[type]: value
			}
		);
	};

	getYearsList = (startYear, endYear) => {
		startYear = typeof startYear == "undefined" ? 1980 : startYear;
		var years = [];
		for (var i = startYear; i <= endYear; i++) {
			years.push(i);
		}
		return years;
	};

	handleSearchData = () => {
		const body = {
			event: this.state.event,
			location: this.state.location,
			topic: this.state.topic,
			year: this.state.year,
			title: this.state.title,
			author: this.state.author,
			translation: this.state.translation,
			verse: this.state.verse,
			chapter: this.state.chapter,
			songs: this.state.songs
		};
		this.props.searchData(body);
	};

	render() {
		if (!this.props.searchFilterReducer.events.length > 0) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<div className="container filterDiv titleDiv">
					<div className="titleSearch">
						<input
							className="form-input"
							type="text"
							placeholder="Title"
							onChange={event => this.handleTextChange("title", event)}
						/>
					</div>
					<div className="titleSearch">
						<input
							className="form-input"
							type="text"
							placeholder="Songs"
							onChange={event => this.handleTextChange("songs", event)}
						/>
					</div>
					<div className="titleSearch">
						<input
							className="form-input"
							type="text"
							placeholder="Chapter"
							onChange={event => this.handleTextChange("chapter", event)}
						/>
					</div>
					<div className="titleSearch">
						<input
							className="form-input"
							type="text"
							placeholder="Verse"
							onChange={event => this.handleTextChange("verse", event)}
						/>
					</div>
				</div>
				<div className="container filterDiv titleDiv">
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.author ? this.state.author : "Author"}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								<Dropdown.Item bsPrefix="dropdown-item" onSelect={() => this.handleChange('author', 'niranjana_swami')}>
									Niranjana Swami
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.translation ? this.state.translation : "Translation"}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								<Dropdown.Item bsPrefix="dropdown-item" onSelect={() => this.handleChange('translation', 'all')}>All</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.location ? this.state.location : "Select Location"}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.locations.length > 0
									? this.props.searchFilterReducer.locations.map((item, key) =>
											this.renderOptions(item, key, "location")
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle bsPrefix="dropdown-toggle" variant="success">
								{this.state.topic ? this.state.topic : "Select Topic"}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.topics.length > 0
									? this.props.searchFilterReducer.topics.map((item, key) =>
											this.renderOptions(item, key, "topic")
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>

				<div className="container filterDiv titleDiv">
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.event ? this.state.event : "Select Event"}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.events.length > 0
									? this.props.searchFilterReducer.events.map((item, key) =>
											this.renderOptions(item, key, "event")
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.year ? this.state.year : "Select Year"}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								{this.state.years.length > 0
									? this.state.years.map((item, key) =>
											this.renderYearsList(item, key, "year")
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="form-wrap btnDiv">
						<button
							className="button button-block button-primary-lighten button-winona"
							onClick={this.handleSearchData}
						>
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
