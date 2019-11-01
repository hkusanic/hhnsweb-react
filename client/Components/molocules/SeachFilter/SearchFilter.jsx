import React, { Component } from 'react';
import scrollToElement from 'scroll-to-element';
import { connect } from 'react-redux';
import reactCookie from 'react-cookies';
import { Input, Tooltip, Icon, Menu, Dropdown, Button } from 'antd';
import { getEvents, getLocations, getTopics, getTranslations } from '../../../actions/searchFilter';

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
		const { getEvents, getLocations, getTopics, getTranslations } = this.props;
		getEvents();
		getLocations();
		getTopics();
		getTranslations();
		const years = this.getYearsList(1980);
		this.setState({ years });
		scrollToElement();
	}

	renderOptions = (item, key, type) => {
		return (
			<Dropdown.Item bsPrefix="dropdown-item" key={key} onSelect={() => this.handleChange(type, item.title)}>
				{item.title}
			</Dropdown.Item>
		);
	};

	renderYearsList = (item, key, type) => {
		return (
			<Dropdown.Item bsPrefix="dropdown-item" key={key} onSelect={() => this.handleChange(type, item)}>
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
		this.canto;
		this.setState(
			{
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
			},
			() => {
				this.handleSearchData();
			}
		);
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
		const { author, event, location, topic, year, title, translation, verse, chapter, songs } = this.state;
		const body = {
			event,
			location,
			topic,
			year,
			title,
			author,
			translation,
			verse,
			chapter,
			songs,
		};
		this.props.searchData(body);
	};

	scrollToElement = () => {
		scrollToElement('#id', {
			offset: -150,
			ease: 'linear',
			duration: 1000,
		});
	};

	render() {
		if (!this.props.searchFilterReducer.events.length > 0) {
			return <div>Loading...</div>;
		}

		const authorMenu = (
			<Menu>
				<Menu.Item onClick={() => this.handleChange('author', 'Niranjana Swami')}>Niranjana Swami</Menu.Item>
			</Menu>
		);

		const translationMenu = (
			<Menu>
				{this.props.searchFilterReducer.translations.length > 0 &&
					this.props.searchFilterReducer.translations.map((item, index) => {
						return (
							<Menu.Item
								key={index}
								onClick={() =>
									this.handleChange(
										'translation',
										reactCookie.load('languageCode') === 'en'
											? item.title_en
											: item.title_ru
											? item.title_ru
											: item.title_en
									)
								}
							>
								{reactCookie.load('languageCode') === 'en'
									? item.title_en
									: item.title_ru
									? item.title_ru
									: item.title_en}
							</Menu.Item>
						);
					})}
			</Menu>
		);

		const locationMenu = (
			<Menu>
				{this.props.searchFilterReducer.locations.length > 0 &&
					this.props.searchFilterReducer.locations.map((item, index) => {
						return (
							<Menu.Item
								key={index}
								onClick={() =>
									this.handleChange(
										'location',
										reactCookie.load('languageCode') === 'en'
											? item.title_en
											: item.title_ru
											? item.title_ru
											: item.title_en
									)
								}
							>
								{reactCookie.load('languageCode') === 'en'
									? item.title_en
									: item.title_ru
									? item.title_ru
									: item.title_en}
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
								onClick={() =>
									this.handleChange(
										'topic',
										reactCookie.load('languageCode') === 'en'
											? item.title_en
											: item.title_ru
											? item.title_ru
											: item.title_en
									)
								}
							>
								{reactCookie.load('languageCode') === 'en'
									? item.title_en
									: item.title_ru
									? item.title_ru
									: item.title_en}
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
								onClick={() =>
									this.handleChange(
										'event',
										reactCookie.load('languageCode') === 'en'
											? item.title_en
											: item.title_ru
											? item.title_ru
											: item.title_en
									)
								}
							>
								{reactCookie.load('languageCode') === 'en'
									? item.title_en
									: item.title_ru
									? item.title_ru
									: item.title_en}
							</Menu.Item>
					  ))
					: null}
			</Menu>
		);

		const yearMenu = (
			<Menu>
				{this.state.years.length > 0
					? this.state.years.map((item, index) => (
							<Menu.Item key={index} onClick={() => this.handleChange('year', item)}>
								{item}
							</Menu.Item>
					  ))
					: null}
			</Menu>
		);

		return (
			<div id="id">
				{this.props.isUpparRowSearch ? (
					<div className="container titleDiv">
						<div className="row">
							{this.props.cantoSearch ? (
								<div className="col-6 my-1 col-md-3">
									<Input
										placeholder="Canto"
										allowClear={this.state.songs !== ''}
										value={this.state.songs}
										suffix={
											this.state.songs === '' && (
												<Tooltip title="Please enter the song you want to search">
													<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
												</Tooltip>
											)
										}
										onChange={event => this.handleTextChange('songs', event)}
									/>
								</div>
							) : null}
							{this.props.chapterSearch ? (
								<div className="col-6 my-1 col-md-3 ">
									<Input
										placeholder="Chapter"
										allowClear={this.state.chapter !== ''}
										value={this.state.chapter}
										suffix={
											this.state.chapter === '' && (
												<Tooltip title="Please enter the chapter you want to search">
													<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
												</Tooltip>
											)
										}
										onChange={event => this.handleTextChange('chapter', event)}
									/>
								</div>
							) : null}
							{this.props.verseSearch ? (
								<div className="col-6 my-1 col-md-3 ">
									<Input
										placeholder="Verse"
										allowClear={this.state.verse !== ''}
										value={this.state.verse}
										suffix={
											this.state.verse === '' && (
												<Tooltip title="Please enter the verse you want to search">
													<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
												</Tooltip>
											)
										}
										onChange={event => this.handleTextChange('verse', event)}
									/>
								</div>
							) : null}
							{this.props.translationSearch ? (
								<div className="col-6 my-1 col-md-3">
									<Dropdown overlay={translationMenu} overlayClassName="searchDropDownDiv">
										<Button className="w-100" onClick={() => this.scrollToElement()}>
											{this.state.translation ? this.state.translation : 'Translation'} <Icon type="down" />
										</Button>
									</Dropdown>
								</div>
							) : null}
						</div>
					</div>
				) : null}

				<div className="container titleDiv">
					<div className="row">
						{this.props.yearSearch ? (
							<div className="col-6 my-1 col-md-3 ">
								<Dropdown overlay={yearMenu} overlayClassName="searchDropDownDiv">
									<Button className="w-100" onClick={() => this.scrollToElement()}>
										{this.state.year ? this.state.year : 'Year'} <Icon type="down" />
									</Button>
								</Dropdown>
							</div>
						) : null}
						{this.props.locationSearch ? (
							<div className="col-6 my-1 col-md-3">
								<Dropdown overlay={locationMenu} overlayClassName="searchDropDownDiv">
									<Button className="w-100" onClick={() => this.scrollToElement()}>
										{this.state.location ? this.state.location : 'Location'} <Icon type="down" />
									</Button>
								</Dropdown>
							</div>
						) : null}
						{this.props.topicSearch ? (
							<div className="col-6 my-1 col-md-3">
								<Dropdown overlay={topicMenu} overlayClassName="searchDropDownDiv">
									<Button className="w-100" onClick={() => this.scrollToElement()}>
										{this.state.topic ? this.state.topic : 'Topic'} <Icon type="down" />
									</Button>
								</Dropdown>
							</div>
						) : null}
						{this.props.eventSearch ? (
							<div className="col-6 my-1 col-md-3">
								<Dropdown overlay={eventMenu} overlayClassName="searchDropDownDiv">
									<Button className="w-100" onClick={() => this.scrollToElement()}>
										{this.state.event ? this.state.event : 'Event'} <Icon type="down" />
									</Button>
								</Dropdown>
							</div>
						) : null}
					</div>
				</div>

				<div className="container titleDiv">
					<div className="row">
						<div className="col-12 my-1 col-md-3">
							<Button
								className="w-100 searchButtonColor searchIconBorder"
								type="primary"
								icon="search"
								onClick={this.handleSearchData}
							>
								Search
							</Button>
						</div>
						<div className="col-12 my-1 col-md-3">
							<Button className="w-100" type="danger" icon="reset" onClick={this.reset}>
								Reset
							</Button>
						</div>
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
		getTranslations: () => {
			dispatch(getTranslations());
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchFilter);
