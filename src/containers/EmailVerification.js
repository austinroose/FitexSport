import React from 'react';
import { Card, Form, Button, Input, Alert } from 'antd';
import axios from '../axios';
import { Link } from 'react-router-dom';

class KeyConfirmForm extends React.Component {

    state = {
        verifkey: {},
        verified: false,
        userdoesexist: false,
        wrongkey: false,
    }

    componentDidMount() {
        const userID = this.props.match.params.userEmail
        axios.get(`/api/verificationkey/get/${userID}`)
            .then(res => {
                this.setState({
                    verifkey: res.data
                }, () => this.changeState())
                console.log('verificationdata', res.data)
            })
    }

    // kui kasutaja ei ole ära tuvastanud enda emaili ehk pole sisestanud õiget parooli, siis võib
    // kustutada dbst vastava tokeniga andmed
    componentWillUnmount() {
        if (this.state.verified == false) {
            axios.delete(`/api/verificationkey/delete/${this.state.verifkey.useremail}`)
                .then(res => console.log('delete result', res.data))
                .catch(error => console.log('delete error', error))
        }
    }

    changeState = () => {
        console.log('changeState', this.state.verifkey)
        if (this.state.verifkey != undefined) {
            this.setState({
                userdoesexist: true
            })
        }else {
        }
    }

    onFinish = values => {
        if (values.key == this.state.verifkey.token) {
           this.setState({
               verified: true,
               wrongkey: false,
           }, () => console.log('verifiedchange', this.state.verified))
           const tokenID = this.state.verifkey.token
           axios.patch(`/api/verificationkey/update/${this.state.verifkey.token}`, {
               verified: true
           })
            .then(res => console.log('patch result', res))
            .catch(error => console.err(error));
        }
        else{
            this.setState({
                wrongkey: true,
            })
        }
    }

    render(){
    return(<div><Card title='Konto kinnitamine' style={{ width: 300, borderRadius: '20px' }}>
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
        {
         this.state.userdoesexist ?
         <ContinueButton verified={this.state.verified} veriftoken={this.state.verifkey.token}/>
         :
         <span></span>
        }
    </Card>
    </div>)}
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