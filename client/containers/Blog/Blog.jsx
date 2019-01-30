import React, { Component } from 'react';
import SingleBlog from '../../Components/molocules/SingleBlog/SIngleBlog';
export class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div> 
                <section className="section section-lg">
                    <div className="container">
                        <div className="row row-50 row-xxl-70">
                            <SingleBlog />
                            <SingleBlog />
                            <SingleBlog />
                            <SingleBlog />
                            <SingleBlog />
                        </div>
                        <div className="pagination">
                            <div className="page-item active"><a className="page-link button-winona" href="#">1</a></div>
                            <div className="page-item"><a className="page-link button-winona" href="#">2</a></div>
                            <div className="page-item"><a className="page-link button-winona" href="#">3</a></div>
                            <div className="page-item"><a className="page-link button-winona" href="#">4</a></div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Blogs;