import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import {Icon} from 'antd';
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
                            <div className="col-lg-4">
                                <h4><Translate>
                                    {({ translate }) => translate('FOOTER.quick_links')}
                                </Translate></h4>
                                <div className="row row-20">
                                    <div className="col-6 col-sm-3">
                                        <ul className="list list-xs">
                                            <li>
                                                <Link to="/contact">
                                                    <Translate>{({ translate }) => translate('HOME.contacts')}</Translate>
                                                </Link>
                                            </li>
                                            <li><a href="https://vaishnava-dasnrs.wixsite.com/page-of-vaishnava"><Translate>
                                                {({ translate }) => translate('FOOTER.vaishnava_dasa')}
                                            </Translate></a></li>
                                            <li><a href="http://forum.niranjanaswami.com/"><Translate>
                                                {({ translate }) => translate('FOOTER.forum')}
                                            </Translate></a></li>
                                            <li><a href="https://fileshare.niranjanaswami.net/?key=3662d52d8035628a76fdac5f2366e26a567"><Translate>
                                                {({ translate }) => translate('FOOTER.file_share')}
                                            </Translate></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-7 col-lg-4">
                                <h4><Translate>
                                    {({ translate }) => translate('FOOTER.quick_links')}
                                </Translate></h4>
                            
                                <div className="row row-20">
                                    <div className="col-6 col-sm-3">
                                        <ul className="list list-xs">
                                            <li>
                                                <Link to="/audio">
                                                    <Translate>{({ translate }) => translate('HOME.audio')}</Translate>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/video'>

                                                    <Translate>
                                                        {({ translate }) => translate('HOME.video')}
                                                    </Translate>
                                                </Link>

                                            </li>
                                            <li>
                                                <Link to='/blog'>

                                                    <Translate>
                                                        {({ translate }) => translate('HOME.blog')}
                                                    </Translate>
                                                </Link>

                                            </li>
                                            <li>
                                                <Link to='/transcriptions'>
                                                    <Translate>
                                                        {({ translate }) => translate('HOME.Transcriptions')}
                                                    </Translate>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/summaries'>
                                                    <Translate>
                                                        {({ translate }) => translate('HOME.Summaries')}
                                                    </Translate>
                                                </Link>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-7 col-lg-4">
                                <h4><Translate>
                                    {({ translate }) => translate('FOOTER.contact_information')}
                                </Translate></h4>
                               
                                <ul className="list-sm">
                                    <li className="object-inline"><Icon type="facebook" /><Icon type="instagram" /><Icon type="twitter" /> </li>
                                    <li className="object-inline"><a className="link-default" href="#">1683 Main Street, East Hartford, CT 06183</a></li>
                                    <li className="object-inline"><a className="link-default" href="mailto:#">dgd@niranjanaswami.net</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <span className="icon icon-md mdi mdi-map-marker text-gray-700"></span> <span className="icon icon-md mdi mdi-email text-gray-700"></span> */}
                <div className="footer-linked-aside">
                    <div className="container">
                        <p className="rights" style={{textAlign: "center"}}>
                            <span>&copy;&nbsp;</span><span>&nbsp;</span>
                            <span>
                                <Translate>
                                    {({ translate }) => translate('FOOTER.copy_rights')}
                                </Translate>
                            </span>
                        </p>
                    </div>
                </div>
            </footer >

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
