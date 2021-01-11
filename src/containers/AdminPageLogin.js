import React, {useState, useEffect} from 'react';
import axios from '../axios';
import {Form, Button, Alert} from 'antd';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';

// set state

function AdminPageLogin(props) {

    const [error, setError] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const admin = sessionStorage.getItem('is_admin')
        if (admin === 'true') {
            setLoggedIn(true)
        }
        console.log('is already admin', admin)
    }, [])

   function onLoginPressed() {
    async function login() {
        const pwd = 345
        const token = props.token
       const result = await axios.post(`/api/admin/login`, {pwd:pwd, token:token}, {headers: {'Authorization': token}})
        .catch(err => {setError(true)})
       if (result !== undefined && result.status === 200) {
           console.log(result)
            props.onLogAdminIn()
            setLoggedIn(true)
       }
    }
    login()
   }

    return(
        <div>
        {props.isAuthenticated ?
        <div>
            {loggedIn ?
            <div>
                <Alert message='Juba sisse logitud' type='success' showIcon />
            </div>
            :
            <div>
                {error?
                <Alert message='Vale perool' type='error' showIcon />
                :
                <></>
                }
                <h1>This is admin page login</h1>
                <Button onClick={() => onLoginPressed()} type='primary'>Log in</Button>
            </div>
            }
        </div>
        :
        <></>
        }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogAdminIn: () => dispatch(actions.adminLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPageLogin);