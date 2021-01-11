import React from "react";
import { Form, Button } from "antd";

import axios from "../axios";

const FormItem = Form.Item;

class RegisterForm extends React.Component {
    handleFormSubmit = (event, trainingID) => {
        return axios.post(`/api/${trainingID}/user_added`, {
        })
    }
    render() {
        return (
          <div>
            <Form onSubmitCapture={(event) => this.handleFormSubmit(
                event,
                this.props.trainingID)}>
              <FormItem>
                <Button type="primary" style={{ "background-color": "green" }} htmlType="submit" shape="round" >
                  Registreeru treeningule
                </Button>
              </FormItem>
            </Form>
          </div>
        );
    }
}

export default RegisterForm;