import React from 'react';
import { Form, Button, Input, Popover } from 'antd';
import axios from '../axios';
import {connect} from 'react-redux';
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth';

class UserSignupForm extends React.Component {

    state = {
        useremail: null,
        info: false
    }

    onFinish = values => {
        this.props.onAuth(
            values.userName,
            this.state.useremail,
            values.password,
            values.confirm,
            values.fullName
            );
        this.props.history.push('/');
    };

    componentDidMount() {
        const usertoken = this.props.match.params.token
        axios.get(`/api/verificationkeybytoken/get/${usertoken}`)
            .then(res => {
                if (res.data.verified === true && res.data.finished !== true) {
                    this.setState({
                        useremail: res.data.useremail,
                        info: true,
                    })
                } else {
                    this.setState({
                        info: false
                    })
                }
            })
            .catch((err) => {
                this.setState({
                        info: false
                })
            })
    }

    componentWillUnmount() {
        if (this.state.info == true) {
            const usertoken = this.props.match.params.token
            axios.patch(`/api/verificationkey/update/${usertoken}`, {
                finished: true
            })
            axios.delete(`/api/verificationkey/delete/${usertoken}`)
        }
        else{}
    }

    render(){
        return(
        <div>
        {
         this.state.info ?
         <div>
             <Form
              name="register"
              onFinish={this.onFinish}
              scrollToFirstError
              style={{width:'350px', backgroundColor:'white', padding:'20px', borderRadius:'10px'}}
              >
              <Form.Item>
                <span>Konto email: <b>{this.state.useremail}</b></span>
              </Form.Item>
              <Form.Item
                name="userName"
                rules={[
                         {
                            required: true,
                            message: 'Palun sisestage kasutajanimi',
                         },
                ]}
                >
                <div style={{display: 'flex'}}>
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{borderRadius:'10px'}} placeholder="Kasutajanimi" />
                  <Popover content={'Oluline! Valige meeldejääv kasutjanimi kuna seda kasutatakse hiljem sisse logimiseks'}>
                    <ExclamationCircleOutlined style={{fontSize: '15px', marginLeft: '5px' }}/>
                  </Popover>
                </div>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Palun sisestage parool!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} style={{borderRadius:'10px'}} placeholder="Parool"/>
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Parool uuesti"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Palun sisestage parool uuesti',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Kaks parooli ei ühti');
                    },
                  }),
                ]}
              >
                <Input.Password style={{borderRadius:'10px'}}/>
              </Form.Item>
              <Form.Item
                name="fullName"
                rules={[
                         {
                            required: true,
                            message: 'Palun sisestage enda täisnimi',
                         },
                ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{borderRadius:'10px'}} placeholder="Täisnimi" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" shape="round">
                  Loo konto
                </Button>
              </Form.Item>
             </Form>
         </div>
         :
         <span></span>
        }
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2, fullname) => dispatch(actions.authSignup(username, email, password1, password2, fullname))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSignupForm);
