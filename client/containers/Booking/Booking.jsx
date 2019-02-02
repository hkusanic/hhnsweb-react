import React, { Component } from 'react';
import banner from '../../assets/images/booking_banner.jpg';
export class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div>
                    <section className="breadcrumbs-custom bg-image context-dark" style={{ backgroundImage: "url(" + banner + ")" }}>
                        <div className="breadcrumbs-custom-inner">
                            <div className="container breadcrumbs-custom-container">
                            </div>
                        </div>
                    </section>
                </div>
                <iframe
                    src="https://niranjanaswami.youcanbook.me/?noframe=true&skipHeaderFooter=true"
                    id="ycbmiframeniranjanaswami"
                    className="bookingStyle"
                    frameBorder="0"
                    allowtransparency="true">
                </iframe>
            </div>
        )
    }
}

export default Booking;