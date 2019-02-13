import React, { Component } from 'react';
import Login from './../../../containers/Login/Login';
import {
    Link
} from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import banner from '../../../assets/images/header.png';
import Auth from '../../../utils/Auth';
import { Translate } from 'react-localize-redux';
import { LanguageSwitch } from '../../atoms/LanguageSwitch/LanguageSwitch';


export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: false
        }
    }

    componentDidMount() {
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({ isUserLogin })
    }

    render() {
        return (
            <div>
                <header className="section page-header">

                    <div className="rd-navbar-wrap">
                        <nav className="rd-navbar rd-navbar-corporate" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-fixed" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-xxl-layout="rd-navbar-static" data-xxl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px" data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
                            <div className="rd-navbar-aside-outer banner outSideBanner banner1">
                                <div className="rd-navbar-aside head ">
                                    <div className="rd-navbar-panel">
                                        <button className="rd-navbar-toggle" data-rd-navbar-toggle="#rd-navbar-nav-wrap-1"><span></span></button>
                                        {/* <div style={{ width: '100%' }}>
                                            <div className="topMenu" style={{ float: 'right' }}>
                                                <ul className="rd-navbar-nav">
                                                    <li className="rd-nav-item"><Link to="/"><a className="rd-nav-link"><Login /></a></Link></li>
                                                </ul>
                                            </div>
                                            <div className="topMenu languageToggle" style={{ float: 'right' }}>
                                                <ul className="rd-navbar-nav">
                                                    <li className="rd-nav-item"><LanguageSwitch /></li>
                                                </ul>
                                            </div> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                                <img src={banner} alt="" width="100%" height="100%" srcSet="../../../assets/images/banner.png 2x" />

                            </div>
                            <div className="rd-navbar-main-outer menubanner">
                                <div className="menulogoDiv">
                                    <img src={logo} className="menulogoImg" alt="" width="100%" height="100%" srcSet="../../../assets/images/Prabhupada.png 2x" />
                                </div>
                                <div className="rd-navbar-main">
                                    <div className="rd-navbar-nav-wrap" id="rd-navbar-nav-wrap-1">

                                        {/* <div className="rd-navbar-search" id="rd-navbar-search-1"> */}
                                            {/* <button className="rd-navbar-search-toggle" data-rd-navbar-toggle="#rd-navbar-search-1"><span></span></button> */}
                                            {/* <form className="rd-search" action="search-results.html" data-search-live="rd-search-results-live-1" method="GET">
                                                <div className="form-wrap">
                                                    <label className="form-label" htmlFor="rd-navbar-search-form-input-1">Search...</label>
                                                    <input className="form-input rd-navbar-search-form-input" id="rd-navbar-search-form-input-1" type="text" name="s" autoComplete="off" />
                                                    <div className="rd-search-results-live" id="rd-search-results-live-1"></div>
                                                </div>
                                                <button className="rd-search-form-submit fa-search" type="submit"></button>
                                            </form> */}
                                        {/* </div> */}

                                        <ul className="rd-navbar-nav">
                                            <li className="rd-nav-item"><LanguageSwitch /></li>
                                            <li className="rd-nav-item active"><Link to="/"><a className="rd-nav-link">
                                                <Translate>
                                                    {({ translate }) => translate('homePage')}
                                                </Translate>
                                            </a></Link></li>
                                            {!this.state.isUserLogin ?
                                                <li className="rd-nav-item active"><Link to="/lectures"><a className="rd-nav-link">Audio</a></Link>
                                                    <ul className="rd-menu rd-navbar-dropdown">
                                                        <li className="rd-dropdown-item"><Link to="/audio"><a className="rd-dropdown-link">Recent Audio</a></Link></li>
                                                        <li className="rd-dropdown-item"><a className="rd-dropdown-link">Lectures</a></li>
                                                        <li className="rd-dropdown-item"><a className="rd-dropdown-link">Kirtan And Bhajan</a></li>
                                                    </ul>
                                                </li>
                                                : ''}
                                            {!this.state.isUserLogin ?
                                                <li className="rd-nav-item active"><Link to="/lectures"><a className="rd-nav-link">Video</a></Link>
                                                    <ul className="rd-menu rd-navbar-dropdown">
                                                        <li className="rd-dropdown-item"><Link to="/video"><a className="rd-dropdown-link" >Recent Video</a></Link></li>
                                                        <li className="rd-dropdown-item"><Link to="/lectures"><a className="rd-dropdown-link">
                                                            <Translate>
                                                                {({ translate }) => translate('navLectures')}
                                                            </Translate></a></Link></li>
                                                        <li className="rd-dropdown-item"><a className="rd-dropdown-link" >Kirtan And Bhajan</a></li>
                                                    </ul>
                                                </li>
                                                : ''}
                                            <li className="rd-nav-item active"><Link to="/blog"><a className="rd-nav-link"> <Translate>
                                                {({ translate }) => translate('navBlog')}
                                            </Translate></a></Link></li>
                                            <li className="rd-nav-item active"><Link to="/calender"><a className="rd-nav-link">Calender</a></Link></li>
                                            <li className="rd-nav-item"><Link to="/booking"><a className="rd-nav-link">Booking</a></Link></li>
                                            {/* <li className="rd-nav-item active" ><a className="rd-nav-link">Transcriptions</a></li>
                                            <li className="rd-nav-item active"><a className="rd-nav-link">Summaries</a></li> */}
                                            {this.props.isAdmin && this.props.isLogin ? <li className="rd-nav-item active"><Link to="/"><a className="rd-nav-link">Admin</a></Link></li> : ''}
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

}

export default Navigation;


