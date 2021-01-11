import React from 'react';
import './Style.css';
import Filter from '../components/Filtering';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';
import { Select, Input } from 'antd';
import FilterSearchButton from './FilterSearchButton';
import { withRouter } from 'react-router-dom';

const { Option } = Select;

class GroupPageSearch extends React.Component{

    state = {
        location: this.props.filter.location,
        sport: this.props.filter.sport,
        groupName: this.props.filter.groupName,
        coachName: this.props.filter.coachName
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

    handleCoachNameChange(e) {
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

    handleGroupNameChange(e) {
        const name = e.target.value
        if (name != '') {
            this.setState({
                groupName: name
            })
        } else  {
            this.setState({
                 groupName: null
            })
        }
    }

    handleSearchClick = (props) => {
        var basename = '/group/search?' // võta kaasa ainult sport, location, date, coach_name
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
            <Input size="large" defaultValue={this.props.filter.groupName}
            onChange={e => this.handleGroupNameChange(e)}
            placeholder='Grupi nimi' bordered={false} />
            <Input size="large" defaultValue={this.props.filter.coachName}
            onChange={e => this.handleCoachNameChange(e)}
            placeholder='Treeneri nimi' bordered={false} />
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

export default withRouter(connect(mapStateToProps, null)(GroupPageSearch));