import React from 'react';
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { getUserList, getAppointmentList, resetState } from '../../../actions/appointmentListAction';


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
                    item['approved'] = appointment[i]['approved'];
                    item['canceled'] = appointment[i]['canceled'];
                    item['disciple'] = appointment[i]['disciple'];
                    finalArray.push(item);
                }
            }
        }
        this.setState({
            finalList: finalArray
        })
    }




    render() {
        const columns = [{
            dataField: 'firstName',
            text: 'First Name',
            editable: false
        }, {
            dataField: 'lastName',
            text: 'Last Name',
            editable: false
        }, {
            dataField: 'email',
            text: 'Email',
            editable: false
        }, {
            dataField: 'countryCode',
            text: 'Country Code',
            editable: false
        }, {
            dataField: 'mobileNumber',
            text: 'Mobile Number',
            editable: false
        }, {
            dataField: 'requestedFor',
            text: 'Requested For',
            editable: false
        }, {
            dataField: 'approvedFor',
            text: 'Approved For',
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
            editor: {
                type: Type.CHECKBOX,
                value: 'true:false'
              }
        }, {
            dataField: 'canceled',
            text: 'Canceled',
            editor: {
                type: Type.CHECKBOX,
                value: 'true:false'
              }
        }, {
            dataField: 'disciple',
            text: 'Disciple',
            editable: false
        },{
            text: 'Update',
            editable: false
        }];

        return (
            <div className="appointmentList">
                <BootstrapTable
                    keyField="id"
                    data={this.state.finalList}
                    columns={columns}
                    cellEdit={ cellEditFactory({
                        mode: 'dbclick',
                        blurToSave: true
                      }) }
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentListing);