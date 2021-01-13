import React from 'react';
import axios from '../axios';
import { Collapse, Card, Row, Button, Typography, Popconfirm } from 'antd';

import ProfileForm from '../components/ProfileForm';

import PictureUpload from '../components/ProfilePicture'

import { connect } from 'react-redux';

const { Panel } = Collapse;

const { Meta } = Card;

const {Paragraph} = Typography

function callback(key) {
  console.log(key);
}


class Profile extends React.Component {

    state = {
        profile: {}
    }

    componentDidMount() {
            const profileID = this.props.token
            axios.get(`/api/profile/${profileID}`)
                .then(res => {
                    this.setState({
                        profile: res.data
                    });
                    console.log(res.data)
                })


    }

    componentDidUpdate(prevProps) {
        if(prevProps != this.props){
            const profileID = this.props.token
            axios.get(`/api/profile/${profileID}`)
                .then(res => {
                    this.setState({
                        profile: res.data
                    });
                    console.log(res.data)
                })
        }
    }

    onDeleteAccount() {
        console.log('kustuta konto')
    }


    render() {
        return(
            <div>
            {this.props.isAuthenticated ?
            <div>
                <Row>
                    <Card
                        hoverable
                        style={{ width: '270px', borderRadius: '20px', marginBottom: '10px', marginRight: '20px' }}
                        cover={<img alt={this.state.profile.image} src={this.state.profile.image} style={{ borderRadius: '20px'}}/>}
                    >
                        <Meta title={this.state.profile.name} description=<div><span>Spordiala: {this.state.profile.sport}</span><br></br>
                        <span>Email: {this.state.profile.email}</span><br></br>
                        <span>Elukoht: {this.state.profile.location}</span><br></br>
                        </div> />
                    </Card>
                    <PictureUpload />
                </Row>
                <Collapse defaultActiveKey={['0']} onChange={callback} style={{ marginBottom: '10px', borderRadius: '10px'}}>
                    <Panel header="Uuenda profiili andmeid" key="1">
                        <ProfileForm profile={this.state.profile}/>
                        <Popconfirm
                            title="Kinnita konto kustutamine"
                            onConfirm={this.onDeleteAccount}
                            okText="Jah"
                            cancelText="Tühista"
                          >
                        <Button shape='round' type='primary' danger style={{marginBottom: '15px', marginTop:'10px'}}>
                            Kustuta konto
                        </Button>
                        </Popconfirm>
                        <Paragraph>Antud nupuga saate taodelda oma konto ja sellega seotud andmete kustutamise meie keskkonnast.
                        Konto ja sellega seotud andmete täielik kustutamine võtab orienteeruvalt aega 24h.
                        </Paragraph>
                    </Panel>
                </Collapse>
            </div>
            :
            <div>
            </div>
            }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Profile);