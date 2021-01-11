import React , {useState, useEffect } from 'react'
import { Select } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';
import './Style.css';

const { Option } = Select

function SelectFilterType(props) {

    function handleTypeChange(value) {
        props.onSelectType(value)
    }

    return (
        <div>
            <Select className='homeSelect' onChange={(value) => handleTypeChange(value)} size={'large'}
            bordered={false} placeholder='Mida otsid?'
            dropdownStyle={{borderRadius:'8px'}} >
                <Option value='training'>Treening</Option>
                <Option value='traininggroup'>Treeninggrupp</Option>
            </Select>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectType: (type) => dispatch(actions.filterByType(type))
    }
}

export default connect(null, mapDispatchToProps)(SelectFilterType);