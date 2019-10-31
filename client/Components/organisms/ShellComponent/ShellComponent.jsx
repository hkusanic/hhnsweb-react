import React from 'react';
import Auth from '../../../utils/Auth';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/loginActions';

export class ShellCompoenent extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isUserLogin: false,
			error: '',
		};
	}

	componentDidMount () {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({ isUserLogin });
	}

	componentWillReceiveProps (nextProps) {
		const isUserLogin = Auth.isUserAuthenticated();
		this.setState({
			isUserLogin,
			error: nextProps.login.error,
		});
	}
	render () {
		if (!this.state && !this.state.isUserLogin) {
			return <div>Loading.....</div>;
		}
		return <div>{this.props.children}</div>;
	}
}

const mapStateToProps = state => {
	return {
		login: state.loginReducer,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginUser: userDetails => {
			dispatch(loginUser(userDetails));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShellCompoenent);
