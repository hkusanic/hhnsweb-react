import * as queryString from 'query-string';
import React, { Component } from 'react';
import { isMatch, isNotEmpty } from '../../../utils/validation';
import { connect } from 'react-redux';
import { getUserByAccessId, resetPassword } from '../../../actions/loginActions';

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            error: '',
            accessid: '',
        }
    }

    componentDidMount() {
        const values = queryString.parse(location.search)
        if (values.accessid) {
            this.setState({
                accessid: values.accessid
            }, () => {
                const body = {
                    'accessid': this.state.accessid
                }
                this.props.getUserByAccessId(body);
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        console.log("this.props===>>>>", this.props);
    }

    handleChange = (type, event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            error: '',
            [type]: value
        })
    }

    handleSavePassword = (event) => {
        event.preventDefault();
        if (!isNotEmpty(this.state.password) && !isNotEmpty(this.state.confirmPassword)) {
            this.setState({ error: '**Please fill all the details' })
        }
        else if (!isMatch(this.state.password, this.state.confirmPassword)) {
            this.setState({ error: 'Plassword and confirm passowrd should match' });
        }
        else {
            const body = {
                'email': this.props.AccessUser.email,
                'password': this.state.password,
                'accessid': this.state.accessid
            }
            this.props.resetPassword(body);
        }
    }

    render() {
        if (!this.state && this.props) {
            return <div class="section-sm section-first" style={{ textAlign: 'center' }}>Loading...</div>
        }
        return (<div>
            <div class="section-sm section-first">
                {
                    (Object.keys(this.props.AccessUser).length === 0 && this.props.resetError) ?
                        <div class="section-sm section-first accesIdError">Link is expired</div>
                        :
                        (!this.props.isPasswordupdated ?<section class="section section-lg bg-gray-100">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-sm-10 col-md-8 col-lg-7 col-xl-6">
                                        <h3 class="wow-outer text-center"><span class="wow slideInUp">RESET PASSWORD</span></h3>
                                        <div class="container" style={{ paddingTop: '5%' }}>
                                            <div class="box-1" style={{ maxWidth: '70%' }}>
                                                <form class="rd-form rd-form-small">
                                                    <div class="form-wrap" style={{ paddingTop: '3%', paddingBottom: '3%' }}>
                                                        <input
                                                            class="form-input"
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            onChange={() => { this.handleChange('password', event) }} />
                                                    </div>
                                                    <div class="form-wrap" style={{ paddingTop: '3%', paddingBottom: '3%' }}>
                                                        <input
                                                            class="form-input"
                                                            type="password"
                                                            name="ConfirmPassword"
                                                            placeholder="Confirm Password"
                                                            onChange={() => { this.handleChange('confirmPassword', event) }} />
                                                    </div>
                                                    <div class="form-wrap">
                                                        <button class="button button-primary button-winona" onClick={this.handleSavePassword}>Save Password</button>
                                                    </div>
                                                    <p className="loginError">{this.state.error}</p>
                                                    <p className="loginError">{this.props.UpdatedError}</p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        : 
                        <div className="accesIdError">Password is reset successfully</div>)
                }
            </div>
        </div>);

    }
}

const mapStateToProps = (state) => {
    return {
        AccessUser: state.loginReducer.AccessUser,
        resetError: state.loginReducer.resetError,
        isPasswordupdated: state.loginReducer.isPasswordupdated,
        UpdatedError: state.loginReducer.UpdatedError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserByAccessId: (body) => { dispatch(getUserByAccessId(body)) },
        resetPassword: (body) => { dispatch(resetPassword(body)) }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);