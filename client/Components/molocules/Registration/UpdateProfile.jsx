import React, { Component } from "react";
import Auth from "../../../utils/Auth";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { Steps } from "antd";
import BasicProfile from './BasicProfile';
import DiscipleProfile from './DiscipleProfile';
import utils from '../../../utils/api/user';
const { Step } = Steps;

export class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            isUserLogin: false,
            stepIndex: 0,
            language: "",
            selectedOption: "",
            isDiscipleSelected: false,
            userDetails: {},
        };
    }

    componentDidMount() {
        $(".register-modal-2").addClass("active");

        const user = Auth.getUserDetails();
        if (user) this.setState({ user: JSON.parse(user) }, () => {
            const { user } = this.state;
            const body = {
                user_id: user.user_id
            }
            utils.getUserDetails(body).then(res => {
                this.setState({
                    userDetails: res.data.userDetails,
                    selectedOption: res.data.userDetails.disciple
                })
            })
        });
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

    renderRegistrationupdateForm = () => {
        const { selectedOption, userDetails } = this.state;
        if (selectedOption !== 'Disciple' ) {
            return [
                {
                    layout: "inline",
                    title: "Normal Details",
                    content: <BasicProfile userDetails={userDetails} />
                },
                {
                    title: "Disciple Details",
                    content: <DiscipleProfile />
                },
                {
                    title: "Verifcation",
                    content: (
                        <div style={{ marginLeft: "350px", marginTop: "20px" }}>
                            <ReCAPTCHA
                                size="normal"
                                sitekey="6Le5zKgUAAAAAI0yFeZrW3zQJ9suZZnBzRXTkQCZ"
                            />
                        </div>
                    )
                }
            ];
        } else {
            return [
                {
                    layout: "inline",
                    title: "Normal Details",
                    content: <BasicProfile userDetails={userDetails} />
                },
                {
                    title: "Verifcation",
                    content: (
                        <div style={{ marginLeft: "350px", marginTop: "20px" }}>
                            <ReCAPTCHA
                                size="normal"
                                sitekey="6Le5zKgUAAAAAI0yFeZrW3zQJ9suZZnBzRXTkQCZ"
                            />
                        </div>
                    )
                }
            ];
        }

    }

    render() {
        const { stepIndex } = this.state;
        const steps = this.renderRegistrationupdateForm();

        return (
            <div>
                <section className="bg-gray-100">
                    <img
                        className="img-banner-width"
                        src="https://ik.imagekit.io/gcwjdmqwwznjl/Booking_v3_HJGhLISIV.png"
                    /> 
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

export default UpdateProfile;