import React from 'react';
import axios from '../axios';
import { Form, Input, Button, Collapse, notification, Popconfirm } from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './Style.css';

import { connect } from 'react-redux';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

class AthleteRegisterFormButton extends React.Component {

    constructor(props) {
        super(props);
        this.checkIfRoomToRegister = this.checkIfRoomToRegister.bind(this);
        this.getUsersProfile = this.getUsersProfile.bind(this);
        this.checkRegister = this.checkRegister.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.state = {
            isregistered: false,
            disabled: false,
            isRoomToRegister: true,
            training: {},
            usersname: '',
            usersemail: ''
        }
    }

    componentDidMount() {
        const trainingID = this.props.trainingID;
        console.log('isRoom', this.state.isRoomToRegister)
        axios.get(`/api/${trainingID}`)
            .then((res) => {
                this.setState({
                    training: res.data
                });
                this.getUsersProfile()
                this.checkRegister()
                this.checkIfRoomToRegister(res.data.id, res.data.registration_limit)
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const trainingID = this.props.trainingID;
            axios.get(`/api/${trainingID}`)
                .then((res) => {
                    this.setState({
                        training: res.data
                    });
                    this.getUsersProfile()
                    this.checkRegister()
                    this.checkIfRoomToRegister(res.data.id, res.data.registration_limit)
                });
        }
        
    }

    checkIfRoomToRegister(trainingID, reg_limit) { // check for room in the trainings grou
        if (Number.isInteger(trainingID)) {
            axios.get(`/api/eventregistrations/${trainingID}`)
            .then(res => {
                if (res.data.length >= reg_limit) {
                    this.setState({isRoomToRegister: false})
                } else {
                    this.setState({isRoomToRegister: true})
                }
            })
        }
    }

    openSuccessfulCreateNotificationWithIcon = type => {
      notification[type]({
        message: 'Edukalt registreeritud!',
        description:
          'Et oma registreerimisi näha, mine "Minu registreerimised" lehele.',
      });
    };

    getUsersProfile() {
        const token = this.props.token
        axios.get(`/api/profile/${token}`)
        .then(res => {
            this.setState({
                usersname: res.data.name,
                usersemail: res.data.email,
            })
        })
    }

    checkRegister() {
        const trainingID = this.props.trainingID
        const userID = this.props.token
        const reg = null
            axios.get(`/api/userregistrationslist/${userID}`)
                .then(res => {this.checkInfo(res)})
    }

    checkInfo(res) {
       const res1 = res.data
       const token1 = this.props.token
       const trainingID = this.props.trainingID
       const validate = res1.filter((registration) =>
        registration.event.toString().indexOf(trainingID) !== -1
       )
       this.handleValidate(validate)
    }

    handleValidate = (validate) => {
        if ( validate.length != 0){
            this.setState({
                isregistered: true
            })
       }
       else{
       }
    }

    handleRegistration = state => {
        const trainingtitle = this.state.training.title;
        const organizeremail = this.state.training.organizeremail;
        const usersname = this.state.usersname;
        const usersemail = this.state.usersemail;
        const trainingID = this.props.trainingID;
        const profileID = this.props.token;
        const trainingdate = this.state.training.date
        const training_starttime = this.state.training.starts1
        const training_endtime = this.state.training.ends1
        const sport = this.state.training.sport
        const eventtime = this.state.training.stringtime
        const d = new Date()
        const registration_time = d.toLocaleString()
        const eventdate = this.state.training.stringdate
        console.log('user REG DATA', this.props.token, this.props.trainingID)

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: this.props.token
        }
        axios.post(`/api/add_user/${trainingID}`, {
            profile: profileID,
            pk: trainingID,
            email: usersemail,
            name: usersname,
            organizeremail: organizeremail,
            trainingtitle: trainingtitle,
            trainingdate: trainingdate,
            training_start_time: training_starttime,
            training_end_time: training_endtime,
            registration_time: registration_time,
            eventtime: eventtime,
            eventdate: eventdate,
            training_sport: sport,
        })
        .then(res => {this.openSuccessfulCreateNotificationWithIcon('success')})
        this.setState({
            disabled: true,
        })
    }

    render() {
        const token = this.props.token
        const isRegistered = this.state.isregistered
        const isRoomToRegister = this.state.isRoomToRegister
        return(<div>
        {
        token ?
            isRegistered ?
                this.props.isCoach ?
                <span></span>
                :
                <Button type='primary' shape='round' style={{marginTop:'20px'}} disabled > Oled juba registreeritud
                </Button>
            :
            this.props.isCoach ?
            <span></span>
            :
            isRoomToRegister ?
            <div style={{marginTop: '20px'}}>
            <Popconfirm
                title="Kinnita registreerumine"
                onConfirm={this.handleRegistration}
                okText="Jah"
                cancelText="Ei"
              >
                <Button type='primary' shape='round' disabled={this.state.disabled}>
                    Registreeru treeningule
                </Button>
            </Popconfirm>
            </div>
            :
            <Button style={{marginTop: '20px'}} type='primary' shape='round' disabled > Kahjuks pole treeningule rohkem kohti
            </Button>

        :
        <span></span>
        }</div>)
    }
}



const mapStateToProps = (state, props) => {
    return{
        token: state.auth.token,
        isCoach: state.auth.iscoach == true
    }
}

export default connect(mapStateToProps)(AthleteRegisterFormButton);