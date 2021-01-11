import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Card, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import axios from '../axios';
import './Style.css'

function MyControlPanel (props) {

    const [count, setCount] = useState(0)

    useEffect(() => {
        const coachID = props.token
        async function fetchData() {
            const result = await axios.get(`/api/traininggroups/${coachID}`)
            setCount(result.data.length)
        }
        fetchData();
    }, [props])

    return(
        <div>
            {
             props.isCoachAndIsAuthenticated ?
             <>
                <Card bordered={true} className='controlPanelCard' style={{borderRadius:'20px', marginBottom: '10px'}}>
                  <h1 style={{fontSize: '20px'}}>Minu treeningud</h1>
                  <Button type="primary" shape="round">
                    <Link to="/mytrainings">Mine</Link>
                  </Button>
                 </Card>
                <Card bordered={true} className='controlPanelCard' style={{borderRadius:'20px', marginBottom: '10px'}}>
                  <h1 style={{fontSize: '20px'}}>Loo uus treening</h1>
                  <Button type="primary" shape="round">
                    <Link to="/createtraining/">Mine</Link>
                  </Button>
                 </Card>
                 <Divider />
              <h1 style={{marginLeft: '5px', fontSize: '20px'}}>Minu grupid</h1>
                <Card bordered={true} className='controlPanelCard' style={{borderRadius:'20px', marginBottom: '10px'}}>
                  <h1>Kokku gruppe: {count}</h1>
                  <Button type="primary" shape="round">
                    <Link to="/coach/mygroups">Vaata</Link>
                  </Button>
                 </Card>
                <Card className='controlPanelCard' style={{borderRadius:'20px'}}>
                  <h1 style={{fontSize: '20px'}}>Loo uus grupp</h1>
                  <Button type="primary" shape="round">
                    <Link to="/create/groups">Mine</Link>
                  </Button>
                </Card>
             <Divider />
                <Card bordered={true} className='controlPanelCard' style={{borderRadius:'20px'}}>
                  <h1 style={{fontSize: '20px'}}>Kõik treeningud</h1>
                  <p>Vaata kõiki platvormi treeninguid, et planeerida paremini enda omasid</p>
                  <Button type="primary" shape="round">
                    <Link to="/trainings/search">Vaata</Link>
                  </Button>
                 </Card>
                </>
                // treeneri grupid
             :
             <></>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        isCoachAndIsAuthenticated: state.auth.iscoach === true && state.auth.token !== null,
        token: state.auth.token
    }

}

export default connect(mapStateToProps)(MyControlPanel);