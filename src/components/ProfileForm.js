import React from "react";
import { Form, Input, Button, Select, message, Upload } from "antd";
import {connect} from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';

import axios from "../axios";

const FormItem = Form.Item;

const { Option } = Select;

const success = () => {
  message.success('Teie profiil on salvestatud edukalt, võite lehte uuendada');
};

class ProfileForm extends React.Component {
    state = {
        file: this.props.profile.image,
    };

    dummyRequest({ file, onSuccess }) {
         onSuccess("ok");
    }

    constructor(props) {
        super(props)
        this.state = {sport: this.props.profile.sport};
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleImageChange(file) {
        this.setState({
          file: file.file
        })
        console.log(file)
        console.log(file.file.name)
    };

    handleChange(name, value) {
        this.setState({
          [name]: value
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        let form_data = new FormData();
        form_data.append('name', event.target.elements.name.value);
        form_data.append('location', event.target.elements.location.value);
        form_data.append('sport', this.state.sport);
        var profileID = this.props.token
        let url = `/api/profile/${profileID}/update`
        axios.patch(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': profileID
            }
        })
            .then(res => console.log(res))
            .catch(error => console.err(error));
     }

    render() {
        const props2 = {
            name: 'file',
            accept: 'image/*',
            multiple: false,
         };

        return (
          <div>
            <Form onSubmitCapture={(event) => this.handleFormSubmit(event)}>
              <FormItem>
                <span>Email: <b>{this.props.profile.email}</b></span>
              </FormItem>
              <FormItem label="Nimi" rules={[{ required: true, message: 'Palun sisesta nimi' }]}>
                <Input name="name" placeholder="..." defaultValue={this.props.profile.name} style={{borderRadius: '10px'}}/>
              </FormItem>
              <FormItem label="Spordiala" rules={[{ required: true, message: 'Palun valige spordiala' }]}>
                <Select name="sport" value={this.state.sport} style={{ width: 120 }} onChange={value => this.handleChange("sport", value)} defaultValue={this.props.profile.sport} style={{borderRadius: '10px'}}>
                    <Option value="jooks" >Jooks</Option>
                    <Option value="jõud" >Jõud</Option>
                    <Option value="crossfit" >Crossfit</Option>
                    <Option value="kardio" >Kardio</Option>
                    <Option value="spinning" >Kardio</Option>
                    <Option value="ratas" >Ratas</Option>
                    <Option value="ujumine" >Ujumine</Option>
                    <Option value="tennis" >Tennis</Option>
                    <Option value="suusatamine" >Suusatamine</Option>
                    <Option value="muu" >Muu</Option>
                </Select>
              </FormItem>
              <FormItem label="Elukoht (linn / asula)" rules={[{ required: true, message: 'Palun sisestage elukoht' }]}>
                <Input name="location" placeholder="..." defaultValue={this.props.profile.location} style={{borderRadius: '10px'}}/>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" shape="round" onClick={success} >
                  Uuenda profiili
                </Button>
              </FormItem>
            </Form>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ProfileForm);