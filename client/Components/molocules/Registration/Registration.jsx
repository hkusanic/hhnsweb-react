import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import Auth from '../../../utils/Auth';
import reactCookie from 'react-cookies';

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            isUserLogin: false
        }
    }
    componentDidMount() {
        $('.register-modal-2').addClass('active');

        const user = Auth.getUserDetails();
        if (user)
            this.setState({ user: JSON.parse(user) });

    }

    registrationInstruction = () => {
        if (reactCookie.load('languageCode') === 'en') {
            return (
                <div>
                    <p><b>In order to request a meeting please follow the instructions below.</b></p>
                    <p align="justify">1) Create a profile by clicking on Registration in the menu bar. <b>You must fill out the registration form completely, including a phone number where you can receive text messages.</b></p>
                    <p align="justify">2) Request a meeting by clicking on Booking in the menu bar. You must fill out any information that does not autofill from your profile.</p>
                    <p align="justify">3) Once your request has been approved, you will receive a confirmation email. You can follow the URL in the email to log in to the booking website. Click on Booking in the menu bar to pick a time slot. <b>You must use the same email address as in your profile.</b></p>
                    <p>4) Once you have requested a time slot you will get a confirmation email.</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p><b>Чтобы запросить встречу, пожалуйста, следуйте инструкциям ниже.</b></p>
                    <p align="justify">1) Создайте профиль, нажав «РЕГИСТРАЦИЯ» в строке меню. <b>Вы должны полностью заполнить регистрационную форму, включая номер телефона, по которому вы можете получать текстовые сообщения.</b></p>
                    <p align="justify">2) Запросить встречу, нажав на Бронирование в строке меню. Вы должны заполнить любую информацию, которая не заполняется автоматически из вашего профиля.</p>
                    <p align="justify">3) Как только ваш запрос будет одобрен, вы получите подтверждение по электронной почте. Вы можете перейти по URL в электронном письме, чтобы войти на сайт бронирования. Нажмите на «ЗАПИСЬ» в строке меню, чтобы выбрать временной интервал. <b>Вы должны использовать тот же адрес электронной почты, что и в вашем профиле.</b></p>
                    <p>4) Как только вы запросите временной интервал, вы получите подтверждение по электронной почте.</p>
                </div>
            );
        }
    }

    render() {

        return (
            <div>
                <section className="bg-gray-100">
                    <img className="img-banner-width" src='https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v3_HJGhLISIV.png' />
                    <div style={{ textAlign: 'center' }}>
                        <p className="bookingForm">
                            <Translate>{({ translate }) => translate('HOME.Register')}</Translate>
                        </p>
                        {this.state.user ?
                            <div style={{ paddingBottom: '2em' }}>
                                <p><Translate>{({ translate }) => translate('REGISTER_FORM.hare_krishna')}</Translate> <b>{this.state.user.firstName} {this.state.user.last}</b>,
                        &nbsp;<Translate>{({ translate }) => translate('REGISTER_FORM.registation_msg')}</Translate></p>
                            </div> :
                            <div className="regist-Text">
                                {this.registrationInstruction()}
                            </div>}
                    </div>
                </section>
            </div>
        )
    }
}

export default Registration;
