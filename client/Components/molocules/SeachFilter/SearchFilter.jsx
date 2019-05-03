import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Dropdown from 'react-bootstrap/Dropdown';
import { Input, Tooltip, Icon, Menu, Dropdown, Button } from 'antd';
import {
	getEvents,
	getLocations,
	getTopics
} from '../../../actions/searchFilter';

export class SearchFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: '',
			location: '',
			topic: '',
			years: [],
			year: '',
			title: '',
			author: '',
			translation: '',
			verse: '',
			chapter: '',
			songs: ''
		};
	}

	componentDidMount() {
		this.props.getEvents();
		this.props.getLocations();
		this.props.getTopics();
		const years = this.getYearsList(1980);
		this.setState({ years });
	}

	renderOptions = (item, key, type) => {
		return (
			<Dropdown.Item
				bsPrefix="dropdown-item"
				key={key}
				onSelect={() => this.handleChange(type, item.title)}>
				{item.title}
			</Dropdown.Item>
		);
	};

	renderYearsList = (item, key, type) => {
		return (
			<Dropdown.Item
				bsPrefix="dropdown-item"
				key={key}
				onSelect={() => this.handleChange(type, item)}>
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
		this.setState({
			...this.state,
			[type]: value
		});
	};

	reset = () => {
		this.setState({
			event: '',
			location: '',
			topic: '',
			//years: [],
			year: '',
			title: '',
			author: '',
			translation: '',
			verse: '',
			chapter: '',
			songs: ''
		});
	};

	getYearsList = (endYear) => {
		let date = new Date();
		let current_year = date.getFullYear();
		var years = [];
		for (let i = current_year; i >= endYear; i--) {
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

		console.log('state form search', this.state);

		const authorMenu = (
			<Menu>
				<Menu.Item
					onClick={() => this.handleChange('author', 'niranjana_swami')}>
					Niranjana Swami
				</Menu.Item>
			</Menu>
		);

		const translationMenu = (
			<Menu>
				<Menu.Item onClick={() => this.handleChange('translation', 'all')}>
					All
				</Menu.Item>
			</Menu>
		);

		const locationMenu = (
			<Menu>
				{this.props.searchFilterReducer.locations.length > 0 &&
					this.props.searchFilterReducer.locations.map((item, index) => {
						return (
							<Menu.Item
								key={index}
								onClick={() => this.handleChange(type, item.title)}>
								{item.title}
							</Menu.Item>
						);
					})}
			</Menu>
		);

		const topicMenu = (
			<Menu>
				{this.props.searchFilterReducer.topics.length > 0
					? this.props.searchFilterReducer.topics.map((item, index) => (
							<Menu.Item
								key={index}
								onClick={() => this.handleChange('topic', item.title)}>
								{item.title}
							</Menu.Item>
					  ))
					: null}
			</Menu>
		);

		const eventMenu = (
			<Menu>
				{this.props.searchFilterReducer.events.length > 0
					? this.props.searchFilterReducer.events.map((item, index) => (
							<Menu.Item
								key={index}
								onClick={() => this.handleChange('event', item.title)}>
								{item.title}
							</Menu.Item>
					  ))
					: null}
			</Menu>
		);

		const yearMenu = (
			<Menu>
				{this.state.years.length > 0
					? this.state.years.map((item, index) => (
							<Menu.Item
								key={index}
								onClick={() => this.handleChange('year', item)}>
								{item}
							</Menu.Item>
					  ))
					: null}
			</Menu>
		);

		return (
			<div>
				<div className="container filterDiv titleDiv">
					<div className="titleSearch">
						{/* <input
							className="form-input"
							type="text"
							placeholder="Title"
							onChange={(event) => this.handleTextChange('title', event)}
            /> */}

						<Input
							placeholder="Title"
							allowClear={this.state.title !== ''}
							suffix={
								this.state.title === '' && (
									<Tooltip title="Please enter the title you want to search">
										<Icon
											type="info-circle"
											style={{ color: 'rgba(0,0,0,.45)' }}
										/>
									</Tooltip>
								)
							}
							onChange={(event) => this.handleTextChange('title', event)}
						/>
					</div>
					<div className="titleSearch">
						{/* <input
							className="form-input"
							type="text"
							placeholder="Songs"
							onChange={(event) => this.handleTextChange('songs', event)}
						/> */}

						<Input
							placeholder="Songs"
							allowClear={this.state.songs !== ''}
							suffix={
								this.state.songs === '' && (
									<Tooltip title="Please enter the song you want to search">
										<Icon
											type="info-circle"
											style={{ color: 'rgba(0,0,0,.45)' }}
										/>
									</Tooltip>
								)
							}
							onChange={(event) => this.handleTextChange('songs', event)}
						/>
					</div>
					<div className="titleSearch">
						{/* <input
							className="form-input"
							type="text"
							placeholder="Chapter"
							onChange={(event) => this.handleTextChange('chapter', event)}
            /> */}

						<Input
							placeholder="Chapter"
							allowClear={this.state.chapter !== ''}
							suffix={
								this.state.chapter === '' && (
									<Tooltip title="Please enter the chapter you want to search">
										<Icon
											type="info-circle"
											style={{ color: 'rgba(0,0,0,.45)' }}
										/>
									</Tooltip>
								)
							}
							onChange={(event) => this.handleTextChange('chapter', event)}
						/>
					</div>
					<div className="titleSearch">
						{/* <input
							className="form-input"
							type="text"
							placeholder="Verse"
							onChange={(event) => this.handleTextChange('verse', event)}
            /> */}

						<Input
							placeholder="Verse"
							allowClear={this.state.verse !== ''}
							suffix={
								this.state.verse === '' && (
									<Tooltip title="Please enter the verse you want to search">
										<Icon
											type="info-circle"
											style={{ color: 'rgba(0,0,0,.45)' }}
										/>
									</Tooltip>
								)
							}
							onChange={(event) => this.handleTextChange('verse', event)}
						/>
					</div>
				</div>
				<div className="container filterDiv titleDiv">
					<div className="filter">
						{/* <Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.author ? this.state.author : 'Author'}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								<Dropdown.Item
									bsPrefix="dropdown-item"
									onSelect={() =>
										this.handleChange('author', 'niranjana_swami')
									}>
									Niranjana Swami
								</Dropdown.Item>
							</Dropdown.Menu>
            </Dropdown> */}

						<Dropdown overlay={authorMenu}>
							<Button className="w-100">
								{this.state.author ? this.state.author : 'Author'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
					<div className="filter">
						{/* <Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.translation
									? this.state.translation
									: 'Translation'}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								<Dropdown.Item
									bsPrefix="dropdown-item"
									onSelect={() => this.handleChange('translation', 'all')}>
									All
								</Dropdown.Item>
							</Dropdown.Menu>
            </Dropdown> */}

						<Dropdown overlay={translationMenu}>
							<Button className="w-100">
								{this.state.translation
									? this.state.translation
									: 'Translation'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
					<div className="filter">
						{/* <Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.location ? this.state.location : 'Location'}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.locations.length > 0
									? this.props.searchFilterReducer.locations.map((item, key) =>
											this.renderOptions(item, key, 'location')
									  )
									: null}
							</Dropdown.Menu>
            </Dropdown> */}

						<Dropdown overlay={locationMenu}>
							<Button className="w-100">
								{this.state.location ? this.state.location : 'Location'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
					<div className="filter">
						{/* <Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle bsPrefix="dropdown-toggle" variant="success">
								{this.state.topic ? this.state.topic : 'Topic'}
							</Dropdown.Toggle>

							<Dropdown.Menu className="dropdown-menu">
								{this.props.searchFilterReducer.topics.length > 0
									? this.props.searchFilterReducer.topics.map((item, key) =>
											this.renderOptions(item, key, 'topic')
									  )
									: null}
							</Dropdown.Menu>
            </Dropdown> */}

						<Dropdown overlay={topicMenu}>
							<Button className="w-100">
								{this.state.topic ? this.state.topic : 'Topic'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
				</div>

				<div className="container filterDiv titleDiv">
					<div className="filter">
						{/* <Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.event ? this.state.event : 'Event'}
							</Dropdown.Toggle>

							<Dropdown.Menu
								style={{ maxHeight: '10em !important' }}
								className="dropdown-menu">
								{this.props.searchFilterReducer.events.length > 0
									? this.props.searchFilterReducer.events.map((item, key) =>
											this.renderOptions(item, key, 'event')
									  )
									: null}
							</Dropdown.Menu>
            </Dropdown> */}

						<Dropdown overlay={eventMenu}>
							<Button className="w-100">
								{this.state.event ? this.state.event : 'Event'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
					<div className="filter">
						{/* <Dropdown bsPrefix="dropdown">
							<Dropdown.Toggle variant="success">
								{this.state.year ? this.state.year : 'Year'}
							</Dropdown.Toggle>

							<Dropdown.Menu style={{ maxHeight: '10em !important' }}>
								{this.state.years.length > 0
									? this.state.years.map((item, key) =>
											this.renderYearsList(item, key, 'year')
									  )
									: null}
							</Dropdown.Menu>
            </Dropdown> */}

						<Dropdown overlay={yearMenu}>
							<Button className="w-100">
								{this.state.year ? this.state.year : 'Year'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
          {/* <div className="form-wrap btnDiv"> */}
					<div className="filter">
						{/* <button
							style={{ padding: '0px', height: '40px' }}
							className="button button-block button-primary-lighten button-winona"
							onClick={this.handleSearchData}>
							Search
            </button> */}

						<Button
							className="w-100"
							type="primary"
							icon="search"
							onClick={this.handleSearchData}>
							Search
						</Button>
					</div>
					{/* <div className="form-wrap btnDiv"> */}
					<div className="filter">
						{/* <button
							style={{ padding: '0px', height: '40px', marginLeft: '32px' }}
							className="button button-block button-primary-lighten button-winona"
							onClick={this.reset}>
							Reset
            </button> */}
            
            <Button
							className="w-100"
							type="danger"
							icon="reset"
							onClick={this.reset}>
							Reset
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchFilterReducer: state.searchFilterReducer
	};
};

const mapDispatchToProps = (dispatch) => {
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
