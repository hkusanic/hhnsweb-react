import React from 'react';
import renderHTML from 'react-render-html';
import {
    Link
} from 'react-router-dom'

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
    return  <div class="col-md-6 wow-outer">
    <article class="post-modern wow slideInLeft"><a class="post-modern-media" href="single-blog-post.html"><img src={props.img} alt="" width="571" height="353"/></a>
      <h4 class="post-modern-title">{props.title}</h4>
         {renderHTML(showing100Characters(props.content ? props.content : ''))}
         <Link to={{ pathname: '/biograhyDetails', state:props }}><a class="button-winona post-modern-title" href="single-blog-post.html">Read More...</a></Link>
     
    </article>
  </div>
}

export default SingleBiography;