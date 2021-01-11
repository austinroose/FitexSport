import React from 'react';
import { Collapse } from 'antd';
import {connect} from 'react-redux';

import CustomForm from '../components/Form';
import Map from '../components/LocationPicker';

function callback(key) {
  console.log(key);
}

const { Panel } = Collapse;

class TrainingCreate extends React.Component {
            render () {
                return (
                    <div>
                    {
                     this.props.isAuthenticatedAndIsCoach ?
                        <div>
                        <h2>Lisa</h2>
                        <CustomForm
                            requestType="post"
                            trainingID={null}
                            btnText="Loo treening"/></div>
                      : <span>Teil puudub vastav luba postitamiseks</span>

                      }
                    </div>
                )
            };
}

const mapStateToProps = state => {
    return {
        isAuthenticatedAndIsCoach: state.auth.token !== null && state.auth.iscoach == true
    }
}

export default connect(mapStateToProps)(TrainingCreate);

//<Collapse defaultActiveKey={['0']} onChange={callback} style={{ marginBottom: '10px', borderRadius: '10px'}}>
//                            <Panel header="Valige treeningu asukoht kaardilt" key="1">
//                                <Map />
//                            </Panel>
//                        </Collapse>