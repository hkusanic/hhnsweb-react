import React, {Component} from 'react';

export class Calender extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div style={{textAlign: 'center'}}>
                    <iframe src="https://calendar.google.com/calendar/embed?title=Calender&amp;height=600&amp;wkst=1&amp;hl=en&amp;bgcolor=%23ff9900&amp;src=cronj.com_eas7lttbn6qff3sd509bk7le6o%40group.calendar.google.com&amp;color=%23333333&amp;ctz=Asia%2FKolkata" style={{borderWidth: '0', width: "800px", height: "600px", frameBorder:"0", Scrolling:"no"}}>
                    </iframe>
                </div>
            </div>
        )
    }
} 

export default Calender;