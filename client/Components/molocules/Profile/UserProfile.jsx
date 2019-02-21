import React, { Component } from 'react';
import { onlyIntegers, isNotEmpty, isValidPhone } from '../../../utils/validation';


export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: 'shailendra',
            last: 'sahu',
            email: 'shailendra@cronj.com',
            mobileNumber: 9109568856,
            editing: true,
            error: ''
        }
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
        if (!isNotEmpty(this.state.first) ||
            !isNotEmpty(this.state.mobileNumber) ||
            !isNotEmpty(this.state.last)) {
            this.setState({ error: '**Please fill all the fields' })
        }
        else if (!onlyIntegers(this.state.mobileNumber) || !isValidPhone(this.state.mobileNumber)) {
            this.setState({ error: 'Please Enter Mobile Number Correctly' })
        }
        else {
            const body = {
                mobileNumber: this.state.mobileNumber,
                firstname: this.state.first,
                lastname: this.state.last
            }
            console.log("body====>>>", body);
        }
    }

    render() {
        return (
            <div>
                <section class="section section-lg bg-gray-100">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-8 col-lg-7 col-xl-6">
                                <h3 class="wow-outer text-center"><span class="wow slideInUp">User Profile</span></h3>
                                <form style={{ paddingLeft: '10%' }} class="rd-form" data-form-type="contact" >
                                    <div class="row row-10">
                                        <div class="col-md-10 wow-outer">
                                            <div class="form-wrap wow fadeSlideInUp">
                                                <label class="form-label-outside" for="contact-first-name">First Name</label>
                                                <input
                                                    class="form-input"
                                                    style={{ backgroundColor: (this.state.editing) ? '#f6f6f6' : '' }}
                                                    id="first-name"
                                                    type="text"
                                                    name="name"
                                                    disabled={this.state.editing}
                                                    value={this.state.first}
                                                    onChange={() => { this.handleChange('first', event) }} />
                                            </div>
                                        </div>
                                        <div class="col-md-10 wow-outer">
                                            <div class="form-wrap wow fadeSlideInUp">
                                                <label class="form-label-outside" for="contact-last-name">Last Name</label>
                                                <input
                                                    class="form-input"
                                                    style={{ backgroundColor: (this.state.editing) ? '#f6f6f6' : '' }}
                                                    id="last-name"
                                                    type="text"
                                                    name="name"
                                                    disabled={this.state.editing}
                                                    value={this.state.last}
                                                    onChange={() => { this.handleChange('last', event) }} />
                                            </div>
                                        </div>
                                        <div class="col-md-10 wow-outer">
                                            <div class="form-wrap wow fadeSlideInUp">
                                                <label class="form-label-outside" for="contact-email">E-mail</label>
                                                <input
                                                    class="form-input"
                                                    style={{ backgroundColor: '#f6f6f6' }}
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    disabled={true}
                                                    value={this.state.email} />
                                            </div>
                                        </div>
                                        <div class="col-md-10 wow-outer">
                                            <div class="form-wrap wow fadeSlideInUp">
                                                <label class="form-label-outside" for="contact-phone">Mobile Number</label>
                                                <input
                                                    class="form-input"
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
                                    <div class="group group-middle">
                                        <div class="wow-outer">
                                            {
                                                this.state.editing ?
                                                    <button class="button button-primary button-winona" onClick={this.handleEditing} >Edit</button>
                                                    :
                                                    <button class="button button-primary button-winona" onClick={this.handleEditProfile} >Update</button>
                                            }
                                        </div>
                                    </div>
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

export default UserProfile;
