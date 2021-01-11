import React from 'react';
import axios from '../axios';
import {connect} from 'react-redux';
import { Card, Alert } from 'antd';

class UserRegistrations extends React.Component {

    state = {
        registrations: []
    }

    orderRegistrationsByTime(data) {
        data.sort(function(a,b){ //sea postitused jarjekorda alates nooremast kuni hilisemani
            var dateA = new Date(a.event_time)
            var dateB = new Date(b.event_time)
            if(dateA<dateB){
                return -1;
            }
            if(dateA>dateB){
                return 1;
            }
            return 0;
        })
        this.setState({
            registrations: data
        })
    }

    componentDidMount() {
        const userID = this.props.token
        var d = new Date()
        var datetime = d.toISOString().split('T')[0]
        var enddatetime = d.setDate(d.getDate() + 14);
        var enddatetime2 = new Date(enddatetime)
        var enddatetime3 = enddatetime2.toISOString().split('T')[0]
        axios.get(`/api/userregistrationslist/${userID}?event_date__gte=${datetime}&event_date__lte=${enddatetime3}`)
            .then(res => {
                this.orderRegistrationsByTime(res.data)
                console.log('Kasutaja regamised1', res.data)
            });
    }

    componentDidUpdate(prevProps) {
        if(prevProps != this.props){
            const userID = this.props.token
            var d = new Date()
            var datetime = d.toISOString().split('T')[0]
            var enddatetime = d.setDate(d.getDate() + 14); // fetch trainings up to 2 weeks from now
            var enddatetime2 = new Date(enddatetime)
            var enddatetime3 = enddatetime2.toISOString().split('T')[0]
            axios.get(`/api/userregistrationslist/${userID}?event_date__gte=${datetime}&event_date__lte=${enddatetime3}`)
                .then(res => {
                    this.orderRegistrationsByTime(res.data)
                    console.log('Kasutaja regamised1', res.data)
                });
        }
    }

    render(){
        return(<ListView reg={this.state.registrations} />)
    }
}

class TrainingCard extends React.Component {

    state = {
        training: {}
    }

    componentDidMount() {
        const trainingID = this.props.id.event
            axios.get(`/api/${trainingID}/`)
                .then(res => {
                    this.setState({
                        training: res.data
                    })
                })
    }

    render(){
    return(<div className='trainingCard' >
    <Card title={this.state.training.title} style={{ width: 250, borderRadius:'20px'}}>
        <p>Toimumisaeg: {this.state.training.date}; {this.state.training.starts1} - {this.state.training.ends1} </p>
        <p>Spordiala: {this.state.training.sport}</p>
        <p>Asukoht: {this.state.training.location}</p>
        <p><a href={`/trainingsdetail/${this.state.training.id}`}>Link treeningule</a></p>
    </Card>
    </div>)
    }

}

class ListView extends React.Component {

    state = {
       regs: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reg !== this.props.reg) {
            const reg = this.props.reg
            this.setState({
                regs: reg.map((registration) => <TrainingCard key={registration.event} id={registration} />)
            })
        }

    }

    render(){
        return(<div>
                <Alert message="Kuvatud on kahe järgneva nädala treeningud" type="info" style={{width:'300px', borderRadius: '20px'}}/>
                <ul>{this.state.regs}</ul>
              </div>
              )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(UserRegistrations);

//const Event = ({id}) => (
//    <h1>yy{id.event}</h1>
//)