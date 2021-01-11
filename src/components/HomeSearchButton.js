import React from 'react';
import './Style.css'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

class HomeSearchButton extends React.Component {
    render() {
        return(
        <div className='homeSearchButton' onClick={this.props.onClick}>
            <Button type="text" icon={<SearchOutlined style={{color: 'white'}} />} size='large' />
            <span className='searchText'>Otsi</span>
        </div>
        )
    }
}

export default HomeSearchButton;