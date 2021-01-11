import React from 'react';
import axios from '../axios';
import {connect} from 'react-redux';
import { MessageOutlined, LikeOutlined, TeamOutlined, EllipsisOutlined, UnorderedListOutlined,
        ClockCircleOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import './Style.css';
import { TiLocationArrowOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiInfoCircle, BiBuildingHouse } from "react-icons/bi";
import { AiOutlineEuro } from 'react-icons/ai';

import { Button, Card, Popconfirm, Alert, Collapse, Divider, Typography, Spin } from 'antd';

import CustomForm from '../components/Form';
import RegisterForm from '../components/Register';
import AthleteRegisterFormButton from '../components/AthleteRegisterButton';
import RegisteredUsers from '../components/RegisteredUsersGroup';

const { Panel } = Collapse;

const { Paragraph, Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

const { Meta } = Card

function callback(key) {
  console.log(key);
}

function checkPrice(price) { // needed for conditional rendering, to show 'Free' label in UI
    if (price == '0.0' || price == '0') {
        return false
    }
    else {
        return true
    }
}

class TrainingDetail extends React.Component {

    state = {
        training: {},
        isCreator: false,
        loggedin: true,
        ifUserHasPerms: false,
        loading: true
    }

    UNSAFE_componentWillReceiveProps(newProps) {
    console.log(newProps);
        if (newProps.token) {
            console.log('Start')
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: newProps.token
            }
            const trainingID = this.props.match.params.trainingID;
            axios.get(`/api/${trainingID}/`)
                .then(res => {
                    this.setState({
                        training: res.data
                    });
                    if (this.props.token == res.data.coach ) {
                        this.setState({
                            isCreator: true,
                            ifUserHasPerms: true,
                            loading: false
                        })
                    } else {
                        this.checkIfUserHasPerm(res.data.group_id)
                    }
                })
                .catch(err => {console.log(err)})
        } else if (this.props.token == undefined){
            this.setState({
                loggedin: false
            })
        }
    }

    handleDelete = (event) => {
        if (this.props.token !== null && this.props.token == this.state.training.coach ) {
            const trainingID = this.props.match.params.trainingID;
            axios.defaults.headers = {
                    "Content-Type": "application/json",
                    Authorization: this.props.token
                }
            axios.delete(`/api/${trainingID}/`)
            this.props.history.push('/mytrainings');
            this.forceUpdate();
        } else {
        }

    }

    donthandleDelete = () => {
    }

    checkGroupSize(groupSize) {
        if (groupSize == 99) {
            const groupSize = 'Piiramatu'
            return groupSize
        } else {
            return groupSize
        }
    }

    setGroupSizeColor(registered, groupSize) {
        if (registered < groupSize) {
            return 'green'
        } else {
            return 'red'
        }
    }

    checkIfUserHasPerm(groupID) {
        if (groupID !== 0) {
            var userToken = this.props.token
            var userGroups = []
            axios.get(`api/profile/${userToken}`)
                .then(res => {
                    userGroups = res.data.groups
                    if (userGroups.includes(groupID) === true) {
                        console.log('user on grupis')
                        this.setState({ifUserHasPerms: true, loading: false})
                    } else {
                        this.setState({ifUserHasPerms: false, loading: false})
                    }
                    console.log('Stopp')
                })
                .catch(err => {
                    console.error('Andmete laadimisel ilmnes tõrge', err)
                    alert('Andmete laadimisel ilmnes tõrge')
                })
        } else {
            this.setState({ifUserHasPerms: true, loading: false})
        }
    }


    render() {
        const isCreator = this.state.isCreator;
        const loggedIn = this.state.loggedin;
        const isNotFree = checkPrice(this.state.training.price);
        const groupSize = this.checkGroupSize(this.state.training.registration_limit)
        const groupSizeColor = this.setGroupSizeColor(this.state.training.registrations_made, this.state.training.registration_limit)
        const ifGroupTrainingAndUserHasPermission = this.state.ifUserHasPerms
        const loading = this.state.loading
        return (
            <div>
                        {
                        this.props.isAuthenticated ?
                        <>
                        {loading ? <Spin indicator={antIcon} />
                        :
                        <>
                            { ifGroupTrainingAndUserHasPermission ?
                            <div>
                                <Card style={{borderRadius: "20px", fontSize:'15px'}}>
                                    <Meta title={<div style={{display: 'flex', flexDirection: 'column'}}><span style={{fontSize: '20px'}}>{this.state.training.title}</span>
                                    <span style={{fontSize: '15px', fontWeight: 'light'}}>{this.state.training.sport}</span></div>} />
                                    <Divider />
                                    <Paragraph style={{marginBottom: '50px'}}>{this.state.training.content}</Paragraph>
                                    <div style={{display: 'flex'}}>
                                        <UserOutlined style={{fontSize: "15px", marginRight: '7px'}}/><p> {this.state.training.organizername} </p>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <FaRegCalendarAlt style={{fontSize: "15px", marginRight: '7px'}}/><p> {this.state.training.date} </p>
                                    </div>
                                    <div style={{display: 'flex', marginTop:'-5px'}}>
                                        <ClockCircleOutlined style={{fontSize: "15px", marginRight: '7px'}}/><p> {this.state.training.starts1} - {this.state.training.ends1}</p>
                                    </div>
                                    <div style={{display: 'flex', marginTop:'-5px'}}>
                                        <BiBuildingHouse style={{fontSize: "20px", marginRight: '7px'}}/><p> {this.state.training.city}</p>
                                    </div>
                                    <div style={{display: 'flex', marginTop:'-5px'}}>
                                        <TiLocationArrowOutline style={{fontSize: "20px", marginRight: '7px'}}/><p> {this.state.training.location}</p>
                                    </div>
                                    <div style={{display: 'flex', marginTop:'-5px'}}>
                                        <AiOutlineEuro style={{fontSize: "20px", marginRight: '7px'}}/>
                                        { isNotFree ?
                                        <p>{this.state.training.price}</p>
                                        :

                                         <p> Tasuta</p>
                                        }
                                    </div>
                                    <div style={{display: 'flex', marginTop:'-5px'}}>
                                        <BiInfoCircle style={{fontSize: "20px", marginRight: '7px'}}/><p> {this.state.training.organizeremail}</p>
                                    </div>
                                    <div style={{display: 'flex', marginTop:'-5px'}}>
                                        <TeamOutlined style={{fontSize: "20px", marginRight: '7px'}}/><p style={{ color: groupSizeColor }}> {this.state.training.registrations_made}/{groupSize}</p>
                                    </div>
                                    <RegisteredUsers trainingID={this.state.training.id}/>
                                </Card>
                            </div>
                            :
                            <>
                                <span>Teil puudub ligipääs treeningu andmetele</span>
                            </>
                            }
                        </>
                        }
                        </>
                        :
                        <span>Et treeningu detaile näha, logi palun sisse või loo konto</span>
                        }

                        {
                         isCreator ?
                         <>
                            <Collapse defaultActiveKey={['2']} onChange={callback} style={{borderRadius:'15px', marginTop:'20px'}}>
                                <Panel header="Uuendage treeningu andmeid" key="1">
                                     <CustomForm
                                        requestType="put"
                                        trainingID={this.props.match.params.trainingID}
                                        btnText="Uuenda treeningut"
                                        update={true} />
                                    <Popconfirm
                                     title="Olete te kindel, et soovite seda treeningut kustutada"
                                     onConfirm={this.handleDelete}
                                     onCancel={this.donthandleDelete}
                                     okText="Jah"
                                     cancelText="Ei">
                                        <form>
                                            <Button style={{borderRadius: '20px'}} size='large' type="danger" htmlType="submit">Kustuta</Button>
                                        </form>
                                    </ Popconfirm>
                                </Panel>
                            </Collapse>
                         </>
                         :
                         <>
                         <AthleteRegisterFormButton
                               trainingID={this.props.match.params.trainingID} />
                         </>
                        }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(TrainingDetail);