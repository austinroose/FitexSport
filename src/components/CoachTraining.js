import React from 'react';
import { List, Avatar, Space, Tag, Divider, Card, Button } from 'antd';
import { MessageOutlined, LikeOutlined, TeamOutlined, EllipsisOutlined, UnorderedListOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { TiLocationArrowOutline } from "react-icons/ti";
import { BiCalendar, BiBuildingHouse } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from '../axios'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


const CoachTrainings = (props) => {

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
              <a className='trainingDetailButton' href={`/trainingsdetail/${item.id}`}>
                  <Button type="primary" shape="circle" style={{alignItems: 'center', justifyContent: 'center', display:'flex'}}
                   icon={<BsArrowRight style={{fontSize:'25px', color:'white'}}/>}
                  size='large' />
              </a>
            }
          >
            <List.Item.Meta
              title={<a href={`/trainingsdetail/${item.id}`}><p style={{fontSize: '20px', fontWeight: 400}}>{item.title}</p></a>}
              description={<div className=""><Tag style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px'}}>{item.sport}</Tag>
              <Tag icon={<BiBuildingHouse style={{fontSize: "17px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.city}</Tag>
              <Tag icon={<TiLocationArrowOutline style={{fontSize: "17px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.location}</Tag>
              <Tag icon={<BiCalendar style={{fontSize: "15px", marginRight:'3px'}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.date}</Tag>
              <Tag icon={<ClockCircleOutlined style={{fontSize: "15px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.starts1} - {item.ends1}</Tag>
              <Tag icon={<TeamOutlined style={{fontSize: "15px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.registrations_made}</Tag>
              <Tag style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>Grupp: {item.group}</Tag></div>}
            />
            <Divider />
          </List.Item>
    )}
  />
  )
}

export default CoachTrainings;