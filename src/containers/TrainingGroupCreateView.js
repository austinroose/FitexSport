import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, Card, notification } from "antd";
import axios from "../axios";
import './Style.css'

const { Option } = Select;
const { TextArea } = Input

const FormItem = Form.Item

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Treeninggrupp loodud',
    description:
      'Gruppi saad näha "Minu grupid" valiku alt.',
  });
};


function TrainingGroupCreate(props) {
    const [notFilled, setNotFilled] = useState(false)
    const [coachName, setCoachName] = useState(null)
    var token = props.token

    useEffect(() => {
        async function getCoachData() {
            const result = await axios.get(`/api/profile/${props.token}`)
            const name = result.data.name
            setCoachName(name)
            console.log('groupdata')
        }
        getCoachData()
    }, [props])

    function onFailed() {

    }

    function handleFormSubmit(values) {
        console.log('values', values, token)
        var coach = token
        var name = values.name
        var sport = values.sport
        var description = values.description
        var location = values.location
        var coach_name = coachName
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: coach
        }
        async function postGroup() {
            const result = await axios.post('/api/traininggroups/create', {
                coach: coach,
                name: name,
                sport: sport,
                description: description,
                location: location,
                coach_name: coach_name,
                })
                openNotificationWithIcon('success')
        }
        postGroup()
    }



    return (
        <div>
        {
         props.isAuthenticatedAndIsCoach ?
         <div>
            <h1 style={{fontSize:'20px', marginLeft: '10px'}}>Uus grupp</h1>
            <Card bordered={false} className='groupCreateForm' style={{borderRadius: '20px'}}>
            < Form onFinish={(values) => handleFormSubmit(
                values)}
                onFinishFailed={onFailed}
                style={{marginLeft: '5px'}}
                >
                {
                notFilled ?
                <span style={{color: 'red'}}>Kõik väljad peavad olema täidetud</span>
                :
                <></>
                }
              <FormItem label="Pealkiri"
                        name ='name'
                        className='createFormInput'>
                <Input name="name" placeholder="..." style={{borderRadius:'15px'}}/>
              </FormItem>
              <FormItem label="Spordiala"
              name = 'sport'
              rules={[
                  {
                    required: true,
                  },
                ]}>
                <Select name="sport" style={{ width: 120 }}>
                    <Option value="jooks" >Jooks</Option>
                    <Option value="jõud" >Jõud</Option>
                    <Option value="crossfit" >Crossfit</Option>
                    <Option value="kardio" >Kardio</Option>
                </Select>
              </FormItem>
              <FormItem label="Asukoht"
              name = 'location'
              rules={[
                  {
                    required: true,
                  },
                ]}>
                <Select name="location" style={{ width: 120 }}>
                    <Option value="Tartu" >Tartu</Option>
                    <Option value="Tallinn" >Tallinn</Option>
                    <Option value="Pärnu" >Pärnu</Option>
                    <Option value="Viljandi" >Viljandi</Option>
                    <Option value="Muu" >Muu</Option>
                </Select>
              </FormItem>
              <FormItem label="Kirjeldus" name='description' className='createFormInput'>
                <TextArea name='description' placeholder='(Lühike grupi tutvustus)' style={{borderRadius:'15px'}}
                autoSize={{ minRows: 2, maxRows: 30 }} showCount maxLength={100} />
              </FormItem>
              <FormItem>
                 <Button type="primary" htmlType="submit" shape="round" size="large" style={{marginTop:'20px'}}>
                  Loo
                 </Button>
              </FormItem>
            </Form>
            </Card>
         </div>
         :
         <></>
        }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticatedAndIsCoach: state.auth.iscoach === true && state.auth.token !== null
    }
}

export default connect(mapStateToProps)(TrainingGroupCreate);