import React from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Style.css'

class FilterSearchButton extends React.Component {

    render() {
        return(
        <div onClick={this.props.onCLick}>
            <Button type='primary' className='filterSearchButton' shape="round" icon={<SearchOutlined style={{color: 'white'}}/>} size='large'>
                Otsi
            </Button>
        </div>
        )
    }
}

export default FilterSearchButton;