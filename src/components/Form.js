import React from "react";
import { Form, Input, Button, Select, TimePicker, Row, DatePicker, ConfigProvider,
        Typography, notification, InputNumber, Checkbox, Card } from "antd";
import {connect} from 'react-redux';
import locale from 'antd/es/locale/et_EE';
import 'moment/locale/et';
import axios from "../axios";
import './Style.css'

const FormItem = Form.Item;

const { Option } = Select;
const { Text } = Typography
const { TextArea } = Input

const format = 'HH:mm'

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

function replace_date(date2, date1) {
    date1[0] = date2;
    var str = ",";
    var datex = date1[2];
    var kuupaev = datex.concat(str);
    date1[2] = kuupaev;
    return date1;
};

class CustomForm extends React.Component {

    openSuccessfulCreateNotificationWithIcon = type => {
      notification[type]({
        message: 'Treening loodud',
        description:
          'Et treeningut näha, mine "Minu treeningud" lehele.',
      });
    };

    openSuccessfulUpdateNotificationWithIcon = type => {
        notification[type]({
        message: 'Treening uuendatud',
        description:
          'Et treeningu uuendusi näha, värskenda lehekülge.',
        });
    }

    state = {
        starttime: '',
        endtime: '',
        date: '',
        datestring: '',
        organizeremail: '',
        organizername: '',
        timestring: '',
        timestring2: '',
        notFilled: false,
        city: '',
        groupSizeInputDisabled: false,
        checked_size: false,
        coachGroups: [],
        groupID: '',
        groupName: '',
        loadingGroups: false,
        shortDate: '',
        sendRegistrationEmailsDisabled: false,
        checked_email: false,
    }

    componentDidMount() {
        const coachid = this.props.token
        axios.get(`/api/profile/${coachid}`)
            .then(res => {
                this.setState({
                    organizeremail: res.data.email,
                    organizername: res.data.name,
                })
            })
        this.getCoachTrainingGroups(coachid)
    }

    constructor(props) {
        super(props)
        this.state = {sport: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onFailed = this.onFailed.bind(this);
        this.toggleGroupSizeInput = this.toggleGroupSizeInput.bind(this);
        this.toggleSendRegistrationEmails = this.toggleSendRegistrationEmails.bind(this);
    }

    handleChange(name, value) {
        this.setState({
          [name]: value
        });
    }

    handleTimeChange(time) {
        const aeg = new Date(time)
//        const aeg2 = new Date(time).toString().split(" ").splice(4, 9).join(" ")
        const aeg2 = aeg.toISOString().split("T")[1]
        const loppaeg = aeg.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }, { hour12: false })
        this.setState({
            starttime: loppaeg,
            timestring2: aeg2,
        })
    }

    handleEndTimeChange(time) {
        const aeg = new Date(time)
        const loppaeg = aeg.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }, { hour12: false })
        this.setState({
            endtime: loppaeg
        })
    }

    toggleGroupSizeInput = e => {
        this.setState({
            groupSizeInputDisabled: !this.state.groupSizeInputDisabled,
            checked_size: e.target.checked
        })
    }

    toggleSendRegistrationEmails = e => {
        this.setState({
            sendRegistrationEmailsDisabled: !this.state.sendRegistrationEmailsDisabled,
            checked_email: e.target.checked
        })
    }

    onFailed() {
        this.setState({
            notFilled: true
        })
    }

    getCoachTrainingGroups(coachID) {
        const coachid = coachID
        axios.get(`/api/traininggroups/${coachid}`)
            .then(res => {
                var coachGroups = []
                res.data.forEach(function (group) {
                    coachGroups.push(group.name);
                })
                console.log("coach groups names", coachGroups)
                this.setState({
                    coachGroups: coachGroups,
                })
            })
    }

    handleGroupChange(groupName) {
        if (groupName !== 'public') {
            const token = this.props.token
            this.setState({
                loadingGroups: true
            })
            axios.get(`/api/traininggroups/${token}`)
                .then(res => {
                    var coachGroups = []
                    coachGroups = res.data.filter(group => group.name === groupName)
                    const groupID = coachGroups[0].id
                    this.setState({
                        groupName: groupName,
                        groupID: groupID,
                        loadingGroups: false
                    })
                })
        } else {
            const groupName = 'avalik'
            const groupID = 0
            this.setState({
                groupName: groupName,
                groupID: groupID
            })
        }

    }

    handleDateChange(date){
        const event = new Date(date)
        const y = new Date(date).toString()
        const z = y.split(" ").splice(0, 4).join(" ")
        const newevent = event.toISOString().split("T")[0]
        const timestring = newevent
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const newdate = event.toLocaleDateString('et-EE', options)
        const date1 = newdate.split(" ").splice(0, 3)
        const date2 = date1[0].replace(',','')
        const date3 = replace_date(date2, date1)
        const date4 = array_move(date3, 0, 2).join(" ")
        var day = event.getDate()
        var month = event.getMonth() + 1
        if (day < 10) {
            day = '0' + day.toString()
        }
        if (month < 10) {
            month = '0' + month.toString()
        }
        const shortDate = day + '/' + month
        console.log('day an month', shortDate)
        this.setState({
            date: date4,
            datestring: newevent,
            timestring: timestring,
            shortDate: shortDate,
        })
    }

    handleFormSubmit = (values, requestType, trainingID) => {
        const x = this.state.timestring + " " + this.state.timestring2
        var stringtime = x
        var stringdate2 = this.state.datestring
        var title = values.title;
        var content = values.description;
        var organizeremail = this.state.organizeremail
        var sport = this.state.sport;
        var coach = this.props.token;
        var starttime = this.state.starttime;
        var endtime = this.state.endtime;
        var date = this.state.date;
        var stringdate = this.state.datestring
        var organizername = this.state.organizername
        var city = this.state.city
        var location = values.location
        var price = values.price
        var maximumgroupsize = values.groupsize
        var groupName = this.state.groupName
        var groupID = this.state.groupID
        var shortDate = this.state.shortDate
        var sendEmails = !this.state.sendRegistrationEmailsDisabled
        console.log('hind', price)
        if (price === undefined || price === '0.0' || price[0] === 0) {
            price = '0.0'
        }
        if (maximumgroupsize === undefined || this.state.groupSizeInputDisabled === true || maximumgroupsize === 0) {
            maximumgroupsize = '99'
        }

        if (this.state.starttime === undefined || this.state.endtime === undefined || this.state.date === undefined ||
        this.state.city === undefined || title === undefined || content === undefined || location === undefined ||
        this.state.sport === undefined || this.state.groupName === undefined) {
            this.setState({
                notFilled: true
            })
            var emptyFields = true;
        } else {
            this.setState({
                notFilled: false
            })
            var emptyFields = false;
        }

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: this.props.token
        }
        switch ( requestType ) {
            case 'post':
                if (emptyFields === false) {
                    return axios.post('/api/', {
                        title: title,
                        content: content,
                        organizeremail: organizeremail,
                        sport: sport,
                        coach: coach,
                        date: date,
                        starts1: starttime,
                        ends1: endtime,
                        stringdate: stringdate,
                        stringtime: stringtime,
                        stringtime2: stringdate2,
                        organizername: organizername,
                        city: city,
                        location: location,
                        price: price,
                        registration_limit: maximumgroupsize,
                        group: groupName,
                        group_id: groupID,
                        short_date: shortDate,
                        send_registrations: sendEmails,
                    })
                    .then(res => {console.log(res); this.openSuccessfulCreateNotificationWithIcon('success')})
                    .catch(error => console.err(error));
                } else if (emptyFields === true){
                    console.log('tyhad valjad')
                    return null
                }
            case 'put':
                this.setState({
                    notFilled: false
                })
                var emptyFields = false;
                if (stringtime = 'undefined undefined') {
                    stringtime = undefined
                }
                return axios.patch(`/api/${trainingID}/`, {
                    starts1: starttime,
                    content: content,
                    stringdate: stringdate,
                    stringtime: stringtime,
                    stringtime2: stringdate2,
                    ends1: endtime,
                    date: date,
                    title: title,
                    location: location,
                    group: groupName,
                    group_id: groupID,
                    short_date: shortDate
                })
                .then(res => {console.log(res); this.openSuccessfulUpdateNotificationWithIcon('success')})
                .catch(error => console.error(error));
        }
    }

    render() {
        return (
          <div>
              <Card className="trainingCreateForm" style={{borderRadius: "20px"}}>
                <Form onFinish={(values) => this.handleFormSubmit(
                    values,
                    this.props.requestType,
                    this.props.trainingID)}
                    onFinishFailed={this.onFailed}
                    initialValues={{
                        price: [0.0]
                    }}
                    style={{marginLeft: '5px'}}
                    >
                    {
                    this.state.notFilled ?
                    <span style={{color: 'red'}}>Kõik väljad peavad olema täidetud</span>
                    :
                    <></>
                    }
                <FormItem label="Pealkiri"
                            name ='title'
                            className='createFormInput'>
                    <Input name="title" placeholder="..." style={{borderRadius:'15px'}}/>
                </FormItem>
                {this.props.update == undefined && //kui update, siis ei tohi olla linna valikut
                    <>
                    <FormItem label='Linn'
                    rules={[
                    {
                        required: true,
                    },
                    ]}>
                        <Select name="city" value={this.state.city} style={{ width: 120 }} onChange={value => this.handleChange("city", value)}>
                            <Option value="Tartu" >Tartu</Option>
                            <Option value="Tallinn" >Tallinn</Option>
                            <Option value="Pärnu" >Pärnu</Option>
                            <Option value="Viljandi" >Viljandi</Option>
                            <Option value="Muu" >Muu</Option>
                        </Select>
                    </ FormItem>
                    </>
                }
                <Text type="secondary">Asukoht saab olla piiratud arv tähemärke (30). Asutuse nimi/lühend või aadress.</Text>
                <FormItem label='Asukoht:' name="location" className='createFormInput'>
                    <Input name="location" placeholder="..." maxLength={30} style={{borderRadius:'15px'}}/>
                </FormItem>
                <FormItem label="Kuupäev"
                    rules={[
                    {
                        required: true,
                    },
                    ]}>
                    <ConfigProvider locale={locale}>
                        <DatePicker onChange={date => this.handleDateChange(date)} style={{borderRadius:'15px'}}/>
                    </ConfigProvider>
                </FormItem>
                <FormItem label="Kellaaeg"
                rules={[
                    {
                        required: true,
                    },
                    ]}>
                    <ConfigProvider locale={locale}>
                        <TimePicker placeholder="Algus" style={{borderRadius:'15px', marginRight:'15px'}} format={format}
                        onChange={time => this.handleTimeChange(time)}/>
                        <TimePicker placeholder="Lõpp" style={{borderRadius:'15px'}} format={format}
                        onChange={time => this.handleEndTimeChange(time)}/>
                    </ConfigProvider>


                </FormItem>
                <FormItem label="Spordiala"
                rules={[
                    {
                        required: true,
                    },
                    ]}>
                    <Select name="sport" value={this.state.sport} style={{ width: 120 }} onChange={value => this.handleChange("sport", value)}>
                        <Option value="jooks" >Jooks</Option>
                        <Option value="jõud" >Jõud</Option>
                        <Option value="crossfit" >Crossfit</Option>
                        <Option value="kardio" >Kardio</Option>
                        <Option value="spinning" >Spinning</Option>
                        <Option value="yoga" >Yoga</Option>
                        <Option value="ratas" >Ratas</Option>
                        <Option value="ujumine" >Ujumine</Option>
                        <Option value="tennis" >Tennis</Option>
                        <Option value="suusatamine" >Suusatamine</Option>
                        <Option value="muu" >Muu</Option>
                    </Select>
                </FormItem>
                <FormItem label="Kirjeldus" name='description' className='createFormInput'>
                    <TextArea name='description' placeholder='...' style={{borderRadius:'15px'}}
                    autoSize={{ minRows: 2, maxRows: 30 }} />
                </FormItem>
                <Text type="secondary">Kui treening on tasuta, jätke hinnaks 0.0</Text>
                <FormItem name='price' label='Hind (€)'>
                    <InputNumber min={0.00} max={99.99} step={0.10} style={{borderRadius: '15px'}}/>
                </FormItem>
                {this.props.update == undefined && //kui update, siis ei tohi olla maksimaalse registreerunute võimalust
                    <>
                    <FormItem name='groupsize' label='Maksimaalne registreerunute arv:'>
                        <InputNumber disabled={this.state.groupSizeInputDisabled} min={1} max={99} style={{borderRadius: '15px'}}/>
                    </FormItem>
                    <Checkbox onChange={this.toggleGroupSizeInput} checked={this.state.checked_size} style={{marginBottom:'12px'}}> Registreerunute arv pole piiratud</Checkbox>
                    </>
                }
                <br />
                <Text type="secondary">Määrake, millisesse gruppi soovite treeningu lisada. Avalik treening on nähtav kõigile. Uusi gruppe saab luua oma paneeli alt.</Text>
                    <FormItem label='Treeninggrupp'>
                        <Select name="group" style={{ width: 120 }} onChange={value => this.handleGroupChange(value)}>
                            <Option value="public" >Avalik</Option>
                            {this.state.coachGroups && this.state.coachGroups.map(item => {
                                return <Option value={item} key={item}>{item}</Option>;
                            })}
                        </Select>
                </FormItem>
                <br />
                <span>Teavitused registreerimiste kohta saabuvad Teie emailile: </span><br/>
                <span><b>{this.state.organizeremail}</b></span>
                {this.props.update == undefined &&
                <FormItem style={{marginTop: "10px"}}>
                    <Checkbox onChange={this.toggleSendRegistrationEmails} checked={this.state.checked_email} style={{marginBottom:'12px'}}>Ei soovi registreerumiste teavitusi oma emailile</Checkbox>
                </FormItem>
                }
                <FormItem>
                    {
                    this.state.loadingGroups ?
                    <Button type="primary" shape="round" size="large" style={{marginTop:'20px'}} disabled>
                    Laen gruppe
                    </Button>
                    :
                    <Button type="primary" htmlType="submit" shape="round" size="large" style={{marginTop:'20px'}}>
                    {this.props.btnText}
                    </Button>
                    }
                </FormItem>
                </Form>      
              </Card>
            
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(CustomForm);

//