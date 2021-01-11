import React from 'react';
import axios from 'axios';
import { Avatar } from 'antd';

class UserIcon extends React.Component {

    state = {
        profile: {}
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            const profileID = this.props.profileID
            axios.get(`/api/profile/${profileID}`)
                .then((res) => {
                    this.setState({
                        profile: res.data
                    })
                })
        }
    }

    render(){
        return(<><Avatar src={this.state.profile.image} /></>)
    }
}

export default UserIcon;