import React, {useState, useEffect} from 'react';
import { Button, DatePicker, ConfigProvider, Tag, Row } from 'antd';
import { withRouter } from 'react-router-dom';
import locale from 'antd/es/locale/et_EE';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useStateWithCallbackLazy } from 'use-state-with-callback'; // allows to use callback with React useState

var qs = require('qs');

function DateSelect(props) {

    const [date, setDate] = useStateWithCallbackLazy(undefined)
    const [calenderOpened, setCalenderOpened] = useState(false)
    const [filterDate, setFilterDate] = useState(null)

    function handleDateChange(date) {
        var newDate = ''
        console.log(date)
        if (date != null) {
            var newDate = new Date(date)
            var newDate2 = new Date(newDate.setDate(newDate.getDate()))
            var newDate3 = newDate2.toISOString().split('T')[0]
            setDate(newDate3)
        } else {
            setDate(newDate, (date) => {
                handleSearch(date)
            })
        }
    }

    function handleSearch(xdate) {
        const basepath = window.location.pathname
        var extrapath = '?date=' + date
        if (xdate === '') {
            extrapath = '?date='
        }
        const fullurl = extrapath
        props.history.push(fullurl)
    }

    function checkDate(date) {
    }

    useEffect(() => {
        if (props.uiDate !== '') {
            setFilterDate(props.uiDate)
        } else {
            setFilterDate(null)
        }
     }, [props.uiDate])

    const dateFormat = 'YYYY-MM-DD'

    function sayOpen(open) {
        setCalenderOpened(!calenderOpened)
    }

    function selectAllDates() {
        setCalenderOpened(!calenderOpened)
        setDate('', (date) => {
            handleSearch(date)
        })
    }

    return(
    <div style={{marginLeft:'14px'}}>
        <Row>
            <ConfigProvider locale={locale}>
                <DatePicker onChange={date => handleDateChange(date)}
                style={{borderRadius:'30px', marginRight: '8px'}} bordered={true}
                placeholder="Vali kuupäev"
                renderExtraFooter={() => (<Button type='primary' shape='round' onClick={() => selectAllDates()}>Kõik päevad</Button>)}
                onOpenChange={(open) => sayOpen(open)}
                open = {calenderOpened}
                />
            </ConfigProvider>
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={() => handleSearch()}/>
        </Row>
        {filterDate ?
        <Tag style={{backgroundColor:'lightgrey', borderRadius:'15px', marginTop: '8px'}}>Näita: {filterDate}</Tag>
        :
        <></>
        }

    </div>
    )
}

function ShowAllDatesButton(props) {

    function selectAllDates() {

    }

    return (
        <div>
            <Button type='primary' shape='round' onClick={() => selectAllDates()}>Kõik päevad</Button>
        </div>
    )
}

export default withRouter(DateSelect);
