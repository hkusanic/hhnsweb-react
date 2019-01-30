import React, { Component } from 'react';
import Login from './../../../containers/Login/Login';
import {
    Link
  } from 'react-router-dom';
import logo from '../../../assets/images/lotus.png';

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.showLogin = {
            login : false
        }
    }

    render() {
        return (
            <div>
                <header className="section page-header">

                    <div className="rd-navbar-wrap">
                        <nav className="rd-navbar rd-navbar-corporate" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-fixed" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-xxl-layout="rd-navbar-static" data-xxl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px" data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
                            <div className="rd-navbar-aside-outer">
                                <div className="rd-navbar-aside">

                                    <div className="rd-navbar-panel">

                                        <button className="rd-navbar-toggle" data-rd-navbar-toggle="#rd-navbar-nav-wrap-1"><span></span></button>
                                        <a className="rd-navbar-brand" href="index.html"><img src={logo} alt="" width="256" height="50" srcSet="../../../assets/images/lotus.png 2x" /></a>
                                    </div>
                                    <div className="rd-navbar-collapse">
                                        <button className="rd-navbar-collapse-toggle rd-navbar-fixed-element-1" data-rd-navbar-toggle="#rd-navbar-collapse-content-1"><span></span></button>
                                        <div className="rd-navbar-collapse-content" id="rd-navbar-collapse-content-1">
                                            <div>
                                                <article className="unit align-items-center">
                                                    <div className="unit-left"><span className="icon icon-md icon-modern mdi mdi-phone"></span></div>
                                                    <div className="unit-body">
                                                        <ul className="list-0">
                                                            <li><a className="link-default" href="tel:#">1-800-1234-567</a></li>
                                                            <li><a className="link-default" href="tel:#">1-800-8763-765</a></li>
                                                        </ul>
                                                    </div>
                                                </article>
                                            </div>
                                            <div>
                                                <article className="unit align-items-center">
                                                    <div className="unit-left"><span className="icon icon-md icon-modern mdi mdi-map-marker"></span></div>
                                                    <div className="unit-body"><a className="link-default" href="tel:#">2130 Fulton Street <br /> San Diego, CA 94117-1080</a></div>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rd-navbar-main-outer">
                                <div className="rd-navbar-main">
                                    <div className="rd-navbar-nav-wrap" id="rd-navbar-nav-wrap-1">

                                        <div className="rd-navbar-search" id="rd-navbar-search-1">
                                            <button className="rd-navbar-search-toggle" data-rd-navbar-toggle="#rd-navbar-search-1"><span></span></button>
                                            <form className="rd-search" action="search-results.html" data-search-live="rd-search-results-live-1" method="GET">
                                                <div className="form-wrap">
                                                    <label className="form-label" htmlFor="rd-navbar-search-form-input-1">Search...</label>
                                                    <input className="form-input rd-navbar-search-form-input" id="rd-navbar-search-form-input-1" type="text" name="s" autoComplete="off" />
                                                    <div className="rd-search-results-live" id="rd-search-results-live-1"></div>
                                                </div>
                                                <button className="rd-search-form-submit fa-search" type="submit"></button>
                                            </form>
                                        </div>

                                        <ul className="rd-navbar-nav">
                                            <li className="rd-nav-item active"><Link to="/"><a className="rd-nav-link">Home</a></Link></li>
                                            <li className="rd-nav-item active"><Link to="/lectures"><a className="rd-nav-link">Lectures</a></Link></li>
                                            <li className="rd-nav-item active"><Link to="/blog"><a className="rd-nav-link">Blog</a></Link></li>
                                            <li className="rd-nav-item active"><Link to="/calender"><a className="rd-nav-link">Calender</a></Link></li>
                                            <li className="rd-nav-item"><Link to="/booking"><a className="rd-nav-link">Booking</a></Link></li>
                                            <li className="rd-nav-item active"><Link to="/"><a className="rd-nav-link">Admin</a></Link></li>
                                            <li className="rd-nav-item"><Link to="/"><a className="rd-nav-link"><Login /></a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>)
    }

     showLogin(){
       this.setState({login: true})
    }
}

export default Navigation;
