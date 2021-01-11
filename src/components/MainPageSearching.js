import React from 'react';
import './Style.css';
import Filter from '../components/Filtering';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';
import SelectFilterLocation from './FilterSelectLocation';
import { Select, ConfigProvider, DatePicker, Input } from 'antd';
import locale from 'antd/es/locale/et_EE';
import moment from 'moment';
import FilterSearchButton from './FilterSearchButton';
import { withRouter } from 'react-router-dom';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

function checkDate(date) {
    var date3 = date
    if (date3 === null) {
        date3 = moment(). format('YYYY-MM-DD')
    }
    return date3;
}

class MainPageSearch extends React.Component{

    state = {
        location: this.props.filter.location,
        sport: this.props.filter.sport,
        date: this.props.filter.date,
        coachName: this.props.filter.coachName,
    }

    handleSportChange(sport) {
        if (sport != 'none' && sport != '') {
            this.setState({
                sport: sport
            })
        } else {
            this.setState({
                sport: null
            })
        }
    }

    handleLocationChange(location) {
        if (location != 'none' && location != '') {
             this.setState({
                location: location
            })
        } else {
            this.setState({
                location: null
            })
        }
    }

    handleNameChange(e) {
        const name = e.target.value
        if (name != '') {
            this.setState({
                coachName: name
            })
        } else  {
            this.setState({
                coachName: null
            })
        }
    }

    handleDateChange(date) {
        if (date != null && date != '') {
            const event = new Date(date)
            var newevent2 = event.setDate(event.getDate() + 1);
            var newevent3 = new Date(newevent2)
            var newevent4 = newevent3.toISOString().split('T')[0]
            this.setState({
                date: newevent4
            }, function () {console.log('date', this.state.date)})
        } else {
            this.setState({
                date: null
            })
        }
    }

    handleSearchClick = (props) => {
        var basename = '/trainings/search?' // võta kaasa ainult sport, location, date, coach_name
        var lastparam = this.state[Object.keys(this.state)[Object.keys(this.state).length - 1]]
        Object.entries(this.state).forEach(([key, value]) => {
            if (value !== null) {
                const param = key + "=" + value
                basename += param + "&"
            }
        });
        var searchurl = basename.slice(0, -1)
        this.props.history.push(searchurl)
    }

    render(){
        return(
            <div className='mainPageSearchContainer'>
            <Select defaultValue={this.props.filter.sport} onChange={(value) => this.handleSportChange(value)} placeholder='Spordiala' style={{ width: 120 }} bordered={false} size='large'>
              <Option value='none'>Kõik</Option>
              <Option value="jooks">Jooks</Option>
              <Option value="jõud">Jõud</Option>
              <Option value="crossfit">CrossFit</Option>
              <Option value="kardio">Kardio</Option>
              <Option value="spinning">Spinning</Option>
              <Option value="yoga">Yoga</Option>
              <Option value="ratas">Ratas</Option>
              <Option value="ujumine">Ujumine</Option>
            </Select>
            <Select defaultValue={this.props.filter.location} onChange={(value) => this.handleLocationChange(value)} placeholder='Asukoht' style={{ width: 120 }} bordered={false} size='large'>
              <Option value='none'>Kõik</Option>
              <Option value="Tartu">Tartu</Option>
              <Option value="Tallinn">Tallinn</Option>
              <Option value="Pärnu">Pärnu</Option>
              <Option value="Viljandi">Viljandi</Option>
              <Option value="Muu">Muu</Option>
            </Select>
            <Input size="large" placeholder="large size" defaultValue={this.props.filter.coachName} onChange={e => this.handleNameChange(e)} defaultValue={this.props.filter.coachName} placeholder='Treeneri nimi' bordered={false} />
            <ConfigProvider locale={locale}>
                <DatePicker onChange={date => this.handleDateChange(date)} style={{borderRadius:'13px', marginRight: '5px', width: '200px'}} bordered={false}
                placeholder="Kuupäev" size="large" suffixIcon='' defaultValue={moment(checkDate(this.props.filter.date), dateFormat)} format={dateFormat}
                />
            </ConfigProvider >
            <FilterSearchButton onCLick={this.handleSearchClick}/>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        filter: state.filter
    }
}

export default withRouter(connect(mapStateToProps, null)(MainPageSearch));