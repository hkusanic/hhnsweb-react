import React, { Component } from 'react';
import SingleBlog from '../../Components/molocules/SingleBlog/SIngleBlog';
import axios from 'axios';

export class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs : []
        }
    }

    componentDidMount(){
        const API_URL = 'http://localhost:3000/api/blog/';
        const request = axios.get(API_URL);
        request.then((response)=> {
            this.setState({
                blogs: response.data.blog
            })
        })
        .catch((err)=> {
            console.log("error occured ======>>>>>", err);
        })
    }

    render() {
        return (
            <div> 
                <section className="section section-lg">
                    <div className="container">
                        <div className="row row-50 row-xxl-70">
                            {this.state.blogs.map((item, key) =>{
                                return <SingleBlog blog={item} key={key} />
                            })}
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