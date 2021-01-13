import React from 'react';
import { Form, Input, Button, Spin, Checkbox, Divider, Row } from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone,
FacebookOutlined } from '@ant-design/icons';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './Style.css';
import axios from '../axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
  state = {
    errorMessage: null,
    notValidLogin: null,
    stayLoggedInChecked: false,
    checkingUserStatus: false,
  }

  onFinish = values => {
    this.props.onAuth(values.username, values.password, values.rememberMe);
    this.setState({
        errorMessage: null,
        notValidLogin:'Sisestatud parool või kasutajanimi on vale',
    })
  };

    componentDidUpdate(prevProps) {
        if (prevProps.token != this.props.token) {
            this.setState({checkingUserStatus:true})
            this.setState({errorMessage: null})
            const profileID = this.props.token
            axios.get(`/api/profile/${profileID}`)
                .then(res => {
                    var coach = res.data.is_coach
                    console.log('adfwqefqfqf', res.data.is_coach)
                    if (coach === false) {
                        this.props.history.push('/trainings/search');
                    } else {
                        this.props.history.push('/mycontrolpanel');
                    }
                    this.setState({checkingUserStatus:false})
                })
                .catch(err => console.error('error', err))
        }
    }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    console.log('error sisse', errorInfo.errorFields[0].errors)
    var errorinfo = errorInfo.errorFields[0].errors
    this.setState({
        notValidLogin: null,
        errorMessage: 'Väli ei tohi olla tühi',

    })
    this.props.history.push('/login/');
  };

  responseGoogleLogin = (response) => {
    console.log('response', response);
    console.log('profile', response.profileObj)
    this.props.onSocialAuthGoogle(response.accessToken)
  }

  responseGoogleLoginFailed = (response) => {
    this.setState({errorMessage:'Ilmnes tõrge Google autentimisega'})
  }

  responseFacebookLogin = (response) => {
    console.log('response', response);
    this.props.onSocialAuthFacebook(response.accessToken)
  }

  render() {
    let errorMessage = null;
    if (this.state.errorMessage) {
        errorMessage = (
            <p style={{color: 'red'}}>{this.state.errorMessage}</p>
        );
    }

    let errorValidation = null;
    if (this.state.notValidLogin) {
        errorMessage = (
            <p style={{color: 'red'}}>{this.state.notValidLogin}</p>
        );
    }
    return (
        <div className='loginPage'>
            {
                this.props.loading ?

                <Spin indicator={antIcon} />

                :
                <>
                {this.state.checkingUserStatus === true &&
                    <Spin indicator={antIcon} />
                }
                {this.state.checkingUserStatus === false &&
                    <div className='loginForm'>
                    <img className='loginLogo' src='https://i.ibb.co/zP5g0kt/fb-business-transparent.png' />
                    {errorMessage}
                    <Form
                          name="normal_login"
                          className="login-form"
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={this.onFinish}
                          onFinishFailed={this.onFinishFailed}
                        >
                          <Form.Item
                            name="username"
                            rules={[
                              {
                                required: true,
                                message: 'Palun sisestage kasutjanimi',
                              },
                            ]}
                            className='loginInput'
                          >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Kasutajanimi"
                            size='large' style={{borderRadius: '15px'}}/>
                          </Form.Item>
                          <Form.Item
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: 'Palun sisestage parool!',
                              },
                            ]}
                            className='loginInput'
                          >
                            <Input.Password
                              prefix={<LockOutlined className="site-form-item-icon" />}
                              placeholder="Parool"
                              size='large'
                              style={{borderRadius: '15px'}}

                            />
                          </Form.Item>
                          <Form.Item
                          name='rememberMe'
                          style={{marginTop:'-17px', marginLeft:'3px'}}
                          valuePropName='checked'>
                            <Checkbox style={{fontSize:'13px'}}>Jäta mind meelde</Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <div style={{display: 'flex', alignItems:'centre', justifyContent:'center',
                            flexDirection: 'row'}}>
                                <Button style={{marginRight: '10px', borderRadius: '20px'}} type="primary" htmlType="submit" className="login-form-button" size='large'>
                                  Logi sisse
                                </Button>
                            </div>
                          </Form.Item>
                    </Form>
                    <Divider plain style={{marginBottom:'27px'}}>Või kasuta</Divider>
                        <GoogleLogin
                            clientId="14183693331-6cnrphkhk7u4ge4hcqptg917tn6g04tb.apps.googleusercontent.com"
                            onSuccess={this.responseGoogleLogin}
                            onFailure={this.responseGoogleLoginFailed}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                            <Button size='large' style={{backgroundColor:'#DB4437', color:'white', fontSize:'15px',
                            borderRadius:'6px', width: '200px'}}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            icon={<FaGoogle style={{fontSize:'17px', marginRight:'8px', color:'white'}}/>}>
                                Google
                            </Button>
                            )}/>
                        <div style={{marginTop:'10px'}}>
                        <FacebookLogin
                          textButton="Facebook"
                          appId= "2725688447681904"
                          fields="name,email,picture"
                          scope="public_profile,email"
                          autoLoad={false}
                          callback={this.responseFacebookLogin}
                          redirectUri="https://www.fitex.ee"
                          render={renderProps => (
                            <Button size='large' style={{backgroundColor:'#4267B2', color:'white', fontSize:'15px',
                            borderRadius:'7px', width: '200px'}}
                            onClick={renderProps.onClick} isDisabled={renderProps.isDisabled}
                            icon={<FaFacebookF style={{fontSize:'17px', marginRight:'8px'}}/>}>
                                Facebook
                            </Button>
                          )}
                        />
                        </div>
                        <div style={{marginTop:'15px'}}>
                        <span>
                        Pole veel kontot?
                        <NavLink
                            style={{left: '0'}}
                            to='/signup/'> Liitu
                        </NavLink>
                        </span>
                        </div>
                    </div>

                }

                </>
            }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        iscoach: state.auth.iscoach
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, rememberMe) => dispatch(actions.authLogin(username, password, rememberMe)),
        onSocialAuthGoogle: (accessToken) => dispatch(actions.socialLoginGoogle(accessToken)),
        onSocialAuthFacebook: (accessToken) => dispatch(actions.socialLoginFacebook(accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);