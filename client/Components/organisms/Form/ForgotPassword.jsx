import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../../actions/loginActions';
import { isValidEmail } from '../../../utils/validation';
export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    componentDidMount() {
        console.log("props =====>>>>>", this.props);
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        },()=>{
            console.log("state===>>>", this.state.email)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (isValidEmail(this.state.email)) {
            console.log("User Email ====>>>", this.state.email);
        }else {
            alert("email is not valid");
        }
    }
    render() {
        return (<div>
            <div class="section-sm section-first">
                <section class="section section-lg bg-gray-100">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-sm-10 col-md-8 col-lg-7 col-xl-6">
                                <h3 class="wow-outer text-center"><span class="wow slideInUp">FORGOT PASSWORD</span></h3>
                                <p class="wow-outer"><span class="wow slideInLeft">Enter your e-mail to get the the Password.</span></p>
                                <form class="rd-form form-inline wow fadeIn" data-wow-delay=".2s" data-form-output="form-output-global" data-form-type="subscribe">
                                    <div class="form-wrap">
                                        <input class="form-input" id="subscribe-form-1-email" type="email" name="email" onChange={() => {this.handleEmail(event)}} data-constraints="@Email @Required" />
                                        <label class="form-label" for="subscribe-form-1-email">Your e-mail</label>
                                    </div>
                                    <div class="form-button">
                                        <button class="button button-primary button-winona" onClick={this.handleSubmit}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>);

    }
}

// export default ForgotPassword;

const mapStateToProps = (state) => {
    return {
        login: state.loginReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => {
            dispatch(forgotPassword(email))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);