import React, { Suspense, useState, useEffect} from 'react';
import axios from '../axios';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';
import { Pagination } from 'antd';
import {withRouter} from 'react-router-dom';
import TrainingsList2 from './TrainingsListSearchView2'

import './Style.css';

function GroupTrainingsList(props) {

    const [hasPerm, setHasPerm] = useState(false)

    function ifHasPermission(users, token) {
        var ifIncludes = users.includes(token)
        if (ifIncludes === true) {
            setHasPerm(true)
        }
    }

    function ifIsOwner(coach, token) {
        if (coach === token) {
            setHasPerm(true)
        }
    }

    useEffect(() => {
        if (props.token !== null) {
            ifHasPermission(props.users, props.token)
            ifIsOwner(props.coach, props.token)
        }

    }, [props])

    return (
        <div>
        {hasPerm ?
        <div style={{marginTop:'10px'}}>
            <TrainingsList2 coachID='' groupID={props.groupID} pageType='group' />
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
    }
}

export default connect(mapStateToProps)(GroupTrainingsList);

//                       <Filter />

//    updateSearch(event) {
//        this.setState({search: event.target.value.substr(0, 20)})
//    }

//let filteredTrainings = this.state.trainings.filter(
//            (trainings) => {
//                return trainings.sport.toLowerCase().indexOf(this.state.
//                    search.toLowerCase()) !== -1;
//            }
//        );
//
//            <input type="text"
//                value={this.state.search}
//                onChange={this.updateSearch.bind(this)}
//                className="SearchField"
//                placeholder="Otsing...(nt jooks, ujumine)"/>