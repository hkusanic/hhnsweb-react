import React, { Component } from 'react';
import script from "../../assets/script.js"
import Navigation from '../../Components/molocules/navigation/Navigation';
import Carousel from '../../Components/molocules/carousels/Carousel';
import Footer from '../../Components/molocules/Footer/Footer';
import Blog from '../../containers/Blog/Blog';
import Calender from '../../containers/Calender/Calender';
import Lectures from '../../containers/Lectures/Lectures';
import Booking from '../../containers/Booking/Booking';
import BlogDetails from '../../Components/molocules/SingleBlog/BlogDetails';
import LectureDetails from '../../Components/molocules/SingleLecture/LectureDetails';

import {
    Route,
    Switch
} from 'react-router-dom'


export class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        script();
    }
    render() {
        return (
            <div>
                <div className="page">
                    <Navigation />
                    <div style={{ height: '600px', width: '100%', overflow: 'scroll' }}>
                        <Switch>
                            <Route exact path='/' component={Carousel} />
                            <Route path='/blog' component={Blog} />
                            <Route path='/booking' component={Booking} />
                            <Route path='/calender' component={Calender} />
                            <Route path='/lectures' component={Lectures} />
                            <Route path='/blogDetails' component={BlogDetails} />
                            <Route path='/lectureDetails' component={LectureDetails} />
                        </Switch>
                    </div>
                    <Footer />

                </div>
                <div className="preloader">
                    <div className="preloader-logo"><img src="images/logo-default-256x50.png" alt="" width="256" height="50" srcSet="images/logo-default-512x100.png 2x" />
                    </div>
                    <div className="preloader-body">
                        <div id="loadingProgressG">
                            <div className="loadingProgressG" id="loadingProgressG_1"></div>
                        </div>
                    </div>
                </div>

                <div className="snackbars" id="form-output-global"></div>
            </div>
        )
    }
}

export default Home;
