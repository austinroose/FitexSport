import React, { Suspense } from 'react';
import axios from '../axios';
import { connect } from 'react-redux';
import Trainings from '../components/Training';
import SearchFilterBar from '../components/SearchFilterBar';
import './Style.css';
import { Drawer, Button, Pagination } from 'antd';
import * as actions from '../store/actions/filter';
import MainPageSearch from '../components/MainPageSearching';
import {Helmet} from 'react-helmet';
import helloButton from '../components/Test.jsx';

var qs = require('qs');

function getDate() {
    const today = new Date()
    const time1 = today.toISOString().split("T")[0]
    return time1
}

class SearchTrainingList extends React.Component {

    showDrawer() {
        this.setState({
            drawer: true,
        })
    }

    closeDrawer() {
        this.setState({
            drawer: false,
        })
    }

    constructor() {
        super();
        this.state = {
            trainings: [],
            loaded: false,
            drawer: false,
            pagesCount: null,
            currentPage: 1,
        };
        this.showDrawer = this.showDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.changePage = this.changePage.bind(this)
    }

    changePostArray(data) {
        const posts = data
        const today = new Date()
        today.setHours(3,0,0,0)
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
        this.setState({
            loaded: true,
            trainings: withouttoday
        });
    }

    state = {
        trainings: []
    }

    changePage(page) {
        console.log('page', page)
        this.setState({
            currentPage: page,
        });
    }

    componentDidMount() {
        var time = getDate()
        var location3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).location
        if (location3 == undefined){
            location3 = ''
        }
        var sport3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sport
        if (sport3 == undefined){
            sport3 = ''
        }
        var date3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).date
        if (date3 == undefined){
            date3 = ''
        }
        var coachname3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).coachName
        if (coachname3 == undefined){
            coachname3 = ''
        }
        axios.get(`/api/trainings?stringdate__gte=${time}&city=${location3}&sport=${sport3}&stringtime2=${date3}&organizername=${coachname3}&group=avalik&page=${this.state.currentPage}`)
            .then(res => {
                const data = res.data
                this.changePostArray(data.results)
                console.log(res.data);
                const pagesCount = (Math.ceil(res.data.count / 10) * 10)
                this.setState({pagesCount: pagesCount})
            })
        if (this.props.filter.sport === null && sport3 !== '') {
            this.props.sportChange(sport3)
        }
        if (this.props.filter.location === null && location3 !== '') {
            this.props.locationChange(location3)
        }
        if (this.props.filter.date === null && date3 !== '') {
            this.props.dateChange(date3)
        }
        if (this.props.filter.coachName === null && coachname3 !== '') {
            this.props.coachNameChange(coachname3)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props || prevState.currentPage !== this.state.currentPage) {
            var time = getDate()
            var location3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).location
            if (location3 == undefined){
                location3 = ''
            }
            var sport3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sport
            if (sport3 == undefined){
                sport3 = ''
            }
            var date3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).date
            if (date3 == undefined){
                date3 = ''
            }
            var coachname3 = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).coachName
            if (coachname3 == undefined){
                coachname3 = ''
            }
            axios.get(`/api/trainings?stringdate__gte=${time}&city=${location3}&sport=${sport3}&stringtime2=${date3}&organizername=${coachname3}&group=avalik&page=${this.state.currentPage}`)
                .then(res => {
                    const data = res.data
                    this.changePostArray(data.results)
                    const pagesCount = (Math.ceil(res.data.count / 10)) * 10
                    this.setState({pagesCount: pagesCount})
                })
            if (this.props.filter.sport === null && sport3 !== '') {
                this.props.sportChange(sport3)
            } else if (this.props.filter.sport !== null && sport3 == '') {
                const sport = null
                this.props.sportChange(sport)
            }
            if (this.props.filter.location === null && location3 !== '') {
                this.props.locationChange(location3)
            } else if (this.props.filter.location !== null && location3 == '') {
                const location = null
                this.props.locationChange(location)
            }
            if (this.props.filter.date === null && date3 !== '') {
                this.props.dateChange(date3)
            } else if (this.props.filter.date !== null && date3 == '') {
                const date = null
                this.props.dateChange(date)
            }
            if (this.props.filter.coachName === null && coachname3 !== '') {
                this.props.coachNameChange(coachname3)
            } else if (this.props.filter.coachName !== null && coachname3 == '') {
                const coachName = null
                this.props.coachNameChange(coachName)
            }
            this.closeDrawer()
        }
    }

        render() {
                return (
                    <div className='userGroupsPage'>
                        <Helmet>
                            <title>Treening, Mis Sobib Sulle!</title>
                            <meta name="description" content="#1 treeningute online keskkond Eestis! Leia omale sobiv treening kõigest mõne sekundiga." />
                        </Helmet>
                        <SearchFilterBar onClick={this.showDrawer}/>
                        <Trainings data={this.state.trainings} pagesCount={this.state.pagesCount}/>
                        <Pagination current={this.state.currentPage} total={this.state.pagesCount}
                        onChange={(page) => this.changePage(page)} />
                        <Drawer
                            title="Muuda otsingut"
                            placement="top"
                            height={270}
                            closable={true}
                            onClose={this.closeDrawer}
                            visible={this.state.drawer}
                          >
                            <MainPageSearch />
                        </Drawer>
                        <helloButton></helloButton>
                    </div>
                 );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dateChange: (date) => dispatch(actions.filterByDate(date)),
        sportChange: (sport) => dispatch(actions.filterBySport(sport)),
        locationChange: (location) => dispatch(actions.filterByLocation(location)),
        coachNameChange: (name) => dispatch(actions.filterByCoach(name))
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        filter: state.filter
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTrainingList);