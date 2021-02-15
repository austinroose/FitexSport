import React from 'react';
import { Card, Form, Button, Input, Alert } from 'antd';
import axios from '../axios';
import { Link } from 'react-router-dom';

class KeyConfirmForm extends React.Component {

    state = {
        verified: false,
        wrongkey: false,
        verifkey: null,
    }

    // kui kasutaja ei ole ära tuvastanud enda emaili ehk pole sisestanud õiget parooli, siis võib
    // kustutada dbst vastava tokeniga andmed
    componentWillUnmount() {
        if (this.state.verified == false) {
            const userEmail = this.props.match.params.userEmail
            axios.delete(`/api/verificationkey/delete/${userEmail}`)
                .then(res => console.log('delete result', res.data))
                .catch(error => console.log('delete error', error))
        }
    }

    onFinish = values => {               
        // check if enter token is valid verification token 
        var verifKey = values.key
        var userEmail = this.props.match.params.userEmail
        axios.post(`/api/verificationkey/check/${userEmail}`, {
            key: verifKey
        })
            .then((res) => {
                axios.patch(`/api/verificationkey/update/${userEmail}`, {
                    verified: true
                })
                    .then((res) => {
                        this.setState({
                            verified: true,
                            wrongkey: false,
                            verifkey: verifKey,
                        })
                    })
            })
            .catch((err) => {
                alert('Vale kood')
                this.setState({
                    wrongkey: true,
                })
            })
    }

    render(){
        return(
        <div><Card title='Konto kinnitamine' style={{ width: 300, borderRadius: '20px' }}>
            <p>Palun sisestage siia Teie meilile saabunud kood</p>
            {
            this.state.wrongkey ?
                <Alert message="Sisestatud kood on vale" type="error" showIcon style={{marginBottom:'10px'}}/>
            :
            <span></span>
            }
            <Form
                name='basic'
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="key"
                    rules={[{ required: true, message: 'Väli ei saa jääda tühjaks' }]}
                >
                    <Input style={{borderRadius: '15px'}}/>
                </Form.Item>
                <Form.Item>
                    <Button shape="round" type="primary" htmlType="submit">
                        Kinnita
                    </Button>
                </Form.Item>
            </Form>
            <ContinueButton verified={this.state.verified} veriftoken={this.state.verifkey}/>
        </Card>
        </div>)
    }
}

class ContinueButton extends React.Component {
    render() {
        return(<div>
        {
         this.props.verified ?
         <Button shape="round" type="primary">
            <Link to={`/usersignup/${this.props.veriftoken}`}>Jätka</Link>
         </Button>
         :
         <Button shape="round" type="primary" disabled>
            Jätka
         </Button>
        }
        </div>)
    }
}

export default KeyConfirmForm;