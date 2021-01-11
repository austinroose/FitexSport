import React from 'react';
import {Divider} from 'antd';

function GroupAboutPage(props) {
    return(
        <div style={{marginTop: '10px' }}>
            <h1>Grupi kirjeldus: </h1>
            <Divider />
            <span>{props.groupDescription}</span>
        </div>
    )
}

export default GroupAboutPage;