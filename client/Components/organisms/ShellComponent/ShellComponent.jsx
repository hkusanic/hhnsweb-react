import React, { Component } from 'react';
import Auth from "../../../utils/Auth";
import LoginForm from '../Form/LoginFrom';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/loginActions';


export class ShellCompoenent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: false,
            error: ''
        }
    }

    componentDidMount() {
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({ isUserLogin })
    }

    componentWillReceiveProps(nextProps) {
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({
            isUserLogin,
            error: nextProps.login.error
        })
    }
    render() {
        if (!this.state && !this.state.isUserLogin) {
            return <div>Loading.....</div>
        }
        if (this.state.isUserLogin) {
            return <section className="section section-md bg-gray-700 bgcolor">
                <div className="container">
                    <p className="loginheading loginWarning">Please login first to see the content </p>
                    <div className="box-1">
                        <h4 className="loginheading">
                            <Translate>
                                {({ translate }) => translate('loginLabel')}
                            </Translate>
                        </h4>
                        <LoginForm loginUser={this.props.loginUser} error={this.state.error} />
                    </div>
                </div>
            </section >
        }
        return (
            <div>{this.props.children}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.loginReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userDetails) => {
            dispatch(loginUser(userDetails));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShellCompoenent);