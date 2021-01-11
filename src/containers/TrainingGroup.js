import React from 'react';
import { Link, BrowserRouter as Router  } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from '../axios';
import GroupBaseRouter from './grouprouter';
import TrainingGroupLayout from './TrainingGroupLayout'

class TrainingGroup extends React.Component {

    state = {
        groupData: {}
    }

    componentDidMount() {
        const groupID = this.props.match.params.groupID
        axios.get(`/api/group/${groupID}`)
            .then(res => {
                this.setState({groupData: res.data})
                console.log('res data for training group', res.data)
            })
            .catch(err => console.error(err))
    }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props){
            const groupID = this.props.match.params.groupID
            axios.get(`/api/group/${groupID}`)
                .then(res => {
                    this.setState({groupData: res.data})
                    console.log('res data for training group', res.data)
                })
                .catch(err => console.error(err))
        }
    }

    render() {
        return(
            <div>
                <Router basename={`/groups/${this.props.match.params.groupID}`}>
                    <TrainingGroupLayout groupID={this.state.groupData.id} {...this.props}>
                        <GroupBaseRouter group={this.state.groupData} token={this.props.isAuth}/>
                    </TrainingGroupLayout>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(TrainingGroup);