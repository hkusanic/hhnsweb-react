import React, { Component } from "react";
import { Translate } from "react-localize-redux";
import Auth from "../../../utils/Auth";
import reactCookie from "react-cookies";
// import ReCAPTCHA from "react-google-recaptcha";
import { Form, Input, Button, Radio, Select, DatePicker } from "antd";
import { Steps } from "antd";
import BasicProfile from './BasicProfile';
import DiscipleProfile from './DiscipleProfile';

const { Step } = Steps;

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            isUserLogin: false,
            stepIndex: 0,
            language: "",
            selectedOption: "",
            isDiscipleSelected: false
        };
    }
    componentDidMount() {
        $(".register-modal-2").addClass("active");

        const user = Auth.getUserDetails();
        if (user) this.setState({ user: JSON.parse(user) });
    }

    handleLanguage = language => {
        this.setState({
            language
        });
    };

    handleNext() {
        const { stepIndex } = this.state;
        this.setState({ stepIndex: stepIndex + 1 });
    }

    handlePrev() {
        const { stepIndex } = this.state;
        this.setState({ stepIndex: stepIndex - 1 });
    }

    changeStep = () => {
        this.setState({
            stepIndex: 2
        });
    };

    handleOptionChange = event => {
        const option = event.target.value;

        this.setState({
            selectedOption: option,
            isDiscipleSelected: true
        });
    };

    handleNoDisciple = event => {
        const option = event.target.value;

        this.setState({
            selectedOption: option,
            isDiscipleSelected: false
        });
    }

    registrationInstruction = () => {
        if (reactCookie.load("languageCode") === "en") {
            //     return (
            //         <div>
            //             <p><b>In order to request a meeting please follow the instructions below.</b></p>
            //             <p align="justify">1) Create a profile by clicking on Registration in the menu bar. <b>You must fill out the registration form completely, including a phone number where you can receive text messages.</b></p>
            //             <p align="justify">2) Request a meeting by clicking on Booking in the menu bar. You must fill out any information that does not autofill from your profile.</p>
            //             <p align="justify">3) Once your request has been approved, you will receive a confirmation email. You can follow the URL in the email to log in to the booking website. Click on Booking in the menu bar to pick a time slot. <b>You must use the same email address as in your profile.</b></p>
            //             <p>4) Once you have requested a time slot you will get a confirmation email.</p>
            //         </div>
            //     );
            // } else {
            //     return (
            //         <div>
            //             <p><b>Чтобы запросить встречу, пожалуйста, следуйте инструкциям ниже.</b></p>
            //             <p align="justify">1) Создайте профиль, нажав «РЕГИСТРАЦИЯ» в строке меню. <b>Вы должны полностью заполнить регистрационную форму, включая номер телефона, по которому вы можете получать текстовые сообщения.</b></p>
            //             <p align="justify">2) Запросить встречу, нажав на Бронирование в строке меню. Вы должны заполнить любую информацию, которая не заполняется автоматически из вашего профиля.</p>
            //             <p align="justify">3) Как только ваш запрос будет одобрен, вы получите подтверждение по электронной почте. Вы можете перейти по URL в электронном письме, чтобы войти на сайт бронирования. Нажмите на «ЗАПИСЬ» в строке меню, чтобы выбрать временной интервал. <b>Вы должны использовать тот же адрес электронной почты, что и в вашем профиле.</b></p>
            //             <p>4) Как только вы запросите временной интервал, вы получите подтверждение по электронной почте.</p>
            //         </div>
            //     );
        }
    };

    render() {
        const { stepIndex, language } = this.state;
        const steps = [
            {
                layout: "inline",
                title: "Normal Details",
                content: <BasicProfile />
            },
            {
                title: "Disciple Details",
                content: (
                    <div
                        style={{
                            width: "980px",
                            marginLeft: "122px",
                            paddingTop: "40px",
                            textAlign:'center'
                        }}
                    >
                        <p style={{paddingBottom: "10px", justifyContent:'center'}}>Are you Niranjana Swami Disciple ?</p>
                        <div style={{justifyContent:'center', paddingBottom: '20px'}}>
                            <input
                                type="radio"
                                value="Disciple"
                                name="select"
                                style={{marginRight:'10px',marginLeft:'40px',paddingTop:'30px',marginTop:'6px'}}
                                onChange={e => {
                                    this.handleOptionChange(e);
                                }}
                                checked={this.state.selectedOption === "Disciple"}
                            />
                            Disciple
                            <input
                                type="radio"
                                value="Aspiring_Disciple"
                                name="select"
                                style={{marginRight:'10px',marginLeft:'40px',paddingTop:'30px',marginTop:'6px'}}
                                onChange={e => {
                                    this.handleOptionChange(e);
                                }}
                                checked={this.state.selectedOption === "Aspiring_Disciple"}
                            />
                            Aspiring_Disciple
                            <input
                                type="radio"
                                value="No"
                                name="select"
                                style={{marginRight:'10px',marginLeft:'40px',paddingTop:'30px',marginTop:'6px'}}
                                onClick={e => {
                                    this.handleNoDisciple(e);
                                }}
                            />
                            No
                        </div>
                        {this.state.isDiscipleSelected ? (
                            <div><DiscipleProfile /></div>
                        ) : null}
                    </div>
                )
            },
            {
                title: "Verifcation",
                content: (
                    <div style={{ marginLeft: "350px", marginTop: "20px" }}>
                        {/* <ReCAPTCHA
                            size="normal"
                            sitekey="6Le5zKgUAAAAAI0yFeZrW3zQJ9suZZnBzRXTkQCZ"
                        /> */}
                    </div>
                )
            }
        ];

        return (
            <div>
                <section className="bg-gray-100">
                    <img
                        className="img-banner-width"
                        src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v3_HJGhLISIV.png"
                    />
                    <div style={{ textAlign: "center" }}>
                        <p className="bookingForm">
                            <Translate>
                                {({ translate }) => translate("HOME.Register")}
                            </Translate>
                        </p>
                        {this.state.user ? (
                            <div style={{ paddingBottom: "2em" }}>
                                <p>
                                    <Translate>
                                        {({ translate }) => translate("REGISTER_FORM.hare_krishna")}
                                    </Translate>{" "}
                                    <b>
                                        {this.state.user.firstName} {this.state.user.last}
                                    </b>
                                    , &nbsp;
                                    <Translate>
                                        {({ translate }) =>
                                            translate("REGISTER_FORM.registation_msg")
                                        }
                                    </Translate>
                                </p>
                            </div>
                        ) : (
                            <div className="container regist-Text">
                                {this.registrationInstruction()}
                            </div>
                        )}
                    </div>  
                    <Steps
                        progressDot
                        current={stepIndex}
                        style={{ width: "60%", marginLeft: "10px" }}
                    >
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div
                        style={{
                            marginTop: "16px",
                            border: "1px dashed #e9e9e9",
                            borderRadius: "6px",
                            backgroundColor: "#fafafa",
                            minHeight: "150px",
                            textAlign: "center",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            margin: "20px 60px"
                        }}
                    >
                        {steps[stepIndex].content}
                    </div>

                    <div style={{ display: "flex" }}>
                        <Button
                            type="primary"
                            disabled={stepIndex === 0}
                            onClick={() => this.handlePrev()}
                            style={{
                                marginLeft: "480px",
                                marginBottom: "15px"
                            }}
                        >
                            Back
                        </Button>

                        <Button
                            type="primary"
                            disabled={stepIndex === 2}
                            onClick={() => this.handleNext()}
                            style={{ marginLeft: "30px", marginBottom: "15px" }}
                        >
                            Next
                            {/* {stepIndex === 2 ? "Finish" : "Next"} */}
                        </Button>
                    </div>
                </section>
            </div>
        );
    }
}

export default Registration;