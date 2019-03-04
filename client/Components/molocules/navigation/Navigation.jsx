import React, { Component } from 'react';
import Login from './../../../containers/Login/Login';
import {
    Link, Redirect
} from 'react-router-dom';
import Auth from '../../../utils/Auth';
import { Translate } from 'react-localize-redux';
import { LanguageSwitch } from '../../atoms/LanguageSwitch/LanguageSwitch';
import * as DATA from '../../../constants/biographies';

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: false,
            Prabhupada_swami_bio: '',
            Niranjana_swami_bio: '',
            floatImage: '',
            index: 1,
            redirect: false,
            login: false
        }
    }

    componentDidMount() {
        const Prabhupada_swami_bio = {
            img: 'https://ik.imagekit.io/gcwjdmqwwznjl/Prabhupada-Bio_BkS_T-HUE.png',
            title_en: DATA.BIOGRAPHY.one_title_en,
            title_ru: DATA.BIOGRAPHY.one_title_ru,
            content_en: DATA.BIOGRAPHY.one_content_en,
            content_ru: DATA.BIOGRAPHY.one_content_ru

        }
        const Niranjana_swami_bio = {
            img: 'https://ik.imagekit.io/gcwjdmqwwznjl/NRSBio_HkSdTWBLE.png',
            title_en: DATA.BIOGRAPHY.two_title_en,
            title_ru: DATA.BIOGRAPHY.two_title_ru,
            content_en: DATA.BIOGRAPHY.two_content_en,
            content_ru: DATA.BIOGRAPHY.two_content_ru
        }
        const isUserLogin = Auth.isUserAuthenticated();
        let tabIndex = sessionStorage.getItem('tabIndex');
        if (tabIndex) {
            tabIndex = parseInt(tabIndex, 10);
        }
        this.setState({ isUserLogin, Prabhupada_swami_bio, Niranjana_swami_bio, index: tabIndex ? tabIndex : 1 })

        //window.addEventListener('scroll', this.handleScroll);

    }


    handleRedirect = () => {
        this.setState({ redirect: !this.state.redirect })
    }

    handleLogin = () => {
        this.setState({ login: !this.state.login })
    }

    componentWillReceiveProps() {
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({ isUserLogin })
    }

    componentWillMount() {
        //window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        if ($('.rd-navbar--is-stuck')) {
            if ($('.rd-navbar--is-stuck').length === 1) {
                if (this.state.floatImage === '')
                    this.setState({ floatImage: 'styleImage' })
            }
            else {
                if (this.state.floatImage === 'styleImage')
                    this.setState({ floatImage: '' })
            }
        }
    }

    handleNavigationClick = (index) => {
        this.handleTabIndex(index)
        $('.login-modal-2').removeClass('active');
        $('.register-modal-2').removeClass('active');
        if (!this.props.isLogin) {
            $('.login-modal-2').addClass('active');
            $('.rd-navbar-toggle').removeClass('active');
            $('.rd-navbar-nav-wrap').removeClass('active');
        }
    }

    handleRemoveModal = (index) => {
        this.handleTabIndex(index)
        $('.login-modal-2').removeClass('active');
        $('.rd-navbar-nav-wrap').removeClass('active');
        $('.register-modal-2').removeClass('active');
        $('.rd-navbar-toggle').removeClass('active');
    }

    handleTabIndex = (index) => {
        if (index) {
            this.setState({ index })
        }
        sessionStorage.setItem('tabIndex', index);
    }

    handleBiographyClick = () => {
        $('.biography-submenu').removeClass('focus');
        $('.biography-submenu').removeClass('opened');
    }

    render() {
        const maxWidth = window.screen.width;
        return (
            <div>
                <header className="section page-header">
                    <div className="rd-navbar-wrap">
                        <nav className="rd-navbar rd-navbar-corporate" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-fixed" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-xxl-layout="rd-navbar-static" data-xxl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px" data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
                            <div className="rd-navbar-aside-outer banner outSideBanner banner1">
                                {maxWidth <= 1210 ? <div className="rd-navbar-aside head ">
                                    <div className="rd-navbar-panel">
                                        <button className="rd-navbar-toggle" data-rd-navbar-toggle="#rd-navbar-nav-wrap-1"><span></span></button>
                                        <div style={{ width: '100%' }}>
                                            <div className="topMenu" style={{ float: 'right' }}>
                                                <ul className="rd-navbar-nav">
                                                    <li className="rd-nav-item">
                                                        <li>
                                                            <a className="rd-nav-link">
                                                                <Login
                                                                    notActive={false}
                                                                    handleRedirect={this.handleRedirect}
                                                                    handleLogin={this.handleLogin}
                                                                    handleTabIndex={this.handleTabIndex} />
                                                            </a>
                                                        </li>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="topMenu languageToggle" style={{ float: 'right' }}>
                                                <ul className="rd-navbar-nav">
                                                    <li className="rd-nav-item"><LanguageSwitch /></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    : ''}
                                <img src="https://ik.imagekit.io/gcwjdmqwwznjl/banner1_HyhqTWrIE.png" />
                            </div>
                            <div className="rd-navbar-main-outer menubanner">
                                <div className="menulogoDiv">
                                    <img className={'menulogoImg' + ' ' + this.state.floatImage} src="https://ik.imagekit.io/gcwjdmqwwznjl/logo_S1yq6Zr8N.png" />
                                </div>
                                <div className="rd-navbar-main MenuPad">
                                    <div className="rd-navbar-nav-wrap padTopMenu" id="rd-navbar-nav-wrap-1">
                                        <ul className="rd-navbar-nav">
                                            <li className="rd-nav-item hideMenu"><LanguageSwitch /></li>
                                            <li onClick={() => { this.handleRemoveModal(1) }} className="rd-nav-item">
                                                <Link className={`rd-nav-link ${this.state.index === 1 ? 'active1' : ''} `} to="/">
                                                    <Translate>{({ translate }) => translate('HOME.home')}</Translate>
                                                </Link>
                                            </li>
                                            <li className="rd-nav-item biography-submenu">
                                                <a className={`rd-nav-link ${this.state.index === 2 ? 'active1' : ''} `}>
                                                    <Translate>{({ translate }) => translate('HOME.biography')}</Translate>
                                                </a>
                                                <ul className="rd-menu rd-navbar-dropdown">
                                                    <li onClick={() => { this.handleRemoveModal(2) }} className="rd-dropdown-item">
                                                        <Link to={{ pathname: '/biograhyDetails', state: this.state.Prabhupada_swami_bio }} onClick={this.handleBiographyClick} className="rd-dropdown-link">
                                                            <Translate>{({ translate }) => translate('HOME.swami_prabhupada')}</Translate>
                                                        </Link>
                                                    </li>
                                                    <li onClick={() => { this.handleRemoveModal(2) }} className="rd-dropdown-item">
                                                        <Link to={{ pathname: '/biograhyDetails', state: this.state.Niranjana_swami_bio }} onClick={this.handleBiographyClick} className="rd-dropdown-link">
                                                            <Translate>{({ translate }) => translate('HOME.niranjanaswami')}</Translate>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="rd-nav-item">
                                                <Link className={`rd-nav-link ${this.state.index === 3 ? 'active1' : ''} `} to="/blog" onClick={() => { this.handleNavigationClick(3) }}>
                                                    <Translate>{({ translate }) => translate('HOME.blog')}</Translate>
                                                </Link>
                                            </li>
                                            <li className="rd-nav-item">
                                                <Link className={`rd-nav-link ${this.state.index === 4 ? 'active1' : ''} `} to="/calender" onClick={() => { this.handleNavigationClick(4) }}>
                                                    <Translate>{({ translate }) => translate('HOME.calendar')}</Translate>
                                                </Link>
                                            </li>
                                            <li className="rd-nav-item">
                                                <Link className={`rd-nav-link ${this.state.index === 5 ? 'active1' : ''} `} to="/booking" onClick={() => { this.handleNavigationClick(5) }}>
                                                    <Translate>{({ translate }) => translate('HOME.booking')}</Translate>
                                                </Link>
                                            </li>
                                            {
                                                this.props.isAdmin && this.props.isLogin ?
                                                    <li className="rd-nav-item">
                                                        <Link className={`rd-nav-link ${this.state.index === 6 ? 'active1' : ''} `} to="/">Admin</Link>
                                                    </li> : ''
                                            }
                                            <li className="rd-nav-item hideMenu">
                                                <a className="rd-nav-link">
                                                    <Login
                                                        notActive={false}
                                                        handleRedirect={this.handleRedirect}
                                                        handleLogin={this.handleLogin}
                                                        handleTabIndex={this.handleTabIndex} />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {this.state.redirect ? <Redirect to='/registration' /> : ''}
                                {this.state.login ? <Redirect to='/' /> : ''}
                            </div>
                        </nav>
                    </div>
                </header>
            </div>)
    }
}

export default Navigation;


