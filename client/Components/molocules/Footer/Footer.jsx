import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <footer className="section footer-linked bg-gray-700">
                <div className="footer-linked-main">
                    <div className="container">
                        <div className="row row-50">
                            <div className="col-lg-8">
                                <h4>Quick Links</h4>
                                <hr className="offset-right-1" />
                                <div className="row row-20">
                                    <div className="col-6 col-sm-3">
                                        <ul className="list list-xs">
                                            <li><a href="services.html">Services</a></li>
                                            <li><a href="single-service.html">Single Service</a></li>
                                            <li><a href="contacts.html">Contacts</a></li>
                                            <li><a href="testimonials.html">Testimonials</a></li>
                                            <li><a href="privacy-policy.html">Terms of Use</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-6 col-sm-3">
                                        <ul className="list list-xs">
                                            <li><a href="grid-blog.html">Blog</a></li>
                                            <li><a href="about-us.html">About Us</a></li>
                                            <li><a href="about-me.html">About Me</a></li>
                                            <li><a href="single-blog-post.html">Single Blog Post</a></li>
                                            <li><a href="single-job.html">Single Job</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 col-lg-4">
                                <h4>Contact Information</h4>
                                <hr />
                                <ul className="list-sm">
                                    <li className="object-inline"><span className="icon icon-md mdi mdi-map-marker text-gray-700"></span><a className="link-default" href="#">2130 Fulton Street San Diego, CA <br /> 94117-1080 USA</a></li>
                                    <li className="object-inline"><span className="icon icon-md mdi mdi-phone text-gray-700"></span>
                                        <ul className="list-0">
                                            <li><a className="link-default" href="tel:#">1-800-1234-678</a></li>
                                            <li><a className="link-default" href="tel:#">1-800-8765-098</a></li>
                                        </ul>
                                    </li>
                                    <li className="object-inline"><span className="icon icon-md mdi mdi-email text-gray-700"></span><a className="link-default" href="mailto:#">info@demolink.org</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-linked-aside">
                    <div className="container">
                        <p className="rights"><span>&copy;&nbsp;</span><span className="copyright-year"></span><span>&nbsp;</span><span>All Rights Reserved.</span><span>&nbsp;</span><br className="d-sm-none" /><a href="#">Terms of Use</a><span> and</span><span>&nbsp;</span><a href="privacy-policy.html">Privacy Policy</a>.<span>Design&nbsp;by&nbsp;<a href="https://zemez.io/">Zemez</a></span></p>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;




{/* <footer classNameName="section footer-advanced bg-gray-700">
                    <div classNameName="footer-advanced-aside">
                        <div classNameName="container">
                            <div classNameName="footer-advanced-layout">
                                <div>
                                    <ul classNameName="list-nav">
                                        <li><a >Home</a></li>
                                        <li><a >Lectures</a></li>
                                        <li><a >Admin</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <ul classNameName="list-inline list-inline-md">
                                        <li><a classNameName="icon icon-sm link-default mdi mdi-facebook" href="#"></a></li>
                                        <li><a classNameName="icon icon-sm link-default mdi mdi-twitter" href="#"></a></li>
                                        <li><a classNameName="icon icon-sm link-default mdi mdi-instagram" href="#"></a></li>
                                        <li><a classNameName="icon icon-sm link-default mdi mdi-google" href="#"></a></li>
                                        <li><a classNameName="icon icon-sm link-default mdi mdi-linkedin" href="#"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div classNameName="container">
                        <hr />
                    </div>
                </footer> */}