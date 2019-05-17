import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Tooltip, Icon, Menu, Dropdown, Button } from 'antd';
import {
	getEvents,
	getLocations,
	getTopics,
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
			songs: '',
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
		this.setState(
			{
				...this.state,
				[type]: value,
			},
			() => {
				this.handleSearchData();
			}
		);
	};

	handleTextChange = (type, event) => {
		const value = event.target.value.toString().trim();
		this.setState({
			...this.state,
			[type]: value,
		});
	};

	reset = () => {
		this.setState({
			event: '',
			location: '',
			topic: '',
			year: '',
			title: '',
			author: '',
			translation: '',
			verse: '',
			chapter: '',
			songs: '',
		}, () => {
			this.handleSearchData();
		});
	};

	getYearsList = endYear => {
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
			songs: this.state.songs,
		};
		this.props.searchData(body);
	};

	render() {
		if (!this.props.searchFilterReducer.events.length > 0) {
			return <div>Loading...</div>;
		}

		const authorMenu = (
			<Menu>
				<Menu.Item
					onClick={() => this.handleChange('author', 'Niranjana Swami')}
				>
					Niranjana Swami
				</Menu.Item>
			</Menu>
		);

		const translationMenu = (
			<Menu>
				<Menu.Item onClick={() => this.handleChange('translation', 'Hungarian')}>
					Hungarian
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
								onClick={() => this.handleChange('location', item.title)}
							>
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
								onClick={() => this.handleChange('topic', item.title)}
							>
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
								onClick={() => this.handleChange('event', item.title)}
							>
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
								onClick={() => this.handleChange('year', item)}
							>
								{item}
							</Menu.Item>
					  ))
					: null}
			</Menu>
		);

		return (
			<div>
				<div className="container filterDiv titleDiv">
					{/* <div className="titleSearch">
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
							onChange={event => this.handleTextChange('title', event)}
						/>
					</div> */}
					<div className="titleSearch">
						<Input
							placeholder="Canto"
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
							onChange={event => this.handleTextChange('songs', event)}
						/>
					</div>
					<div className="titleSearch">
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
							onChange={event => this.handleTextChange('chapter', event)}
						/>
					</div>
					<div className="titleSearch">
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
							onChange={event => this.handleTextChange('verse', event)}
						/>
					</div>
					<div className="filter">
						<Dropdown overlay={yearMenu} overlayClassName="searchDropDownDiv">
							<Button className="w-100">
								{this.state.year ? this.state.year : 'Year'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
				</div>
				<div className="container filterDiv titleDiv">
					{/* <div className="filter">
						<Dropdown overlay={authorMenu} overlayClassName="searchDropDownDiv">
							<Button className="w-100">
								{this.state.author ? this.state.author : 'Author'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div> */}
					<div className="filter">
						<Dropdown overlay={translationMenu} overlayClassName="searchDropDownDiv">
							<Button className="w-100">
								{this.state.translation
									? this.state.translation
									: 'Translation'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown overlay={locationMenu} overlayClassName="searchDropDownDiv">
							<Button className="w-100">
								{this.state.location ? this.state.location : 'Location'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown overlay={topicMenu} overlayClassName="searchDropDownDiv">
							<Button className="w-100">
								{this.state.topic ? this.state.topic : 'Topic'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
					<div className="filter">
						<Dropdown overlay={eventMenu} overlayClassName="searchDropDownDiv">
							<Button className="w-100">
								{this.state.event ? this.state.event : 'Event'}{' '}
								<Icon type="down" />
							</Button>
						</Dropdown>
					</div>
				</div>

				<div className="container filterDiv titleDiv">
					
					
					<div className="filter">
						<Button
							className="w-100 searchButtonColor searchIconBorder"
							type="primary"
							icon="search"
							onClick={this.handleSearchData}
						>
							Search
						</Button>
					</div>
					<div className="filter">
						<Button
							className="w-100"
							type="danger"
							icon="reset"
							onClick={this.reset}
						>
							Reset
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		searchFilterReducer: state.searchFilterReducer,
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
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchFilter);
