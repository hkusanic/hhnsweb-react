import React, { Component } from 'react';
import SingleBiography from '../../atoms/SingleBiography/SingleBiography';
import image4 from './../../../assets/images/3(1).png';
import * as DATA from '../../../constants/biographies';

export class Biography extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <section className="section section-lg text-center">
        <div className="container">
          <div className="row row-50">
            <SingleBiography img={image4} title_en={DATA.BIOGRAPHY.one_title_en} title_ru={DATA.BIOGRAPHY.one_title_ru} content_en={DATA.BIOGRAPHY.one_content_en} content_ru={DATA.BIOGRAPHY.one_content_ru} />
            <SingleBiography img={image4} title_en={DATA.BIOGRAPHY.two_title_en} title_ru={DATA.BIOGRAPHY.two_title_ru} content_en={DATA.BIOGRAPHY.two_content_en} content_ru={DATA.BIOGRAPHY.two_content_ru} />
          </div>
        </div>
      </section>
    );
  }
}

export default Biography;