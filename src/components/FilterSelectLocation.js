import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';
import './Style.css';

const { Option } = Select

class SelectFilterLocation extends React.Component {

    handleChange(value) {
        console.log(value)
        if (value !== 'none') {
            this.props.locationChange(
                value
            )
        } else {
            this.props.locationChange(
                null
            )
        }
    }

    render() {
        return(
            <Select className='homeSelect' onChange={(value) => this.handleChange(value)} size={'large'} bordered={false} placeholder='Asukoht'
            dropdownStyle={{borderRadius:'8px'}} >
                <Option value='none'>Kõik</Option>
                <Option value='Tartu'>Tartu</Option>
                <Option value='Tallinn'>Tallinn</Option>
                <Option value='Pärnu'>Pärnu</Option>
                <Option value='Viljandi'>Viljandi</Option>
                <Option value='Muu'>Muu</Option>
            </Select>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        locationChange: (location) => dispatch(actions.filterByLocation(location)),
    }
};

export default connect(null, mapDispatchToProps)(SelectFilterLocation);