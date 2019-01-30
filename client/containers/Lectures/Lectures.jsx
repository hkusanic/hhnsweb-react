import React, {Component} from 'react';
import LatestLecture from  '../../Components/molocules/LatestLecture/LatestLecture';

export class Lectures extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <LatestLecture />
            </div>
        )
    }
} 

export default Lectures;