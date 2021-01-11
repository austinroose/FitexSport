import React, { Suspense, useState, useEffect} from 'react';
import axios from '../axios';
import { connect } from 'react-redux';
import * as actions from '../store/actions/filter';
import { Pagination } from 'antd';
import {withRouter} from 'react-router-dom';

import Trainings from '../components/Training';
import GroupTrainings from '../components/GroupTraining';
import CoachTrainings from '../components/CoachTraining';
import './Style.css';
import DateSelect from '../components/DateSelectWidget';

var qs = require('qs');

function getDate() {
    const today = new Date()
    const time1 = today.toISOString().split("T")[0]
    return time1
}

function TrainingsList2(props) {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [pageType, setPageType] = useState('group')
    const [urlDate, setUrlDate] = useState(null)

    function changePage(page) {
        setCurrentPage(page)
    }

    function changePostArray(data) {
        const posts = data
        const today = new Date()
        var withouttoday = [];
        for (var i = 0; i < posts.length; i++) {
            const today2 = new Date(posts[i].stringtime)
            if(today2 < today){
            }
            else if(today2 >= today){
                withouttoday.push(posts[i]) // lisa uude arraysse ainult need yritused, mis on veel tulemas
            }
        }
        withouttoday.sort(function(a,b){ //sea postitused jarjekorda alates nooremast kuni hilisemani
            var dateA = new Date(a.stringtime)
            var dateB = new Date(b.stringtime)
            if(dateA<dateB){
                return -1;
            }
            if(dateA>dateB){
                return 1;
            }
            return 0;
        })
        setData(withouttoday)
    }

    function getPageType(type) {
        if (type === 'group') {
            setPageType('group')
        } else if (type === 'coach') {
            setPageType('coach')
        }
    }

    useEffect(() => {
        async function fetchTrainings() {
            const time = getDate()
            const groupID = props.groupID
            const coachID = props.coachID
            var date = qs.parse(props.location.search, { ignoreQueryPrefix: true }).date
            if (date === undefined) {
                date = ''
            }
            setUrlDate(date)
            const result = await axios.get(`/api/trainings?stringdate__gte=${time}&group_id=${groupID}&stringtime2=${date}&coach=${coachID}&page=${currentPage}`)
            changePostArray(result.data.results)
            const pagesCount = (Math.ceil(result.data.count / 10) * 10)
            setPagesCount(pagesCount)
        }
        fetchTrainings()
        getPageType(props.pageType)
    }, [props, currentPage])

    return (
        <div style={{paddingTop:'13px'}}>
            <DateSelect uiDate={urlDate}/>
            {pageType === 'group' &&
                <>
                <GroupTrainings data={data}/>
                </>
            }
            {pageType === 'coach' &&
                <>
                <CoachTrainings data={data}/>
                </>
            }
            <Pagination current={currentPage} total={pagesCount}
                        onChange={(page) => changePage(page)} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        filter: state.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFilters: () => dispatch(actions.removeAllFilters())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainingsList2));