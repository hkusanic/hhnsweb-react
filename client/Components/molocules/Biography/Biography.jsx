import React, { Component } from 'react';
import SingleBiography from '../../atoms/SingleBiography/SingleBiography';
import image4 from './../../../assets/images/3(1).png';
import image5 from './../../../assets/images/IMG_2735.jpg';
import * as DATA from '../../../constants/biographies';
import reactCookie from 'react-cookies';

export class Biography extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
       
    }
    render() {
        return (
            <section class="section section-lg text-center">
            <div class="container">
              <div class="row row-50">
              <SingleBiography img={image4} title={reactCookie.load('languageCode') === 'en'?DATA.BIOGRAPHY.one_title_en:DATA.BIOGRAPHY.one_title_ru} content={reactCookie.load('languageCode') === 'en'?DATA.BIOGRAPHY.one_content_en:DATA.BIOGRAPHY.one_content_ru}  />
              <SingleBiography img={image4} title={reactCookie.load('languageCode') === 'en'?DATA.BIOGRAPHY.two_title_en:DATA.BIOGRAPHY.two_title_ru} content={reactCookie.load('languageCode') === 'en'?DATA.BIOGRAPHY.two_content_en:DATA.BIOGRAPHY.two_content_ru} />
              </div>
              </div>
            </section>
        );
    }
}

export default Biography;