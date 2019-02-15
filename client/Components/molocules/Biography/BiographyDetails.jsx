import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import reactCookie from 'react-cookies';

export class BiographyDetails extends Component {
    constructor(props) {
        super(props);
        console.log('---->',props);
    }

    render() {
        if (!this.props.location.state) {
            return <div>Error Occured..........</div>
        }
        return (
            <div>
                <section class="section section-lg">
                    <div class="container padLeftBlog">
                        <div class="row row-50">
                            <div class="col-lg-12">
                                <article class="post-creative">
                                    <h3 class="post-creative-title alignment padLeft">
                                        {renderHTML(reactCookie.load('languageCode') === 'en'?this.props.location.state.title_en:this.props.location.state.title_ru)}
                                    </h3>
                                    {renderHTML(reactCookie.load('languageCode') === 'en'?this.props.location.state.content_en:this.props.location.state.content_ru)}
                                </article>
                            </div>
                            <div class="col-lg-4">
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default BiographyDetails;

