import React from 'react';
import {Form, Input, Button, Alert} from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import axios from '../axios';

class UserVerificationForm extends React.Component {

    state = {
        useremail: null,
        alert: false
    }

    onFinish = values => {
        var verifyemail = values.email
        var user_name = values.userName
        axios.get(`/api/profilebyemail/${verifyemail}`)
            .then(res => {
                if (res.data != undefined) {
                    this.setState({
                        alert: true
                    })
                }
            })
            .catch(error => {
                axios.post('/api/verificationkey1/create', {
                    email: verifyemail,
                    username: user_name
                })
                .then(res => {
                    console.log(res)
                    this.setState({
                        useremail: verifyemail
                    });
                })
                .catch(error => console.log(error))
            })

    }

    render(){
        return(
            <div>
            {
            this.state.alert ?
            <Alert
                message="Antud emaili alt on juba kasutaja loodud"
                type="error"
                closable
                style= {{marginBottom: '10px', width:'350px'}}
            />
            :
            <span></span>
            }
                <Form
                name="register"
                onFinish={this.onFinish}
                style={{width:'350px', backgroundColor:'white', padding:'20px', borderRadius:'10px'}}
                >
                <Form.Item
                    name="email"
                    rules={[
                            {
                                required: true,
                                message: 'Palun sisestage email',
                            },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" style= {{borderRadius: '15px'}} />
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
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Kasutajanimi" style= {{borderRadius: '15px'}}/>
                </Form.Item>
                <Form.Item>
                    <Button style={{marginRight: '10px'}} type="primary" htmlType="submit" shape="round">
                        Kinnita email
                    </Button>
                </Form.Item>
                <span> Sisestatud email peab olema aktiivne. Selle kaudu toimub hiljem teie konto aktiveerimine.</span>
            </Form>
            {
                this.state.useremail ?
                <Button shape="round" type="primary" style={{marginTop: '15px'}}>
                    <Link to={`/emailverification/${this.state.useremail}`}> Jätka konto loomist </Link>
                </Button>
                :
                <span></span>
            }
            </div>
        )
    }
}

export default UserVerificationForm;