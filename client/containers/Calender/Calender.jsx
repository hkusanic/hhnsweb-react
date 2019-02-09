import React, {Component} from 'react';
import * as DATA from '../../constants/credentials';
export class Calender extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        let srcGoogle = 'https://calendar.google.com/calendar/embed?src=' + DATA.GOOGLE_CREDENTIALS.USER + '%40' + DATA.GOOGLE_CREDENTIALS.EMAIL_DOMAIN + '&ctz=Asia%2FKolkata';
        return (
            <div>
                <div className="align">
                    <iframe src={srcGoogle}
                    style={{frameBorder:"0", Scrolling:"no"}}
                    className="calenderStyle">
                    </iframe>
                </div>
            </div>
        )
    }
} 

export default Calender;