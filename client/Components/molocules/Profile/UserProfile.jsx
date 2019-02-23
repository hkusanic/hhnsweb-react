import React, { Component } from 'react';
import { onlyIntegers, isNotEmpty, isValidPhone } from '../../../utils/validation';
import { connect } from 'react-redux';
import { editProfile } from '../../../actions/loginActions';
import Auth from '../../../utils/Auth';
import IntlTelInput from 'react-intl-tel-input';
import { Translate } from 'react-localize-redux';
export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            email: '',
            mobileNumber: '',
            countryCode: '',
            editing: true,
            error: '',
            isUpdated: false
        }
    }

    componentDidMount() {
        this.setState({
            editing: true,
            isUpdated: false
        }, () => { this.getUser() })
    }

    componentWillReceiveProps(nextProps) {
        // this.props = nextProps;
        let editing = true;
        if (!this.props.isProfileEdited && nextProps.isProfileEdited) {
            editing = true;
        }
        if (nextProps.error) {
            editing = false;
        }
        this.setState({
            editing,
            error: nextProps.error,
            isUpdated: nextProps.isProfileEdited
        }, () => { this.getUser() })
    }

    getUser = () => {
        const user = JSON.parse(Auth.getUserDetails());
        this.setState({
            first: user.firstName,
            last: user.last,
            email: user.email,
            mobileNumber: user.mobileNumber,
            countryCode: user.countryCode
        })
    }
    handleEditing = (event) => {
        event.preventDefault();
        this.setState({ editing: false })
    }

    handleChange = (type, event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            error: '',
            [type]: value
        })
    }

    handleEditProfile = () => {
        event.preventDefault();
        if (!this.state.first ||
            !this.state.mobileNumber ||
            !this.state.last) {
            this.setState({ error: '**Please fill all the fields' })
        }
        else {
            const body = {
                mobileNumber: this.state.mobileNumber,
                firstName: this.state.first,
                lastName: this.state.last,
                mobileNumber: this.state.mobileNumber,
                countryCode: this.state.countryCode
            }
            this.props.editProfile(body);
        }
    }

    handle = (validate, number, data) => {
        console.log(validate, number, data);
        const countryCode = data.dialCode;
        const mobileNumber = number;

        if (!validate) {
            this.setState({ error: 'Please Enter Mobile Number Correctly' })
        } else {
            this.setState({
                mobileNumber,
                countryCode,
                error: '',
            }, () => {
                console.log(this.state.mobileNumber, this.state.countryCode)
            })
        }
    }
    render() {
        if (!this.state && !this.state.email) {
            return <div>Loading..</div>
        }
        return (
            <div>
                <section className="section bg-gray-100">
                    <div className="container">
                        <div className="row justify-content-center" style={{ paddingTop: '2%' }}>
                            <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
                                <h3 className="wow-outer text-center"><span className="wow slideInUp">    <Translate>
                                    {({ translate }) => translate('USER_PROFILE.user_profile')}
                                </Translate></span></h3>
                                <div style={{ paddingLeft: '10%' }} className="rd-form" data-form-type="contact" >
                                    <div className="row row-10">
                                        <div className="col-md-10 wow-outer">
                                            <div className="form-wrap wow fadeSlideInUp">
                                                <label className="form-label-outside" htmlFor="contact-first-name"><Translate>
                                                    {({ translate }) => translate('USER_PROFILE.first_name')}
                                                </Translate></label>
                                                <input
                                                    className="form-input"
                                                    style={{ backgroundColor: (this.state.editing) ? '#f6f6f6' : '' }}
                                                    id="first-name"
                                                    type="text"
                                                    name="name"
                                                    disabled={this.state.editing}
                                                    value={this.state.first}
                                                    onChange={() => { this.handleChange('first', event) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-10 wow-outer">
                                            <div className="form-wrap wow fadeSlideInUp">
                                                <label className="form-label-outside" htmlFor="contact-last-name"><Translate>
                                                    {({ translate }) => translate('USER_PROFILE.last_name')}
                                                </Translate></label>
                                                <input
                                                    className="form-input"
                                                    style={{ backgroundColor: (this.state.editing) ? '#f6f6f6' : '' }}
                                                    id="last-name"
                                                    type="text"
                                                    name="name"
                                                    disabled={this.state.editing}
                                                    value={this.state.last}
                                                    onChange={() => { this.handleChange('last', event) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-10 wow-outer">
                                            <div className="form-wrap wow fadeSlideInUp">
                                                <label className="form-label-outside" htmlFor="contact-email"><Translate>
                                                    {({ translate }) => translate('USER_PROFILE.email')}
                                                </Translate></label>
                                                <input
                                                    className="form-input"
                                                    style={{ backgroundColor: '#f6f6f6' }}
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    disabled={true}
                                                    value={this.state.email} />
                                            </div>
                                        </div>
                                        {this.state.editing ?
                                            <div className="col-md-10 wow-outer">
                                                <div className="form-wrap wow fadeSlideInUp">
                                                    <label className="form-label-outside" htmlFor="contact-phone"><Translate>
                                                        {({ translate }) => translate('USER_PROFILE.mobile_number')}
                                                    </Translate></label>
                                                    <input
                                                        className="form-input"
                                                        style={{ backgroundColor: (this.state.editing) ? '#f6f6f6' : '' }}
                                                        id="contact-phone"
                                                        type="text"
                                                        name="phone"
                                                        disabled={this.state.editing}
                                                        value={this.state.mobileNumber}
                                                        onChange={() => { this.handleChange('mobileNumber', event) }} />
                                                </div>
                                            </div>
                                            :
                                            <div className="col-md-10 form-wrap">
                                                <label className="form-label-outside" htmlFor="contact-phone">Mobile Number</label>
                                                <IntlTelInput
                                                    containerClassName="intl-tel-input"
                                                    defaultValue={this.state.mobileNumber}
                                                    defaultCountry='india'
                                                    autoHideDialCode={true}
                                                    format={true}
                                                    separateDialCode={true}
                                                    inputClassName="form-control"
                                                    onPhoneNumberChange={(validate, number, data) => { this.handle(validate, number, data) }}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div className="group group-middle">
                                        <div className="wow-outer">
                                            {
                                                this.state.editing ?
                                                    <button className="button button-primary button-winona" onClick={this.handleEditing} >
                                                    {/* <Translate>
                                                        {({ translate }) => translate('USER_PROFILE.edit')}
                                                    </Translate> */}
                                                    Edit
                                                    </button>
                                                    :
                                                    <button className="button button-primary button-winona" onClick={this.handleEditProfile} >Update</button>
                                            }
                                        </div>
                                    </div>
                                    {this.state.isUpdated ? <p className="updateText"><Translate>
                                        {({ translate }) => translate('USER_PROFILE.your_profile_updated')}
                                    </Translate></p> : ''}
                                    <p className="loginError">{this.state.error === '**Please fill all the fields' ? <Translate>
                                        {({ translate }) => translate('USER_PROFILE.please_fill')}
                                    </Translate> : this.state.error === 'Please Enter Mobile Number Correctly' ? <Translate>
                                        {({ translate }) => translate('USER_PROFILE.please_enter_mobile')}
                                    </Translate> : null}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.loginReducer.error,
        isProfileEdited: state.loginReducer.isProfileEdited
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (body) => { dispatch(editProfile(body)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
