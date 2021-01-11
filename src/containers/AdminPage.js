import React, { useEffect, useState} from 'react';
import {connect } from 'react-redux'
import {Button, List, Input, Card, Pagination, Avatar, Tag, Form, Checkbox, Row} from 'antd';
import axios from '../axios';
import {withRouter} from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import './Style.css';

var qs = require('qs');

function AdminPage(props) {
    const [adminUser, setAdminUser] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [users, setUsers] = useState([])
    const [pagesCount, setPagesCount] = useState(0)
    const [ifCoach, setIfCoach] = useState(false)
    const [coachCount, setCoachCount] = useState(null)
    const [athleteCount, setAthleteCount] = useState(null)
    const [userStatusChanged, setUserStatusChanged] = useState(null)

    useEffect(() => {
        const admin = sessionStorage.getItem('is_admin')
        if (admin == 'true') {
            setAdminUser(true)
        }
        console.log('is admin')
    }, [props])

    useEffect(() => {
        var email = qs.parse(props.location.search, { ignoreQueryPrefix: true }).email
            if (email === undefined) {
                email = ''
            }

        var isCoach = qs.parse(props.location.search, { ignoreQueryPrefix: true }).is_coach
            if (isCoach === undefined) {
                isCoach = ''
            } else if (isCoach === 'true') {
                isCoach = 'True'
            } else {
                isCoach = ''
            }

        var isAthlete = qs.parse(props.location.search, { ignoreQueryPrefix: true }).is_athlete
            if (isAthlete === undefined) {
                isAthlete = ''
            } else if (isAthlete === 'true') {
                isAthlete = 'True'
            } else {
                isAthlete = ''
            }

        if (props.token !== null) {
            async function fetchUsers() {
                const token = props.token
                const result = await axios.get(`api/users/admin?page=${currentPage}&email=${email}&is_coach=${isCoach}&is_athlete=${isAthlete}`,
                {headers:{'Authorization' : token}})
                setUsers(result.data.results)
                const pagesCount = (Math.ceil(result.data.count / 5) * 10)
                const personCount = result.data.count
                if (isCoach === 'True') {
                    setCoachCount(personCount)
                } else {setCoachCount(null)}
                if (isAthlete === 'True') {
                    setAthleteCount(personCount)
                } else {setAthleteCount(null)}
                setPagesCount(pagesCount)
            }
            fetchUsers()
        }
    }, [props])

    function onSearch(e) {
        const search = e.target.value
        var extrapath = '?email=' + search
        if (search === '') {
            extrapath = '?email='
        }
        props.history.push(extrapath)
    }

    const onFinish = values => {
        var path = '?'
        var extrapath1 = ''
        var extrapath2 = ''
        var extrapath3 = ''
        var email = values.email
        if (email !== undefined) {
           extrapath1 = 'email=' + email
        } else {
            extrapath1 = 'email='
        }
        var coach = values.isCoach
        if (coach !== undefined) {
           extrapath2 = 'is_coach=' + coach
        } else {
            extrapath2 = 'is_coach='
        }
        var athlete = values.isAthlete
        if (athlete !== undefined) {
           extrapath3 = 'is_athlete=' + athlete
        } else {
            extrapath3 = 'is_athlete='
        }
        path += extrapath1 + '&' + extrapath2 + '&' + extrapath3
        props.history.push(path)
    };

    function changePage(page) {
        setCurrentPage(page)
        var email = qs.parse(props.location.search, { ignoreQueryPrefix: true }).email
            if (email === undefined) {
                email = ''
            }

        var isCoach = qs.parse(props.location.search, { ignoreQueryPrefix: true }).is_coach
            if (isCoach === undefined) {
                isCoach = ''
            } else if (isCoach === 'true') {
                isCoach = 'True'
            } else {
                isCoach = ''
            }

        var isAthlete = qs.parse(props.location.search, { ignoreQueryPrefix: true }).is_athlete
            if (isAthlete === undefined) {
                isAthlete = ''
            } else if (isAthlete === 'true') {
                isAthlete = 'True'
            } else {
                isAthlete = ''
            }

        async function fetchUsers() {
            const token = props.token
            const result = await axios.get(`api/users/admin?page=${page}&email=${email}&is_coach=${isCoach}&is_athlete=${isAthlete}`,
             {headers:{'Authorization' : token}})
            setUsers(result.data.results)
            const personCount = result.data.count
            if (isCoach === 'True') {
                setCoachCount(personCount)
            } else {setCoachCount(null)}
            if (isAthlete === 'True') {
                setAthleteCount(personCount)
            } else {setAthleteCount(null)}
        }
        fetchUsers()
    }

    function showUserStatus(status) {
        if (status === true) {
            const newStatus = 'Treener'
            return newStatus
        } else {
            return
        }
    }

    function checkUserStatus(coach) {
        if (coach === true) {
            return true
        }
        else {
            return false
        }
    }

    function changeUserToCoach(token) { // update user status to coach
        console.log('token', token)
        async function changeUser() {
            const userToken = token
            const result = await axios.patch(`api/update_user/admin/${token}`, {
                is_coach: true,
                is_athlete: false
            },
            {headers:{
                'Authorization': props.token
            }}) .catch(err => alert(err))
            console.log('result', result)
            setUserStatusChanged('Lisati treeneri õigused')
        }
        changeUser()
    }

    function removeUserFromCoach(token) { // update user status to coach
        console.log('token', token)
        async function changeUser() {
            const userToken = token
            const result = await axios.patch(`api/update_user/admin/${token}`, {
                is_coach: false,
                is_athlete: true
            },
            {headers:{
                'Authorization': props.token
            }}) .catch(err => alert(err))
            console.log('result', result)
            setUserStatusChanged('Eemaldati treeneri õigused')
        }
        changeUser()
    }

    function deleteUser(token) {
        alert('Blokeeri kasutaja')
    }

    return (
        <div>
            {props.isAuth ?
                <>
                    { adminUser ?
                    <div>
                        <h1 style={{fontSize:'20px'}}>Kasutajad</h1>
                        <div className='adminUserListContainer'>
                        <Form
                        onFinish={onFinish}
                        >
                            <Row>
                                <Form.Item name='email'>
                                    <Input placeholder="Email" prefix={<SearchOutlined />} style={{borderRadius:'20px', width:'200px'}}
                                     className='adminPanelSearch' onPressEnter={(e) => onSearch(e)} size='middle'/>
                                </Form.Item>
                                <Form.Item style={{marginLeft:'5px'}}>
                                    <Button type="primary" htmlType="submit" shape='round'>
                                      Otsi
                                    </Button>
                                </Form.Item>
                            </Row>
                            <Row>
                                <Form.Item name='isCoach' valuePropName="checked">
                                    <Checkbox>Treener</Checkbox>
                                </Form.Item>
                                <Form.Item name='isAthlete' valuePropName="checked" style={{marginLeft:'5px'}}>
                                    <Checkbox>Sportlane</Checkbox>
                                </Form.Item>
                            </Row>
                        </Form>
                        <div>
                        {coachCount?
                        <h1>Kokku treenereid: {coachCount}</h1>
                        :
                        <></>
                        }
                        {athleteCount?
                        <h1>Kokku sportlasi: {athleteCount}</h1>
                        :
                        <></>
                        }
                        </div>
                         <List
                            dataSource={users}
                            renderItem={item => (
                              <List.Item key={item.token}>
                                <Card title={<div>{item.name} <Tag style={{borderRadius:'20px'}}>{showUserStatus(item.is_coach)}</Tag>
                                </div>}
                                className='adminUserCard' style={{borderRadius:'20px'}}>
                                    <Avatar src={item.image} size={60}/>
                                    <p style={{marginTop:'20px'}}>Email: <b>{item.email}</b></p>
                                    <p>Kasutajanimi: <b>{item.username}</b></p>
                                    <p>Elukoht: <b>{item.location}</b></p>
                                    {userStatusChanged ?
                                        <span style={{color:'red'}}><b>
                                            Kasutaja muudetud: {userStatusChanged}
                                        </b></span>
                                    :
                                    <div>
                                        <Button style={{backgroundColor:'red', color:'white'}}
                                        shape='round'className='adminPanelButton' onClick={() => deleteUser(item.token)}>
                                            Blokeeri
                                        </Button>
                                        {checkUserStatus(item.is_coach) ?
                                        <Button style={{backgroundColor:'yellow'}} shape='round'
                                        className='adminPanelButton two' onClick={() => removeUserFromCoach(item.token)}>
                                            Eemalda treeneri õigused
                                        </Button>
                                        :
                                        <Button style={{backgroundColor:'green', color:'white'}}
                                        shape='round' className='adminPanelButton two' onClick={() =>
                                        changeUserToCoach(item.token)}>
                                            Lisa treeneriks
                                        </Button>
                                        }
                                    </div>
                                    }
                                </Card>
                              </List.Item>
                            )}
                          />
                          <Pagination current={currentPage} total={pagesCount}
                            onChange={(page) => changePage(page)} />
                        </div>

                    </div>
                    :
                    <div></div>
                    }
                </>
            :
            <div>

            </div>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuth: state.auth.token !== null
    }
}

export default withRouter(connect(mapStateToProps)(AdminPage));

//const userToken = 'de069dde8f8572561d63fde333644f68eb5c19a5'
//        axios.patch(`/api/update_user/admin/${userToken}`, {
//
//        })