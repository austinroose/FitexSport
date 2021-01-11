import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';
import './Style.css';

const { Option } = Select

class SelectFilterSport extends React.Component {

    handleChange(value) {
        console.log(value)
        if (value !== 'none') {
            this.props.sportChange(
                value
            )
        } else {
            this.props.sportChange(
                null
            )
        }
    }

    render() {
        return(
            <Select className='homeSelect' onChange={(value) => this.handleChange(value)} size={'large'} bordered={false} placeholder='Spordiala'
            dropdownStyle={{borderRadius:'8px'}}>
                <Option value='none'>Kõik</Option>
                <Option value='jooks'>Jooks</Option>
                <Option value='jõud'>Jõud</Option>
                <Option value="crossfit">CrossFit</Option>
                <Option value="kardio">Kardio</Option>
                <Option value="spinning">Spinning</Option>
                <Option value="yoga">Yoga</Option>
                <Option value="ratas">Ratas</Option>
                <Option value="ujumine">Ujumine</Option>
            </Select>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sportChange: (sport) => dispatch(actions.filterBySport(sport))
    }
};

export default connect(null, mapDispatchToProps)(SelectFilterSport);