import React, { Component } from 'react';
import { onlyIntegers, isNotEmpty, isValidPhone } from '../../../utils/validation';
import { connect } from 'react-redux';
import { editProfile } from '../../../actions/loginActions';
import Auth from '../../../utils/Auth';
export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            email: '',
            mobileNumber: 9109568856,
            editing: true,
            error: '',
            isUpdated: false
        }
    }

    componentDidMount() {
        this.setState({
            editing : true,
            isUpdated: false
        }, () => {this.getUser()})
    }

    componentWillReceiveProps(nextProps) {
        // this.props = nextProps;
        let editing = true;
        if (!this.props.isProfileEdited && nextProps.isProfileEdited) {
            editing = true;
        }
        if(nextProps.error){
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
            email: user.email
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
        else if (!onlyIntegers(this.state.mobileNumber) || !isValidPhone(this.state.mobileNumber)) {
            this.setState({ error: 'Please Enter Mobile Number Correctly' })
        }
        else {
            const body = {
                mobileNumber: this.state.mobileNumber,
                firstName: this.state.first,
                lastName: this.state.last
            }
            this.props.editProfile(body);
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
                        <div className="row justify-content-center" style={{paddingTop: '2%'}}>
                            <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
                                <h3 className="wow-outer text-center"><span className="wow slideInUp">User Profile</span></h3>
                                <form style={{ paddingLeft: '10%' }} className="rd-form" data-form-type="contact" >
                                    <div className="row row-10">
                                        <div className="col-md-10 wow-outer">
                                            <div className="form-wrap wow fadeSlideInUp">
                                                <label className="form-label-outside" htmlFor="contact-first-name">First Name</label>
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
                                                <label className="form-label-outside" htmlFor="contact-last-name">Last Name</label>
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
                                                <label className="form-label-outside" htmlFor="contact-email">E-mail</label>
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
                                        <div className="col-md-10 wow-outer">
                                            <div className="form-wrap wow fadeSlideInUp">
                                                <label className="form-label-outside" htmlFor="contact-phone">Mobile Number</label>
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
                                    </div>
                                    <div className="group group-middle">
                                        <div className="wow-outer">
                                            {
                                                this.state.editing ?
                                                    <button className="button button-primary button-winona" onClick={this.handleEditing} >Edit</button>
                                                    :
                                                    <button className="button button-primary button-winona" onClick={this.handleEditProfile} >Update</button>
                                            }
                                        </div>
                                    </div>
                                     {this.state.isUpdated ? <p className="updateText">Your profile has been updated Successfully</p> : ''}
                                    <p className="loginError">{this.state.error}</p>
                                </form>
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
