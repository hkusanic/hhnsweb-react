import React from 'react';
import script from '../../../assets/script';
import SingleBlogHome from '../../molocules/SingleBlog/Singlebloghome';
import { connect } from 'react-redux';
import { quoteOfDay } from '../../../actions/quoteActions';

export class Blogs extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			quotes: [],
		};
	}

	componentDidMount () {
		script();
		let authorList = ['Niranjana Swami', 'Srila Prabhupada'];
		this.props.quoteOfDay(authorList);
		this.setState({
			quotes: this.props.quote.quotes,
		});
	}

	render () {
		if (!this.props.quote) {
			<div> Loading... </div>;
		}
		return (
			<div>
				<section>
					<div style={{ textAlign: 'center' }}>
						<h3 style={{ marginTop: '25px' }}> Quotes of the day </h3>
						<br />
						<br />
					</div>
					{this.props.quote.quotes.length > 0 ? (
						<div className="container centerAlign">
							<div className="row row-50 row-xxl-70">
								<SingleBlogHome
									author={this.props.quote.quotes[0].author}
									source={this.props.quote.quotes[0].en.source_of_quote}
									date={this.props.quote.quotes[0].published_date}
									description={this.props.quote.quotes[0].en.body}
									to={{
										pathname: '/quotes/Niranjana Swami',
										state: 'Niranjana Swami',
									}}
									image="https://ik.imagekit.io/gcwjdmqwwznjl/bitmap-copy-4_L1mokOQ4c.png"
								/>

								<SingleBlogHome
									author={this.props.quote.quotes[1].author}
									source={this.props.quote.quotes[1].en.source_of_quote}
									date={this.props.quote.quotes[1].published_date}
									description={this.props.quote.quotes[1].en.body}
									to={{
										pathname: '/quotes/Srila Prabhupada',
										state: 'Srila Prabhupada',
									}}
									image="https://ik.imagekit.io/gcwjdmqwwznjl/person2_e_HY-dJNH.jpg"
								/>
							</div>
						</div>
					) : null}
					<br />
					<br />
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		quote: state.quoteReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		quoteOfDay: authorList => {
			dispatch(quoteOfDay(authorList));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs);
