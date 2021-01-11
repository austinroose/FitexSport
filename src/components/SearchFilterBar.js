import React from 'react';
import './Style.css';
import Filter from '../components/Filtering';
import HomeFilter from './HomeFiltering';
import { connect } from 'react-redux';
import './Style.css';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/filter';
var qs = require('qs');

class SearchFilterBar extends React.Component{

    state = {
        location: null,
        date: null,
        sport: null,
    }

    componentDidMount() {
        var location3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).location
        if (location3 == undefined){
            location3 = null
        }
        var sport3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sport
        var sport4 = 0
        if (sport3 == undefined){
            sport4 = null
        } else {
            sport4 = sport3.charAt(0).toUpperCase() + sport3.slice(1)
        }
        var date3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).date
        if (date3 == undefined){
            date3 = null
        }
        this.setState({
            location: location3,
            date: date3,
            sport: sport4,
        })
        if (this.props.filter.sport === null && sport4 !== null) {
            this.props.sportChange(sport4)
        }
        else if (this.props.filter.location === null && location3 !== null) {
            this.props.locationChange(location3)
        }
        else if (this.props.filter.date === null && date3 !== null) {
            this.props.dateChange(date3)
        }
    }

    componentDidMount() {
        var location3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).location
        if (location3 == undefined){
            location3 = null
        }
        var sport3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sport
        var sport4 = 0
        if (sport3 == undefined){
            sport4 = null
        } else {
            sport4 = sport3.charAt(0).toUpperCase() + sport3.slice(1)
        }
        var date3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).date
        if (date3 == undefined){
            date3 = null
        }
        this.setState({
            location: location3,
            date: date3,
            sport: sport4,
        })
        if (this.props.filter.sport === null && sport4 !== null) {
            this.props.sportChange(sport4)
        }
        else if (this.props.filter.location === null && location3 !== null) {
            this.props.locationChange(location3)
        }
        else if (this.props.filter.date === null && date3 !== null) {
            this.props.dateChange(date3)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search != this.props.location.search) {
            var location3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).location
            if (location3 == undefined){
                location3 = null
            }
            var sport3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sport
            var sport4 = 0
            if (sport3 == undefined){
                sport4 = null
            } else {
                sport4 = sport3.charAt(0).toUpperCase() + sport3.slice(1)
            }
            var date3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).date
            if (date3 == undefined){
                date3 = null
            }
            this.setState({
                location: location3,
                date: date3,
                sport: sport4,
            })
            if (this.props.filter.sport === null && sport4 !== null) {
                this.props.sportChange(sport4)
            }
            else if (this.props.filter.location === null && location3 !== null) {
                this.props.locationChange(location3)
            }
            else if (this.props.filter.date === null && date3 !== null) {
                this.props.dateChange(date3)
            }
        }
    }


    render(){
        return(
            <div className='searchFilterBarContainer' onClick={this.props.onClick}>
                <div className='searchFilterBar'>
                    {
                    this.state.sport ?
                    <span style={{paddingLeft:'4px'}}>{this.state.sport}</span>
                    :
                    <span style={{color:'grey', paddingLeft:'4px'}}>Sport</span>
                    }
                    <div className='searchBarLine'/>
                    {
                    this.state.location ?
                    <span>{this.state.location}</span>
                    :
                    <span style={{color:'grey'}}>Asukoht</span>
                    }
                    <div className='searchBarLine'/>
                    {
                    this.state.date ?
                    <span>{this.state.date}</span>
                    :
                    <span style={{color:'grey'}}>Päev</span>
                    }
                    <Button type='primary' shape="circle" icon={<SearchOutlined />}
                    style={{marginLeft: '15px' }}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filter: state.filter
    }
};

const mapDispatchToProps = dispatch => {
    return {
        locationChange: (location) => dispatch(actions.filterByLocation(location)),
        sportChange: (sport) => dispatch(actions.filterBySport(sport)),
        dateChange: (date) => dispatch(actions.filterByDate(date))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchFilterBar));