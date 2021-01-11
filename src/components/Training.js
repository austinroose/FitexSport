import React, {useEffect} from 'react';
import { List, Avatar, Space, Tag, Divider, Card } from 'antd';
import { MessageOutlined, LikeOutlined, TeamOutlined, EllipsisOutlined, UnorderedListOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { TiLocationArrowOutline } from "react-icons/ti";
import { BiCalendar, BiBuildingHouse } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from '../axios'
import '../containers/Style.css';
import './Style.css';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


const Trainings = (props) => {

    return (
    <List
        itemLayout="vertical"
        size="large"
        style={{paddingTop:'12px'}}
        dataSource={props.data}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
            ]}
            extra={
              <a className='detailedInfo' href={`/trainingsdetail/${item.id}`}>
                  <div style={{ display: 'flex', flexDirection:'column' }}>
                      <EllipsisOutlined style={{fontSize: '35px'}}/>
                      <span style={{ fontSize: '14px',  textAlign: 'center'}}>Näita rohkem</span>
                  </div>
              </a>
            }
          >
            <List.Item.Meta
              avatar={<CoachProfile data={item} />}
              title={<a href={`/trainingsdetail/${item.id}`}><p style={{fontSize: '20px', fontWeight: 400}}>{item.title}</p></a>}
              description={<div className=""><Tag style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px'}}>{item.sport}</Tag>
              <Tag icon={<BiBuildingHouse style={{fontSize: "17px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.city}</Tag>
              <Tag icon={<TiLocationArrowOutline style={{fontSize: "17px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.location}</Tag>
              <Tag icon={<BiCalendar style={{fontSize: "15px", marginRight:'3px'}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.short_date}</Tag>
              <Tag icon={<ClockCircleOutlined style={{fontSize: "15px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.starts1} - {item.ends1}</Tag>
              <Tag icon={<TeamOutlined style={{fontSize: "15px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.registrations_made}</Tag></div>}
            />
            <Divider />
          </List.Item>
    )}
  />
  )
}

class CoachProfile extends React.Component {
    state= {
        profile: {}
    }

    componentDidMount() {
        const profileID = this.props.data.coach
        axios.get(`/api/profile/${profileID}`)
        .then(res => {
            this.setState({
                profile: res.data
            });
        })
    }

    render() {
        return(
            <div>
                <Link to={`/coachprofile/${this.state.profile.username}`}>
                    <Avatar src={this.state.profile.image} size={60}/>
                </Link>
            </div>
        )
    }

}

function mapStateToProps(state) {
  return {
    pageState: state
  }
}

export default Trainings;

//<div style={{display: 'flex', flexDirection: 'row'}}>
//                <UnorderedListOutlined style={{ marginTop: '4px', marginRight: '7px' }}/>
//                {item.content}
//            </div>
