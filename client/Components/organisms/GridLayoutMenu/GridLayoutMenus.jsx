import React from 'react';
import SingleGridMenu from '../../atoms/SingleGirdMenu/SingleGridMenu';
import Auth from '../../../utils/Auth';
export class GridLayoutMenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogin: true,
        }
    }
    componentDidMount(){
        const isUserLogin = Auth.isUserAuthenticated();
        this.setState({isUserLogin})
    }

    handleNavigationClick = () => {
        $('.login-modal-2').removeClass('active');
        $('.register-modal-2').removeClass('active');
        if (this.state.isUserLogin) {
            $('.login-modal-2').addClass('active');
            $('.rd-navbar-toggle').removeClass('active');
            $('.rd-navbar-nav-wrap').removeClass('active');
        }
    }

    render() {
        return (
            <div>
                <section class="section-lg text-center bg-gray-100">
                    <div class="container">
                        <div class="row row-50 row-lg-70 offset-top-2">
                            <SingleGridMenu image='images/tour-1-270x200.jpg' menu="Gallery" link="/gallery" />
                            <SingleGridMenu image='images/tour-2-270x200.jpg' menu="Photos" link="/photos" />
                            <SingleGridMenu image='images/tour-3-270x200.jpg' menu="Books" link="/contact" />
                            <SingleGridMenu handleNavigationClick={this.handleNavigationClick} image='images/tour-4-270x200.jpg' menu="Lectures" link="/lectures" />
                            <SingleGridMenu handleNavigationClick={this.handleNavigationClick} image='images/tour-5-270x200.jpg' menu="Audio" link="/audio" />
                            <SingleGridMenu handleNavigationClick={this.handleNavigationClick} image='images/tour-6-270x200.jpg' menu="Video" link="/video" />
                            <SingleGridMenu handleNavigationClick={this.handleNavigationClick} image='images/tour-7-270x200.jpg' menu="Transcriptions" link="/transcriptions" />
                            <SingleGridMenu handleNavigationClick={this.handleNavigationClick} image='images/tour-8-270x200.jpg' menu="Summaries" link="/summaries" />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default GridLayoutMenus;