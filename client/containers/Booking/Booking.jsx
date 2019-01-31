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
                    style={{font: '400 14px/20px "Oswald", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', letterSpacing: '.08em',
                    textTransform: 'uppercase', width: '100%', height: '1000px', border: '0px', backgroundColor: 'transparent' }}
                    frameBorder="0"
                    allowtransparency="true">

                </iframe>
            </div>
        )
    }
}

export default Booking;