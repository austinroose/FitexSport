import React from 'react';
import axios from '../axios';
import { Card } from 'antd';
import { connect } from 'react-redux';

const { Meta } = Card;

class CoachProfile extends React.Component {

    state= {
        profile: {}
    }

    componentDidMount() {
        const profileID = this.props.match.params.coachUsername
        axios.get(`/api/coachprofile/${profileID}`, {headers:{'Authorization' : this.props.token}})
            .then(res => {
                this.setState({
                    profile: res.data
                });
            })
    }



    render() {
    return(
        <div>
            <h1 style={{fontSize: '30px', marginLeft:'4px'}}>Treeneri profiil</h1>
            <Card
                hoverable
                style={{ width: '300px', borderRadius: '20px', marginBottom: '10px', marginRight: '20px' }}
                cover={<img alt={this.state.profile.image} src={this.state.profile.image} style={{ borderRadius: '20px'}}/>}
            >
                <Meta title={this.state.profile.name} description=<div><span>Spordiala: {this.state.profile.sport}</span><br></br>
                <span>Email: {this.state.profile.email}</span><br></br>
                <span>Elukoht: {this.state.profile.location}</span><br></br>
                </div> />
            </Card>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(CoachProfile);