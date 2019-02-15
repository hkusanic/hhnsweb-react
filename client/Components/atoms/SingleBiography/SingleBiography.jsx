import React from 'react';
import renderHTML from 'react-render-html';
import {
    Link
} from 'react-router-dom';
import reactCookie from 'react-cookies';

function showing100Characters (sentence) {
    var result = sentence;
    var resultArray = result.split(' ');
    if (resultArray.length > 10) {
        resultArray = resultArray.slice(0, 30);
        result = resultArray.join(' ');
    }
    return result;
}


const SingleBiography = (props) => {
    console.log('----->',props);
    return  <div class="col-md-6 wow-outer">
    <article class="post-modern wow slideInLeft"><a class="post-modern-media" href="single-blog-post.html"><img src={props.img} alt="" width="571" height="353"/></a>
      <h4 class="post-modern-title">{reactCookie.load('languageCode') === 'en'?props.title_en:props.title_ru}</h4>
         {renderHTML(showing100Characters(reactCookie.load('languageCode') === 'en'?props.content_en : props.content_ru))}
         <Link to={{ pathname: '/biograhyDetails', state:props }}><a class="button-winona post-modern-title" href="single-blog-post.html">Read More...</a></Link>
     
    </article>
  </div>
}

export default SingleBiography;