import React, {useState, useEffect} from 'react';
import axios from '../axios';
import { connect } from 'react-redux';

import TrainingsList2 from './TrainingsListSearchView2';

function CoachTrainingsList(props) {
    return(
        <div>
            {props.isValid ?
            <TrainingsList2 coachID={props.token} groupID='' pageType='coach' />
            :
            <></>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isValid: state.auth.token !== null && state.auth.iscoach === true,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(CoachTrainingsList);