import React from 'react';
import renderHTML from 'react-render-html';
import {
    Link
} from 'react-router-dom';
import reactCookie from 'react-cookies';

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
            <article className="post-modern wow slideInLeft"><a className="post-modern-media" href="single-blog-post.html"><img src={props.img} alt="" width="571" height="353" /></a>
                <h4 className="post-modern-title">{reactCookie.load('languageCode') === 'en' ? props.title_en : props.title_ru}</h4>
                {renderHTML(showing100Characters(reactCookie.load('languageCode') === 'en' ? props.content_en : props.content_ru))}
                <Link className="button-winona post-modern-title" to={{ pathname: '/biograhyDetails', state: props }}>Read More...</Link>

            </article>
        </div>
    );
}

export default SingleBiography;