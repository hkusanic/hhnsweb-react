
import { Modal, Button, OverlayTrigger } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from "react-redux";
import {loginUser,logoutUser, checkLogin} from '../../actions/loginActions';
// import 'antd/dist/antd.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount(){
    console.log("this.props=======>>>>>", this.props);
  }
  
  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <div className="modal " id="modalLoginForm" style={{ height: '500px' }} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
          aria-hidden="false">
          <div className="modal-dialog" role="document" >
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Log in</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <div className="md-form mb-5">
                  <i className="fas fa-envelope prefix grey-text"></i>
                  <input type="email" id="defaultForm-email" className="form-control validate" />
                  <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Your email</label>
                </div>

                <div className="md-form mb-4">
                  <i className="fas fa-lock prefix grey-text"></i>
                  <input type="password" id="defaultForm-pass" className="form-control validate" />
                  <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Your password</label>
                </div>

              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-default">Login</button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href="" className="btn-default" data-toggle="modal" data-target="#modalLoginForm">
            Login</a>
        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.loginReducer,
  };
};

const mapDispatchToProps= (dispatch) => {
	return{
		loginUser: (userDetails) => {
			dispatch(loginUser(userDetails));
		},
		logoutUser: () => {
			dispatch(logoutUser());
		},
		checkLogin: () => {
			dispatch(checkLogin())
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);