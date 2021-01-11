import React from 'react';
import SelectFilterSport from './FilterSelectSport';
import SelectFilterLocation from './FilterSelectLocation';
import SelectFilterType from './FilterSelectType';
import './Style.css'
import { Button, DatePicker, ConfigProvider } from 'antd';
import locale from 'antd/es/locale/et_EE';
import HomeSearchButton from './HomeSearchButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/filter';

class HomeFilter extends React.Component {

    handleDateChange(date) {
        if (date != null) {
            const event = new Date(date)
            var newevent = event.toISOString().split('T')[0]
            console.log('date', newevent)
            this.props.dateChange(
                newevent
            )
        }
        else {
            const newevent = null
            this.props.dateChange(
                newevent
            )
        }
    }

    handleClick = (props) => {
        var chosenType = this.props.type
        if (chosenType !== null) {
            var basename = ''
            if (chosenType === 'training') { // when user chose to look for training, he will be redirected to trainings route
                basename = '/trainings/search?'
            } else if (chosenType === 'traininggroup') {
                basename = '/group/search?'
            }
            var filterDict = this.props.filter
            var location = this.props.filter.location
            if (location !== null) {
                const locationurl = 'location=' + location + '&'
                basename += locationurl
            }
            var sport = this.props.filter.sport
            if (sport !== null) {
                const sporturl = 'sport=' + sport + '&'
                basename += sporturl
            }
            const searchurl = basename.slice(0, -1)
            this.props.history.push(searchurl)
        }
    }

    render() {
        return(
            <div className='filterContainer'>
            <SelectFilterType />
            <SelectFilterSport />
            <SelectFilterLocation />
            <HomeSearchButton onClick={this.handleClick}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dateChange: (date) => dispatch(actions.filterByDate(date))
    }
};

const mapStateToProps = state => {
    return {
        filter: state.filter,
        token: state.auth.token,
        type: state.filter.type
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFilter));


//<ConfigProvider locale={locale}>
//                <DatePicker onChange={date => this.handleDateChange(date)} style={{borderRadius:'13px', marginRight: '5px'}} bordered={false}
//                placeholder="Kuupäev" size="large" suffixIcon=''
//                />

//Object.entries(filterDictSliced).forEach(([key, value]) => {
//            if (value !== null) {
//                const param = key + "=" + value
//                basename += param + "&"
//            }
//        });