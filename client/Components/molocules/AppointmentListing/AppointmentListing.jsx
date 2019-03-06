import React from 'react';
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { getUserList, getAppointmentList, resetState, updateAppointment } from '../../../actions/appointmentListAction';


export class AppointmentListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalList: []
        }
    }
    componentDidMount() {
        this.props.resetState();
        this.props.getUserList();
        this.props.getAppointmentList();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.appointmentList.isUpdated && nextProps.appointmentList.isUpdated) {
            this.componentDidMount();
        }
        this.makeFinalArray(nextProps.appointmentList.userList, nextProps.appointmentList.appointmentList);

    }

    makeFinalArray = (user, appointment) => {
        let finalArray = []
        for (let i = 0; i < appointment.length; i++) {
            for (let j = 0; j < user.length; j++) {
                if (appointment[i]['email'] === user[j]['email']) {
                    let item = {};
                    let without_words_Numbers = user[j]['mobileNumber'].replace(/\D/g, '');
                    without_words_Numbers = parseInt(without_words_Numbers, 10);
                    item['firstName'] = user[j]['name']['first'];
                    item['lastName'] = user[j]['name']['last'];
                    item['countryCode'] = user[j]['countryCode'];
                    item['mobileNumber'] = without_words_Numbers;
                    item['email'] = appointment[i]['email'];
                    item['requestedFor'] = appointment[i]['requestedFor'];
                    item['approvedFor'] = appointment[i]['approvedFor'];
                    item['approved'] = '';
                    item['disciple'] = appointment[i]['disciple'];
                    if (appointment[i]['approved'] === false && appointment[i]['canceled'] === false) {
                        finalArray.push(item);
                    }
                }
            }
        }
        this.setState({
            finalList: finalArray
        })
    }

    updateAppointment = (row) => {
        let approvedResult = false;
        let canceledResult = false;
        if (row.approved === "approved") {
            approvedResult = true;
        } else if (row.approved === "canceled") {
            canceledResult = true;
        }
        const email = row.email;
        const body = {
            approved: approvedResult,
            approvedFor: row.approvedFor,
            canceled: canceledResult
        }
        this.props.updateAppointment(email, body);
    }

    render() {
        const columns = [{
            dataField: 'firstName',
            text: 'First Name',
            editable: false,
            headerStyle: {
                fontWeight: '400'
              }
        }, {
            dataField: 'lastName',
            text: 'Last Name',
            editable: false,
            headerStyle: {
                fontWeight: '400'
              }
        }, {
            dataField: 'email',
            text: 'Email',
            editable: false,
            headerStyle: {
                fontWeight: '400'
              }
        }, {
            dataField: 'countryCode',
            text: 'Country Code',
            editable: false,
            headerStyle: {
                fontWeight: '400'
              }
        }, {
            dataField: 'mobileNumber',
            text: 'Mobile Number',
            editable: false,
            headerStyle: {
                fontWeight: '400'
              }
        }, {
            dataField: 'requestedFor',
            text: 'Requested For',
            editable: false,
            headerStyle: {
                fontWeight: '400'
              }
        }, {
            dataField: 'approvedFor',
            text: 'Approved For',
            headerStyle: {
                fontWeight: '400'
              },
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'Darshan-15',
                    label: 'Darshan 15'
                }, {
                    value: 'Darshan-30',
                    label: 'Darshan 30'
                }, {
                    value: 'Darshan-45',
                    label: 'Darshan 45'
                }, {
                    value: 'Darshan-60',
                    label: 'Darshan 60'
                }]
            }
        }, {
            dataField: 'approved',
            text: 'Approved',
            headerStyle: {
                fontWeight: '400'
              },
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'approved',
                    label: 'approved'
                }, {
                    value: 'canceled',
                    label: 'canceled'
                }]
            }
        }, {
            dataField: 'disciple',
            text: 'Disciple',
            editable: false,
            headerStyle: {
                fontWeight: '400'
              }
        }, {
            text: 'Update',
            editable: false,
            headerStyle: {
                fontWeight: '400'
              },
            formatter: (cellContent, row) => (
                <div>
                    <label>
                        <button className="button button-block button-primary-lighten button-winona" onClick={() => { this.updateAppointment(row) }}>Update</button>
                    </label>
                </div>
            )
        }];

        return (
            <div className="appointmentList">
                <BootstrapTable
                    keyField="email"
                    data={this.state.finalList}
                    columns={columns}
                    cellEdit={cellEditFactory({
                        mode: 'dbclick',
                        blurToSave: true
                    })}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        appointmentList: state.appointmentListingReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserList: () => {
            dispatch(getUserList());
        },
        getAppointmentList: () => {
            dispatch(getAppointmentList());
        },
        resetState: () => {
            dispatch(resetState())
        },
        updateAppointment: (email, body) => {
            dispatch(updateAppointment(email, body))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentListing);