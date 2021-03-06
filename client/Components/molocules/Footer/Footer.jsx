import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { throttle } from 'lodash';

export class Footer extends Component {
	constructor(props) {
		super(props);
		this.resize = throttle(this.resize.bind(this), 100);
		this.state = {};
	}
	resize = () => this.forceUpdate();

	componentDidMount() {
		window.addEventListener('resize', this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}

	render() {
		const maxWidth = window.screen.width;
		if (maxWidth >= 1024) {
			return (
				<footer className="section footer-linked foot">
					<div className="footer-linked-main">
						<div className="footer-container">
							<div className="row">
								<div className="col-lg-4 col-4">
									<h4
										style={{
											color: 'white',
											paddingBottom: '10px',
										}}
									>
										<Translate>
											{({ translate }) => translate('FOOTER.quick_links')}
										</Translate>
									</h4>
									<div className="row">
										<div className="col-6 col-sm-6">
											<ul className="list " style={{ color: 'white' }}>
												<li>
													<Link to="/contact" style={{ color: 'white' }}>
														<Translate>
															{({ translate }) => translate('HOME.contacts')}
														</Translate>
													</Link>
												</li>
												<li>
													<a
														style={{ color: 'white' }}
														href="https://vaishnava-dasnrs.wixsite.com/page-of-vaishnava"
													>
														<Translate>
															{({ translate }) =>
																translate('FOOTER.vaishnava_dasa')
															}
														</Translate>
													</a>
												</li>
												<li>
													<a
														style={{ color: 'white' }}
														href="http://forum.niranjanaswami.com/"
													>
														<Translate>
															{({ translate }) => translate('FOOTER.forum')}
														</Translate>
													</a>
												</li>
												<li>
													<a
														style={{ color: 'white' }}
														href="https://fileshare.niranjanaswami.net/?key=3662d52d8035628a76fdac5f2366e26a567"
													>
														<Translate>
															{({ translate }) =>
																translate('FOOTER.file_share')
															}
														</Translate>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<div className="col-md-7 col-lg-4">
									<h4 className="footer_h4_menu">
										<Translate>
											{({ translate }) => translate('HOME.menu')}
										</Translate>
									</h4>

									<div className="row row-20">
										<div className="col-6 col-sm-3 col-4">
											<ul className="list ">
												<li>
													<Link to="/audio" style={{ color: 'white' }}>
														<Translate>
															{({ translate }) => translate('HOME.audio')}
														</Translate>
													</Link>
												</li>
												<li>
													<Link to="/video" style={{ color: 'white' }}>
														<Translate>
															{({ translate }) => translate('HOME.video')}
														</Translate>
													</Link>
												</li>
												<li>
													<Link to="/blog" style={{ color: 'white' }}>
														<Translate>
															{({ translate }) => translate('HOME.blog')}
														</Translate>
													</Link>
												</li>
												<li>
													<Link to="/transcriptions" style={{ color: 'white' }}>
														<Translate style={{ color: 'white' }}>
															{({ translate }) =>
																translate('HOME.Transcriptions')
															}
														</Translate>
													</Link>
												</li>
												<li>
													<Link to="/summaries" style={{ color: 'white' }}>
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
									<h4 style={{ color: 'white' }}>
										<Translate>
											{({ translate }) =>
												translate('FOOTER.contact_information')
											}
										</Translate>
									</h4>

									<ul className="list-sm">
										<li className="object-inline" style={{ fontSize: '20px' }}>
											<a style={{ color: 'white' }} href="#">
												<Icon type="facebook" /> &nbsp;
											</a>
											<a style={{ color: 'white' }} href="#">
												<Icon type="instagram" /> &nbsp;
											</a>
											<a style={{ color: 'white' }} href="#">
												<Icon type="twitter" />
											</a>
										</li>
										<li>
											<a style={{ color: 'white' }} href="#">
												1683 Main Street, East Hartford, CT 06108
											</a>
										</li>
										<li className="object-inline">
											<a style={{ color: 'white' }} href="mailto:#">
												dgd@niranjanaswami.net
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div style={{ marginBottom: '26px' }}>
						<div className="footer-container">
							<hr style={{ width: '60%' }} />
							<p className="rights footer_rights">
								<span>
									<img
										className="footer_lg_img"
										src="https://ik.imagekit.io/gcwjdmqwwznjl/SWAMI2_s6R_72Bx0.svg"
										alt="Niranjana Swami"
									/>
									<span>&nbsp;</span>
									<span style={{ fontSize: '12px' }}>&copy;&nbsp;</span>

									<Translate>
										{({ translate }) => translate('FOOTER.copy_rights')}
									</Translate>
								</span>
							</p>
						</div>
					</div>
				</footer>
			);
		} else {
			return (
				<footer
					className="section footer-linked foot-small"
					style={{ height: '200px' }}
				>
					<div className="row-small">
						<div className="col-4">
							<h4 className="footer_h4_sm">
								<Translate>
									{({ translate }) => translate('FOOTER.quick_links')}
								</Translate>
							</h4>
							<div className="row">
								<div className="col-6 col-sm-6">
									<ul className="list " style={{ color: 'white' }}>
										<li>
											<Link to="/contact" style={{ color: 'white' }}>
												<Translate>
													{({ translate }) => translate('HOME.contacts')}
												</Translate>
											</Link>
										</li>
										<li>
											<a
												style={{ color: 'white' }}
												href="https://vaishnava-dasnrs.wixsite.com/page-of-vaishnava"
											>
												<Translate>
													{({ translate }) =>
														translate('FOOTER.vaishnava_dasa')
													}
												</Translate>
											</a>
										</li>
										<li>
											<a
												style={{ color: 'white' }}
												href="http://forum.niranjanaswami.com/"
											>
												<Translate>
													{({ translate }) => translate('FOOTER.forum')}
												</Translate>
											</a>
										</li>
										<li>
											<a
												style={{ color: 'white' }}
												href="https://fileshare.niranjanaswami.net/?key=3662d52d8035628a76fdac5f2366e26a567"
											>
												<Translate>
													{({ translate }) => translate('FOOTER.file_share')}
												</Translate>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-7 col-lg-4">
							<h4
								style={{
									color: 'white',
									paddingBottom: '10px',
									fontSize: '3vw',
								}}
							>
								<Translate>
									{({ translate }) => translate('HOME.menu')}
								</Translate>
							</h4>

							<div className="row row-20">
								<div className="col-6 col-sm-3 col-4">
									<ul className="list ">
										<li>
											<Link to="/audio" style={{ color: 'white' }}>
												<Translate>
													{({ translate }) => translate('HOME.audio')}
												</Translate>
											</Link>
										</li>
										<li>
											<Link to="/video" style={{ color: 'white' }}>
												<Translate>
													{({ translate }) => translate('HOME.video')}
												</Translate>
											</Link>
										</li>
										<li>
											<Link to="/blog" style={{ color: 'white' }}>
												<Translate>
													{({ translate }) => translate('HOME.blog')}
												</Translate>
											</Link>
										</li>
										<li>
											<Link to="/transcriptions" style={{ color: 'white' }}>
												<Translate style={{ color: 'white' }}>
													{({ translate }) => translate('HOME.Transcriptions')}
												</Translate>
											</Link>
										</li>
										<li>
											<Link to="/summaries" style={{ color: 'white' }}>
												<Translate>
													{({ translate }) => translate('HOME.Summaries')}
												</Translate>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-7 col-lg-4" style={{ paddingTop: '20px' }}>
							<h4
								style={{ marginTop: '-20px', fontSize: '3vw', color: 'white' }}
							>
								<Translate>
									{({ translate }) => translate('FOOTER.contact_information')}
								</Translate>
							</h4>

							<ul className="list-sm">
								<li className="object-inline" style={{ fontSize: '20px' }}>
									<a style={{ color: 'white' }} href="#">
										<Icon type="facebook" /> &nbsp;
									</a>
									<a style={{ color: 'white' }} href="#">
										<Icon type="instagram" /> &nbsp;
									</a>
									<a style={{ color: 'white' }} href="#">
										<Icon type="twitter" />
									</a>
								</li>
								<li>
									<a style={{ color: 'white' }} href="#">
										1683 Main Street, East Hartford, CT 06108
									</a>
								</li>
								<li className="object-inline">
									<a style={{ color: 'white' }} href="mailto:#">
										dgd@niranjanaswami.net
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div style={{ marginBottom: '26px' }}>
						<div className="footer_div">
							<hr style={{ width: '60%' }} />
							<p
								style={{ color: 'white', textAlign: 'center' }}
								className="rights"
							>
								<span>
									<img
										className="footer_sm_img"
										src="https://ik.imagekit.io/gcwjdmqwwznjl/SWAMI2_s6R_72Bx0.svg"
									/>
									<span>&nbsp;</span>
									<span style={{ fontSize: '6px' }}>&copy;&nbsp;</span>
									<Translate>
										{({ translate }) => translate('FOOTER.copy_rights')}
									</Translate>
								</span>
							</p>
						</div>
					</div>
				</footer>
			);
		}
	}
}

export default Footer;
