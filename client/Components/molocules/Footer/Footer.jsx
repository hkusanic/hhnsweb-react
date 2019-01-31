import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <footer className="section footer-advanced bg-gray-700">
                    <div className="footer-advanced-aside">
                        <div className="container">
                            <div className="footer-advanced-layout">
                                <div>
                                    <ul className="list-nav">
                                        <li><a >Home</a></li>
                                        <li><a >Lectures</a></li>
                                        <li><a >Admin</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="list-inline list-inline-md">
                                        <li><a className="icon icon-sm link-default mdi mdi-facebook" href="#"></a></li>
                                        <li><a className="icon icon-sm link-default mdi mdi-twitter" href="#"></a></li>
                                        <li><a className="icon icon-sm link-default mdi mdi-instagram" href="#"></a></li>
                                        <li><a className="icon icon-sm link-default mdi mdi-google" href="#"></a></li>
                                        <li><a className="icon icon-sm link-default mdi mdi-linkedin" href="#"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <hr />
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;