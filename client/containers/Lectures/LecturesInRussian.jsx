import React, { Component } from "react";
import { connect } from "react-redux";
import { getRussianDubbedLecture } from "../../actions/lectureActions"
import { Link } from 'react-router-dom'

class RussiaDubbedLectures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lecture: []
        };
    }

    componentDidMount() {
        this.setState({
            lecture: this.props.lectureDetails.lecture
        });
        this.props.getRussianDubbedLecture({ page: 1, translation: "Russian dubbed" })
    }


    render() {
        return (
            <div>
                {this.props.lectureDetails &&
                    this.props.lectureDetails.lectures &&
                    this.props.lectureDetails.lectures.map(eachLecture => {
                        return <div >
                            <Link key={eachLecture.id} to={`/${eachLecture.author}/${eachLecture.en.topic}`} >{`New**     ${eachLecture.en.topic}`}</Link>
                            <p key={eachLecture.id}>{`Posted On     ${(new Date(eachLecture.created_date)).toLocaleString("en-GB")}`}</p>
                        </div>
                    })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lectureDetails: state.lectureReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRussianDubbedLecture: page => {
            dispatch(getRussianDubbedLecture(page));
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RussiaDubbedLectures);
