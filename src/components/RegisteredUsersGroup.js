import React from 'react';
import axios from '../axios';
import {Avatar, Tooltip, Tag} from 'antd';
import { TeamOutlined } from '@ant-design/icons';

class RegisteredUsers extends React.Component {
    state = {
        regs: []
    }

    componentDidMount() {
        const trainingID = this.props.trainingID
                axios.get(`/api/eventregistrations/${trainingID}`)
                    .then(res => {
                        this.setState({
                            regs: res.data
                        })
                    })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const trainingID = this.props.trainingID
            axios.get(`/api/eventregistrations/${trainingID}`)
                .then(res => {
                    this.setState({
                        regs: res.data
                    })
                })
        }
    }

    render() {
        return(<UserIcons regs1={this.state.regs} />)
    }
}

class UserIcons extends React.Component {

    state = {
        usersgroup: []
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            const registrations = this.props.regs1
            this.setState({
                usersgroup: registrations.map((registration) => <UserIcon key={registration.profile} profileID={registration.profile} />)
            })
        }

    }

    render() {
        return(<div style={{display: 'flex', alignItems: 'center'}}>
        <Tag style={{borderRadius: '10px'}} icon={<TeamOutlined style={{fontSize: "17px"}}/>}>
        <span style={{fontSize: '14px'}}>Registreerunud: </span>
        </Tag><Avatar.Group maxCount={4}>{this.state.usersgroup}</Avatar.Group></div>)
    }
}

class UserIcon extends React.Component {

    state = {
        profile: {}
    }

    componentDidMount() {
        const profileID = this.props.profileID
            axios.get(`/api/profile/${profileID}`)
                .then((res) => {
                    this.setState({
                        profile: res.data
                    })
                })
    }

    render(){
        return(<Tooltip placement="bottom" title={this.state.profile.email}><Avatar size={40} src={this.state.profile.image} /></Tooltip>)
    }
}

export default RegisteredUsers;