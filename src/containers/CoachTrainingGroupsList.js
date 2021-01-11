import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { Card, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import axios from '../axios';
import './Style.css';
import TrainingGroupCard from '../components/TrainingGroupCard'

function CoachTrainingGroups (props) {

    const [groups, setGroups] = useState([])

     async function fetchData() {
        const result = await axios.get(`/api/traininggroups/${props.token}`, {headers:{'Authorization':props.token}})
        setGroups(result.data)
        console.log('res', result)
     }

    useEffect(() => {
        fetchData(groups);
    }, [props.token])

    const coachGroups = groups.map((group) =>
        <div style={{marginTop:'16px'}} key={group.id}>
            <TrainingGroupCard key={group.id} groupID={group.id} name={group.name} sport={group.sport}
            users={group.users}/>
        </div>)

    return(
        <div>
            {
             props.isCoachAndIsAuthenticated ?
             <>
              <h1 style={{marginLeft: '5px', fontSize: '20px'}}>Minu grupid</h1>
              {coachGroups}
             </>
                // treeneri grupid
             :
             <></>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        isCoachAndIsAuthenticated: state.auth.iscoach === true && state.auth.token !== null,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(CoachTrainingGroups);