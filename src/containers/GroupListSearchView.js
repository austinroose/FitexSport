import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from '../axios';
import './Style.css';
import { Drawer, Pagination } from 'antd';
import * as actions from '../store/actions/filter';
import GroupCard from '../components/Group';
import GroupPageSearch from '../components/GroupPageSearching';
import GroupSearchFilterBar from '../components/GroupSearchFilterBar';
import {Helmet} from 'react-helmet'

// get sport, location from url with qs
// also get coach name from url
// if any of those are undefined leave them empty === ''

var qs = require('qs');

function SearchGroupList(props) {

    const [groups, setGroups] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [drawer, setDrawer] = useState(false)
    const [sport, setSport] = useState(null)
    const [location, setLocation] = useState(null)
    const [groupName, setGroupName] = useState(null)
    const [coachName, setCoachName] = useState(null)

    useEffect(() => {
        var sport3 = qs.parse(props.location.search, { ignoreQueryPrefix: true }).sport
        setSport(sport3)
        if (sport3 == undefined){
            sport3 = ''
            setSport(null)
        }
        var location3 = qs.parse(props.location.search, { ignoreQueryPrefix: true }).location
        setLocation(location3)
        if (location3 == undefined){
            location3 = ''
            setLocation(null)
        }
        var group_name3 = qs.parse(props.location.search, { ignoreQueryPrefix: true }).groupName
        setGroupName(group_name3)
        if (group_name3 == undefined){
            group_name3 = ''
            setGroupName(null)
        }
        var coach_name3 = qs.parse(props.location.search, { ignoreQueryPrefix: true }).coachName
        setCoachName(coach_name3)
        if (coach_name3 == undefined){
            coach_name3 = ''
            setCoachName(null)
        }
        async function fetchGroups() {
            const result = await axios.get(`/api/groups?sport=${sport3}&location=${location3}&name=${group_name3}&coach_name=${coach_name3}&page=${currentPage}`)
            const pagesCount = result.data.count
            setGroups(result.data.results)
            setPagesCount(pagesCount)
            console.log('groups', result.data.results)
        }
        fetchGroups() // following part ensures that state values are same as selected filter values even after refresh
        if (props.filter.sport === null && sport3 !== '') {
            props.sportChange(sport3)
        }
        if (props.filter.location === null && location3 !== '') {
            props.locationChange(location3)
        }
        if (props.filter.coachName === null && coach_name3 !== '') {
            props.coachNameChange(coach_name3)
        }
        if (props.filter.groupNameChange === null && group_name3 !== '') {
            props.groupNameChange(group_name3)
        }
        closeDrawer()
    }, [props.location, currentPage])

    function changePage(page) {
        setCurrentPage(page)
    }

    function closeDrawer() {
        setDrawer(false)
    }

    function showDrawer() {
        setDrawer(true)
    }

    return (
        <div className='userGroupsPage'>
            <Helmet>
                <title>Sinu Treeninggrupp Mõne Klikiga!</title>
                <meta name="description" content="Suurim valik treeninggruppe! Ühendu uute inimestega ja muuda oma tervislik elustiil mitmekülgsemaks." />
            </Helmet>
           <GroupSearchFilterBar onClick={() => showDrawer()} sport={sport} location={location} groupName={groupName}
           coachName={coachName}/>
           <GroupCard data={groups} />
           <Pagination current={currentPage} total={pagesCount}
                        onChange={(page) => changePage(page)} />
           <Drawer
            title="Muuda otsingut"
            placement="top"
            height={270}
            closable={true}
            onClose={closeDrawer}
            visible={drawer}
            >
                <GroupPageSearch />
            </Drawer>
        </div>
    )


}

const mapDispatchToProps = (dispatch) => {
    return {
        sportChange: (sport) => dispatch(actions.filterBySport(sport)),
        locationChange: (location) => dispatch(actions.filterByLocation(location)),
        coachNameChange: (name) => dispatch(actions.filterByCoach(name)),
        groupNameChange: (groupName) => dispatch(actions.filterByGroupName(groupName))
    }
}

const mapStateToProps = state => {
    return {
        filter: state.filter
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGroupList);