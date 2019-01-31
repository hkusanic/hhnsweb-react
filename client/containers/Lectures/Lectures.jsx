import React, { Component } from 'react';
import axios from 'axios';
import SingleLecture from '../../Components/molocules/SingleLecture/SingleLecture';

export class Lectures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lectures: []
        }
    }
    componentDidMount() {
        const API_URL = 'http://localhost:3000/api/lecture/';
        const request = axios.get(API_URL);
        request.then((response) => {
            this.setState({
                lectures: response.data.lecture
            })
        })
            .catch((err) => {
                console.log("error occured", err);
            })
    }
    render() {
        return (
            <div>
                <section className="section section-lg">
                    <div className="container">
                        <div className="row row-50 row-xxl-70">
                            {this.state.lectures.map((item, key) => {
                                return <SingleLecture lecture={item} key={key} />
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

export default Lectures;