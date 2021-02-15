import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Divider, Collapse, Tabs, Menu, Alert } from 'antd';
import { connect } from 'react-redux';
import axios from '../axios';
import './Style.css';
import Trainings from '../components/Training';
import TrainingGroupBanner from '../components/TrainingGroupBanner';
import GroupRequestsBox from '../components/GroupRequestsBox';
import GroupTrainingsList from './GroupTrainingsListView';
import MembersForGroup from '../components/MembersForGroup';
import { NavLink, withRouter, Link } from 'react-router-dom';

const { Panel } = Collapse
const { TabPane } = Tabs

function TrainingGroupLayout(props) {

    const [groupData, setGroupData] = useState({})
    const [isGroupMember, setIsGroupMember] = useState(false)
    const [isNotGroupMember, setIsNotGroupMember] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [groupTrainings, setGroupTrainings] = useState([])
    const [userHasRequestedAccess, setUserHasRequestedAccess] = useState(false)
    const [hasPermissionToSeeGroupTrainings, setHasPermissionToSeeGroupTrainings] = useState(false)
    const [currentTab, setCurrentTab] = useState('/trainings')
    const hamburgerMenu = useRef(null)
    const groupNav = useRef(null)
    const groupNavExtraContainer = useRef(null)
    const [dataLoaded, setDataLoaded] = useState(false)

    function ifGroupMember(token, data) {
        var contains = data.includes(token)

        if ( contains === true ) {
           setIsGroupMember(true)
           setHasPermissionToSeeGroupTrainings(true)
        } else {
           setIsNotGroupMember(true)
           setHasPermissionToSeeGroupTrainings(false)
        }
    }

    function getDate() {
        const date = new Date()
        const time1 = date.toISOString().split("T")[0]
        return time1
    }

    function ifGroupAdmin(token, data) {
        if ( token === data.coach ) {
           setIsOwner(true)
        } else {
           setIsOwner(false)
        }
        setIsNotGroupMember(false)
        setHasPermissionToSeeGroupTrainings(true)
    }

    function ifHasRequested(token, users) {
       var requests =  []
       users.forEach( function (user) {
        requests.push(user.token)
       })
       if ( requests.includes(token) === true ) {
        setUserHasRequestedAccess(true)
       } else {
       }
    }

    useEffect(() => {
        if (props.token !== null) {
            const groupID = props.groupID
            const date = getDate()
            async function fetchGroupData() {
                axios.defaults.headers = {
                    "Content-Type": "application/json",
                    'Authorization': props.token
                }
                const result = await axios.get(`/api/group/${groupID}`)
                setGroupData(result.data)
                if (props.isCoach === true) {
                    ifGroupAdmin(props.token, result.data)
                } else {
                    ifGroupMember(props.token, result.data.users)
                    ifHasRequested(props.token, result.data.requesting_users)
                }
            }
            fetchGroupData()
            setDataLoaded(true)
        }
    }, [props.groupID, props.isCoach])

    useEffect (() => {
        var pathname1 = ''
        if (props.location.pathname === '/') {
            pathname1 = '/trainings'
            setCurrentTab(pathname1)
        } else {
            setCurrentTab(props.location.pathname)
        }
    }, [props.location])

    function showHowManyNewRequests(requests) {
        var say = ''
        const count = requests.length
        if (count > 1) {
            say = '(' + count + ' uut avaldust)'
        }
        else if (count === 1) {
            say = '(' + count + ' uus avaldus)'
        }
        else {
            say = '(0 uut avaldust)'
        }
        return say;
    }

    function handleClick() {

    }

    return(
        <div className='trainingGroupPage'>
            {
            props.isAuthenticated ?
                <>
                <TrainingGroupBanner data={groupData} isOwner={isOwner}/>
                    {
                     isOwner ?
                        <div className='requestSectionCollapseContainer'>
                         <Collapse className='requestSectionCollapse' style={{borderRadius: '20px', color:'lightgrey'}} bordered={false}>
                            <Panel header={`Vaata uusi liitumisavaldusi ${showHowManyNewRequests(groupData.requesting_users)}`} key="1">
                              <GroupRequestsBox data={groupData.requesting_users} groupID={groupData.id}/>
                            </Panel>
                         </Collapse>
                         </div>
                     :
                     <></>
                    }
                    {hasPermissionToSeeGroupTrainings
                    ?
                        <div>
                        <Menu onClick={handleClick} selectedKeys={[currentTab]} mode="horizontal"
                        style={{backgroundColor:'transparent', paddingTop:'20px'}}>
                            <Menu.Item key="/trainings">
                                <Link to='/trainings'>Treeningud</Link>
                            </Menu.Item>
                            <Menu.Item key="/members">
                                <Link to='/members'>Liikmed</Link>
                            </Menu.Item>
                            <Menu.Item key="/about">
                                <Link to='/about'>Teave</Link>
                            </Menu.Item>
                        </Menu>

                        <div style={{marginTop:'20px'}}>
                            {props.children}
                        </div>
                        </div>
                    :
                        <></>
                    }
                    {
                    isNotGroupMember ?
                    <JoinGroupWidget requested={userHasRequestedAccess} groupID={groupData.id} userToken={props.token} />
                    :
                    <></>
                    }
                </>
            :
            <div>
                <Alert message="Treeninggrupiga liitumiseks või detailide nägemiseks loo konto või logi sisse" type="info" showIcon />
            </div>
            }
        </div>
    )
}

function JoinGroupWidget(props) {

    const [notClicked, setNotClicked] = useState(true)
    var hasRequested = props.requested
    var groupID = props.groupID
    var userToken = props.userToken

    function onPressJoin() {
        setNotClicked(false)
        async function addUserToRequesting() {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: userToken
            }
            const result = await axios.post(`/api/group/add_user_to_requesting/${groupID}`, {
                groupID: groupID,
                token: userToken,
            })
        }
        addUserToRequesting()
    }

    return(
    <div>
        {
        hasRequested ?
            <>
                <div className='joinWithGroupContainer'>
                    <Button type='primary' shape='round' size='large' disabled><b>Avaldus saadetud</b></Button>
                </div>
            </>
        :
            <>
                {
                notClicked ?
                    <div className='joinWithGroupContainer'>
                        <h1 style={{fontSize:'25px'}}>Soovid grupiga liituda?</h1>
                        <p style={{fontSize:'17px'}}>saada taotlus</p>
                        <Button type='primary' shape='round' size='large' onClick={onPressJoin}><b>Saada</b></Button>
                    </div>
                :
                    <div className='joinWithGroupContainer'>
                            <Button type='primary' shape='round' size='large' disabled><b>Kutse saadetud</b></Button>
                    </div>
                }
            </>
        }

    </div>
    )
}

const mapStateToProps = state => {
    return {
        isCoachAndIsAuthenticated: state.auth.iscoach === true && state.auth.token !== null,
        isUserAndIsAuthenticated: state.auth.iscoach === false && state.auth.token !== null,
        token: state.auth.token,
        isCoach: state.auth.iscoach,
        isAuthenticated: state.auth.token !== null,
    }
}

export default withRouter(connect(mapStateToProps)(TrainingGroupLayout));