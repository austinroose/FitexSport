import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Style.css';

const { Option } = Select;

class RegistrationForm extends React.Component {

  onFinish = values => {
    this.props.onAuth(
        values.userName,
        values.email,
        values.password,
        values.confirm
        );
    this.props.history.push('/home');
  };

  render () {
  return (
    <div className='loginPage'>
    {
        <div className='loginForm'>
        <Form
          name="register"
          onFinish={this.onFinish}
          scrollToFirstError
          >
          <Form.Item
            name="userName"
            rules={[
                     {
                        required: true,
                        message: 'Please input your Username!',
                     },
            ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Kasutaja nimi" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Parool"/>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Parool uuesti"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Loo konto
            </Button>
          </Form.Item>
          Või
            <NavLink
                style={{marginRight: '10px'}}
                to='/login/'> logi sisse
            </NavLink>

        </Form>
        </div>
        }
    </div>
  );
  }
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);