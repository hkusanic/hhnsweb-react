import React from 'react';
import renderHTML from 'react-render-html';
import {
    Link
} from 'react-router-dom';
import reactCookie from 'react-cookies';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function showing100Characters(sentence) {
    var result = sentence;
    var resultArray = result.split(' ');
    if (resultArray.length > 10) {
        resultArray = resultArray.slice(0, 30);
        result = resultArray.join(' ');
    }
    return result;
}


const SingleBiography = (props) => {
    return (
        <div className="col-md-6 wow-outer">
            <article className="post-modern wow slideInLeft">
                <Link className="post-modern-media" to={{ pathname: '/biograhyDetails', state: props }}>
                <Image cloudName="dinagauranga" publicId={props.img} dpr="auto"
                                         dpr="auto"
                                         responsive
                                         width="auto"
                                         crop="scale"
                                    
                                     >
                                   <Transformation quality="auto" fetchFormat="auto" />
                                  </Image>
                </Link>
                <h4 className="post-modern-title">{reactCookie.load('languageCode') === 'en' ? props.title_en : props.title_ru}</h4>
                {renderHTML(showing100Characters(reactCookie.load('languageCode') === 'en' ? props.content_en : props.content_ru))}
                <Link className="button-winona post-modern-title" to={{ pathname: '/biograhyDetails', state: props }}>Read More...</Link>

            </article>
        </div>
    );
}

export default SingleBiography;