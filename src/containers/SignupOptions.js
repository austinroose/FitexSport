import React, {useState, useEffect} from 'react';
import {Button, Spin} from 'antd';
import {Link} from 'react-router-dom';
import {MailOutlined, LoadingOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import './Style.css';
import axios from '../axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import * as actions from '../store/actions/auth';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function SignupOptions(props) {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (props.token !== undefined && props.token !== null) {
            setLoading(true)
            axios.get(`/api/profile/${props.token}`)
                .then(res => {
                    var coach = res.data.is_coach
                    if (coach === false) {
                        this.props.history.push('/user_groups');
                    } else {
                        this.props.history.push('/mycontrolpanel'); // tegelt seda pmst ple vaja, sest regamisel ei saa olla juba treener
                    }
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
    }, [props.token])

    const responseGoogleLogin = (response) => {
        props.onSocialAuthGoogle(response.accessToken)
        console.log('response')
    }

    const responseGoogleLoginFailed = (response) => {
        alert(response)
    }

    const responseFacebookLogin = (response) => {
        props.onSocialAuthFacebook(response.accessToken)
    }

    return (
    <div className='signupOptionsPage'>
        {loading === true &&
            <Spin indicator={antIcon} />
        }
        {loading === false &&
            <div className='signupOptionsContainer'>
                <h1 className='signupTitle'>Loo konto</h1>
                <Link to='/signup_email'>
                <Button className='signupButton' style={{borderRadius: '10px'}}
                icon={<MailOutlined />} type='primary' size='large'>Email</Button>
                </Link>
                <GoogleLogin
                    clientId="14183693331-6cnrphkhk7u4ge4hcqptg917tn6g04tb.apps.googleusercontent.com"
                    onSuccess={responseGoogleLogin}
                    onFailure={responseGoogleLoginFailed}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                    <Button size='large' style={{backgroundColor:'#DB4437', color:'white', fontSize:'15px',
                    borderRadius:'15px', width: '150px'}}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    icon={<FaGoogle style={{fontSize:'17px', marginRight:'8px', color:'white'}}/>}>
                        Google
                    </Button>
                    )}/>
                <div style={{marginTop:'15px'}}>
                <FacebookLogin
                  textButton="Facebook"
                  appId= "2725688447681904"
                  fields="name,email,picture"
                  scope="public_profile,email"
                  autoLoad={true}
                  callback={responseFacebookLogin}
                  render={renderProps => (
                    <Button size='large' style={{backgroundColor:'#4267B2', color:'white', fontSize:'15px',
                    borderRadius:'15px', width: '150px'}}
                    onClick={renderProps.onClick} isDisabled={renderProps.isDisabled}
                    icon={<FaFacebookF style={{fontSize:'17px', marginRight:'8px'}}/>}>
                        Facebook
                    </Button>
                  )}
                />
                </div>
            </div>
        }

    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSocialAuthGoogle: (accessToken) => dispatch(actions.socialLoginGoogle(accessToken)),
        onSocialAuthFacebook: (accessToken) => dispatch(actions.socialLoginFacebook(accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupOptions);