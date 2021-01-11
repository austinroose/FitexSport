import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../axios';
import './Style.css'
import {Card, Avatar, Button, Row} from 'antd';

function GroupRequestsBox(props) {

    const requests = props.data
    var groupID = props.groupID

    const userrequests = requests.map(request => <UserRequestCard key={request.token} name={request.name} email={request.email}
                            image={request.image} token={request.token} groupID={groupID}/>)


    return (
        <div className='trainingGroupRequestsBox'>
            {userrequests}
        </div>
    )
}

function UserRequestCard(props) {

    const [userAdded, setUserAdded] = useState(false)
    const [userDeleted, setUserDeleted] = useState(false)
    const [optionSelected, setOptionSelected] = useState(false)

    var userToken = props.token
    var groupID = props.groupID

    function onClickAdd() {
        async function addUser() {
            const result = await axios.post(`/api/group/add_user/${groupID}`, {
                groupID: groupID,
                token: userToken,
            })
        }
        addUser()
        setOptionSelected(true)
        setUserAdded(true)
    }

    function onClickDelete() {
        async function deleteUser() {
            const result = await axios.post(`/api/group/remove_user_from_requesting/${groupID}`, {
                groupID: groupID,
                token: userToken,
            })
        }
        deleteUser()
        setOptionSelected(true)
        setUserDeleted(true)
    }

    return(
    <div className='userRequestCardContainer'>
        <Card style={{borderRadius: '20px'}} className='userRequestCard'>
            <div style={{ height: '120px'}}>
                <Avatar src={props.image} size={90} />
            </div>
            <h1>{props.name}</h1>
            <p>{props.email}</p>
            <div style={{display:'flex', width: '100%', flexDirection: 'column', alignItems:'center',
            justifyContent: 'center', marginTop: '5px'}}>
                { optionSelected ?
                    <>
                    { userAdded ?
                        <><Button shape='round' size='default' disabled>Lisatud</Button></>
                        :
                        <></>
                    }
                    { userDeleted ?
                        <><Button shape='round' size='default' disabled>Kustutatud</Button></>
                        :
                        <></>
                    }
                    </>
                :
                <>
                    <Button type='primary' shape='round' size='default' onClick={() => onClickAdd()}>Lisa</Button>
                    <Button shape='round' style={{marginTop: '16px'}} size='default' onClick={() => onClickDelete()}>Kustuta</Button>
                </>
                }

            </div>
        </Card>
    </div>)
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}


export default connect(mapStateToProps)(GroupRequestsBox);