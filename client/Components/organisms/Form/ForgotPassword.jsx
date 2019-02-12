import React, { Component } from 'react';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
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
                                <form class="rd-form rd-mailform form-inline wow fadeIn" data-wow-delay=".2s" data-form-output="form-output-global" data-form-type="subscribe" method="post" action="bat/rd-mailform.php">
                                    <div class="form-wrap">
                                        <input class="form-input" id="subscribe-form-1-email" type="email" name="email" data-constraints="@Email @Required" />
                                        <label class="form-label" for="subscribe-form-1-email">Your e-mail</label>
                                    </div>
                                    <div class="form-button">
                                        <button class="button button-primary button-winona">Submit</button>
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

export default ForgotPassword;