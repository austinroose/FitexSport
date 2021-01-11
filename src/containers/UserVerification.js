import React from 'react';
import {Form, Input, Button, Alert} from 'antd';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import axios from '../axios';
import * as actions from '../store/actions/auth';
import * as emailExistence from 'email-existence';

class UserVerificationForm extends React.Component {

    state = {
        useremail: null,
        alert: false
    }

    onFinish = values => {
        const verifyemail = values.email
        axios.get(`/api/profilebyemail/${verifyemail}`)
            .then(res => {
                if (res.data != undefined) {
                    this.setState({
                        alert: true
                    })
                }
            })
            .catch(error => {
                const verifyToken = generate_token(6);
                this.props.verify(
                    values.email,
                    values.userName,
                    verifyToken,
                )
                const email = values.email
                axios.post('/api/verificationkey/create', {
                    useremail: email,
                    token: verifyToken,
                })
                .then(res => {
                    console.log(res)
                    this.setState({
                        useremail: email
                    }, () => console.log('usremail', this.state.useremail));
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
    )}
}

function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmno6pqrst4uvwx6yzABCD1EFGH4IJKL3MNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

const mapDispatchToProps = dispatch => {
    return {
        verify: (Email, username, verifytoken) => dispatch(actions.verifyUsersEmail(Email, username, verifytoken))
    }
}

export default connect(null, mapDispatchToProps)(UserVerificationForm);