import React from 'react';
import { Card, Collapse, Form, Input, Button, Upload, message } from 'antd';
import { FileImageOutlined, UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import axios from "../axios";

const { Meta } = Card;

const { Panel } = Collapse;

const FormItem = Form.Item;

const success = () => {
  message.success('Teie profiilipilt on salvestatud edukalt, võite lehte uuendada');
};

function callback(key) {
  console.log(key);
}

class PictureUpload extends React.Component {

    state = {
        file: null
    };

    handleImageChange(file) {
        this.setState({
          file: file
        })
        console.log(file)
        console.log(file.file.name)
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        let form_data = new FormData();
        form_data.append('image', this.state.file.file, this.state.file.file.name)
        const profileID = this.props.token
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
        return(
            <div>
                <Card
                    hoverable
                    style={{ width: 240, borderRadius: '20px', marginBottom: '10px' }}
                    cover={<FileImageOutlined style={{ fontSize: '60px', marginTop:'10px' }}/>}>
                    <Meta title={<div style={{width: '100%', marginLeft: '10px'}}><h1 style={{ fontSize: '20px'}}>Muuda profiilipilti </h1></div>}
                    description={
                    <div>
                    <Collapse defaultActiveKey={['0']} onChange={callback} style={{ marginBottom: '10px', borderRadius: '10px', border: 'none'}}>
                        <Panel header="Lisa fail" key="1">
                            <Form onSubmitCapture={(event) => this.handleFormSubmit(event)}>
                                <FormItem>
                                    <Upload {...props2} beforeUpload={() => false} onChange={file => this.handleImageChange(file)}>
                                        <Button>
                                            <UploadOutlined /> Kliki siia
                                        </Button>
                                    </Upload>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" shape="round" onClick={success} >
                                        Uuenda pilti
                                    </Button>
                                </FormItem>
                            </Form>
                        </Panel>
                    </Collapse>
                    </div>}
                    />
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(PictureUpload);