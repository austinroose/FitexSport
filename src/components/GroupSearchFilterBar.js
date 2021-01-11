import React from 'react';
import './Style.css';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function GroupSearchFilterBar(props) {

    return(
        <div className='searchFilterBarContainer' onClick={props.onClick}>
            <div className='searchFilterBar'>
                {
                props.sport ?
                <span style={{paddingLeft:'4px'}}>{props.sport}</span>
                :
                <span style={{color:'grey', paddingLeft:'4px'}}>Sport</span>
                }
                <div className='searchBarLine'/>
                {
                props.location ?
                <span>{props.location}</span>
                :
                <span style={{color:'grey'}}>Asukoht</span>
                }
                <Button type='primary' shape="circle" icon={<SearchOutlined />}
                style={{marginLeft: '15px' }}/>
            </div>
        </div>
    )

}

export default GroupSearchFilterBar;