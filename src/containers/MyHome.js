import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Card, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import axios from '../axios';
import './Style.css'


function MyHome(props) {
    const [count, setCount] = useState(0)
    const [groupsCount, setGroupsCount] = useState(0)

    var userID = props.token
    var d = new Date()
    var datetime = d.toISOString().split('T')[0]

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(`/api/userregistrationslist/${userID}?event_date__gte=${datetime}`)
            setCount(result.data.length)
        }
        async function fetchProfile() {
            const result = await axios.get(`/api/profile/${props.token}`)
            const count = result.data.groups.length
            setGroupsCount(count)
        }
        fetchData();
        fetchProfile()
    }, [props])

    return(
        <div>
            {
             props.isUserAndIsAuthenticated ?
             <>
             <Card bordered={true} className='controlPanelCard' style={{borderRadius:'20px'}}>
              <h1 style={{fontSize: '20px'}}>Minu registreerimised</h1>
              <p style={{fontSize: '15px'}}>Aktiivsed registreerimised: {count}</p>
              <Button type="primary" shape="round">
                <Link to="/userregistrations/">Vaata</Link>
              </Button>
            </Card>
            <Divider />
            <Card bordered={true} className='controlPanelCard' style={{borderRadius:'20px'}}>
              <h1 style={{fontSize: '20px'}}>Minu grupid</h1>
              <p style={{fontSize: '15px'}}>Gruppe kokku: {groupsCount}</p>
              <Button type="primary" shape="round">
                <Link to="/user_groups">Mine</Link>
              </Button>
            </Card>
            </>
            // kasutaja treeninggrupid
            :
            <></>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isUserAndIsAuthenticated: state.auth.iscoach === false && state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(MyHome);