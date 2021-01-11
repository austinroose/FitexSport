import React from 'react';
import { Button, Card, Col, Row, Collapse } from 'antd';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../store/actions/filter'
import * as actions from '../store/actions/filter';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { FaRunning } from 'react-icons/fa';
import './Style.css';

import FilterTag from '../containers/FilterTag';

const { Panel } = Collapse;

class Filter extends React.Component {

    clicked = (props) => { //paneb urli kokku vastavate search paramitega
        var basename = '/trainings/search?'
        var lastparam = this.props.filter[Object.keys(this.props.filter)[Object.keys(this.props.filter).length - 1]]
        Object.entries(this.props.filter).forEach(([key, value]) => {
            if (value !== null) {
                const param = key + "=" + value
                basename += param + "&"
            }
        });
        const searchurl = basename.slice(0, -1)
        this.props.history.push(searchurl)
    }

    render(){
        return (
        <div>
        <Row>
            <Col>
            <Collapse style={{borderRadius:'10px'}}>
                <Panel header="Spordiala" key="1">
                <FilterTag filter={'Tartu'} type={'location'}/>
                </Panel>
            </Collapse>
            </Col>
            <Col>
            <Collapse>
                <Panel header="Asukoht" key="2">
                <FilterTag filter={'jooks'} type={'sport'} bticon={<FaRunning style={{fontSize: '17px', marginRight: '4px'}}/>}/>
                </Panel>
            </Collapse>
            </Col>
            <Col>
            <Collapse>
                <Panel header="This is panel header 1" key="3">
                <Button type="primary" onClick={this.clicked} shape="round" style={{marginTop: '6px'}}>
                        Otsi
                    </Button>
                </Panel>
            </Collapse>
            </Col>
        </Row>
        </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        filter: state.filter,
        token: state.auth.token,
    }
}

export default withRouter(connect(mapStateToProps, null)(Filter));

//if(prevProps != this.props){
//            if (this.props.location != null){
//                const location = this.props.location
//                var location_s = 'location=' + location
//            }
//            const basename = '/trainings/search?'
//            const s_url = basename + location_s
//            console.log('surl', s_url)
//            this.props.history.push(s_url)
//        }

//<FilterLink filter={VisibilityFilters.SHOW_ALL} text='Kõik'></FilterLink>
//            <FilterLink filter={VisibilityFilters.SHOW_TARTU} text='Tartu'></FilterLink>
//            <FilterLink filter={VisibilityFilters.SHOW_TALLINN} text='Tallinn'></FilterLink>