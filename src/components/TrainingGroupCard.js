import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import './Style.css'

function TrainingGroupCard(props) {

    return(
            <Card title={props.name} extra={<a href={`/groups/${props.groupID}`}>Mine</a>} style={{borderRadius: '20px'}} className='trainingGroupCard'>
              <p>Spordiala: {props.sport}</p>
              <p>Liikmeid: {props.users.length}</p>
            </Card>
    )

}

export default TrainingGroupCard