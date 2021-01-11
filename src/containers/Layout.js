import React, { useState } from 'react';
import axios from '../axios';
import { Avatar, Layout, Menu, Breadcrumb, Affix, Tooltip, Row, Space } from 'antd';
import './Style.css';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Icon, { UserOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends React.Component {

    state = {
        profile: {},
        token: null
    }

    handleRefresh() {
        window.location.reload(true);
    }


    componentDidMount() {
        const profileID = this.props.token
        axios.get(`/api/profile/${profileID}`)
            .then(res => {
                this.setState({
                    profile: res.data
                });
                console.log(res.data);
            })
    }

    render () {
        return (
              <Layout className="layout">

                <Header className="mainMenu">
                  <div className="logo" />
                  <Menu className="mainMenu" theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

                  {
                    this.props.isAuthenticated ?

                    <Menu.Item key="6" onClick={this.props.logout} style={{fontSize: '14px'}}>
                        <Link to="/login">
                            Logi välja
                        </Link>
                    </Menu.Item>
                    :
                    <>
                    <Menu.Item key="2" style={{fontSize: '14px'}}>
                        <Link to="/login">Logi sisse</Link>
                    </Menu.Item>
                    <Menu.Item key="1" style={{fontSize: '14px'}}>
                        <Link to="/">Kodu</Link>
                    </Menu.Item>
                    <Menu.Item key="3" style={{fontSize: '14px'}}>
                        <Link to="/trainings/search">Treeningud</Link>
                    </Menu.Item>
                    <Menu.Item key="4" style={{fontSize: '14px'}}>
                        <Link to="/group/search">Grupid</Link>
                    </Menu.Item>
                    </>
                  }
                  {
                    this.props.isAuthenticatedAndIsCoach ?

                    <><Menu.Item key='1' style={{fontSize: '14px'}}>
                        <Link to="/mytrainings">Minu treeningud</Link>
                    </Menu.Item>
                    <Menu.Item key="2" style={{fontSize: '14px'}}>
                        <Link to="/coach/mygroups">Grupid</Link>
                    </Menu.Item>
                    <Menu.Item key="3" style={{fontSize: '14px'}}>
                        <Link to="/mycontrolpanel">Minu paneel</Link>
                    </Menu.Item></>
                    :
                    <>
                    </>
                  }
                  {
                    this.props.isAuthenticatedAndIsNotCoach ?
                    <>
                    <Menu.Item key="3" style={{fontSize: '14px'}}>
                        <Link to="/myhome">Minu kodu</Link>
                    </Menu.Item>
                    <Menu.Item key="4" style={{fontSize: '14px'}}>
                        <Link to="/user_groups">Minu grupid</Link>
                    </Menu.Item>
                    <Menu.Item key="1" style={{fontSize: '14px'}}>
                        <Link to="/trainings/search">Treeningud</Link>
                    </Menu.Item>
                    <Menu.Item key="2" style={{fontSize: '14px'}}>
                        <Link to="/group/search">Grupid</Link>
                    </Menu.Item>
                    </>
                    :
                    <></>
                  }

                  {
                    this.props.isAuthenticated ?

                    <Menu.Item style={{float: 'right', fontSize: '14px'}} >
                        <Row>
                        <span style={{marginRight: '10px'}}>Konto</span>
                        <Link to="/profile"><ProfileImage /></Link>
                        </Row>
                    </Menu.Item>
                    :
                    <></>
                  }
                  </Menu>
                </Header>
                <Layout>
                    <Content style={{ padding: '10px 20px'}}>
                      <div className="site-layout-content">
                        {this.props.children}
                      </div>
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                Copyright © 2020, FITEX <br/>

                <p style={{ float: 'center', marginLeft: '4px', marginTop:'10px' }}><Link to="/coach_info">
                Soovid platvormil treeneriks hakata?</Link></p>
                <div className='footerSection1'>
                    <p><Link to='/terms'>Terms of service</Link></p>
                    <p className='privacyLabel'><Link to='/privacy-policy'>Privacy Policy</Link></p>
                </div>
                </Footer>
              </Layout>
            );
    }

}

class ProfileImage extends React.Component {
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
                console.log(res.data);
            })
    }
    render() {
        return(
            <div><Avatar size={40} icon={<UserOutlined style={{fontSize: '20px'}}/>} /></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));

//<Breadcrumb style={{ margin: '16px 0' }}>
//                        <Breadcrumb.Item><Link to="/">Kodu</Link></Breadcrumb.Item>
//                        <Breadcrumb.Item><Link to="/trainings">Treeningud</Link></Breadcrumb.Item>
//                      </Breadcrumb>