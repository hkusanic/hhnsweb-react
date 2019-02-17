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
                                            <li><a href="https://vaishnava-dasnrs.wixsite.com/page-of-vaishnava">Vaishnava dasa</a></li>
                                            <li><a href="http://forum.niranjanaswami.com/">Forum</a></li>
                                            <li><a href="https://fileshare.niranjanaswami.net/?key=3662d52d8035628a76fdac5f2366e26a567">File share</a></li>
                                        </ul>
                                    </div>                                    
                                </div>
                            </div>
                            <div className="col-md-7 col-lg-4">
                                <h4>Contact Information</h4>
                                <hr />
                                <ul className="list-sm">
                                    <li className="object-inline"><span className="icon icon-md mdi mdi-map-marker text-gray-700"></span><a className="link-default" href="#">1683 Main Street, East Hartford, CT 06183</a></li>
                                    <li className="object-inline"><span className="icon icon-md mdi mdi-email text-gray-700"></span><a className="link-default" href="mailto:#">feedback@niranjanaswami.net</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-linked-aside">
                    <div className="container">
                        <p className="rights"><span>&copy;&nbsp;</span><span className="copyright-year"></span><span>&nbsp;</span><span>All Rights Reserved.</span><span>&nbsp;</span><span>His Holiness Niranjana Swami.</span></p>
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
