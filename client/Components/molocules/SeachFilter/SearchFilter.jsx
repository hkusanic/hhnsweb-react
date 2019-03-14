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
            event: '',
            location: '',
            topic: ''
        };
	}

	componentDidMount() {
		this.props.getEvents();
		this.props.getLocations();
		this.props.getTopics();
    }
    
	renderOptions = (item, key) => {
		return (
			<Dropdown.Item bsPrefix="dropdown-item" key={key}>
				{item.title}
			</Dropdown.Item>
		);
	};

	render() {
		if (!this.props.searchFilterReducer.events.length > 0) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<div className="container filterDiv">
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success" id="dropdown-basic">
								Author
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.events.length > 0
									? this.props.searchFilterReducer.events.map((item, key) =>
											this.renderOptions(item, key)
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success" id="dropdown-basic">
								Events
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.locations.length > 0
									? this.props.searchFilterReducer.locations.map((item, key) =>
											this.renderOptions(item, key)
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle
								bsPrefix="dropdown-toggle"
								variant="success"
								id="dropdown-basic"
							>
								Location
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.topics.length > 0
									? this.props.searchFilterReducer.topics.map((item, key) =>
											this.renderOptions(item, key)
									  )
									: null}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success" id="dropdown-basic">
								Date
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item bsPrefix="dropdown-item" href="#/action-1">
									Action
								</Dropdown.Item>
								<Dropdown.Item bsPrefix="dropdown-item" href="#/action-2">
									Another action
								</Dropdown.Item>
								<Dropdown.Item bsPrefix="dropdown-item" href="#/action-3">
									Something else
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
				<div className="container filterDiv titleDiv">
					<div className="titleSearch">
						<input className="form-input" type="text" placeholder="Title" />
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
