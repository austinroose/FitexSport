import React, {useEffect} from 'react';
import { List, Avatar, Space, Tag, Divider, Card, Button } from 'antd';
import { UserOutlined, LikeOutlined, TeamOutlined, EllipsisOutlined, UnorderedListOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { TiLocationArrowOutline } from "react-icons/ti";
import { BiCalendar, BiBuildingHouse } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
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

const GroupCard = (props) => {

    return (
    <div>
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
              <a className='detailedInfo' href={`/groups/${item.id}`}>
                  <div style={{display:'flex'}}>
                      <Button type="primary" shape="circle" style={{alignItems: 'center', justifyContent: 'center', display:'flex'}}
                      icon={<BsArrowRight style={{fontSize:'25px', color:'white'}}/>}
                      size='large' />
                  </div>
              </a>
            }
          >
            <List.Item.Meta
              avatar={<Avatar size={70} src={item.image} />}
              title={<a href={`/groups/${item.id}`}><p style={{fontSize: '20px', fontWeight: 400}}>{item.name}</p></a>}
              description={<div className="">
              <Tag style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px'}}>{item.sport}</Tag>
              <Tag icon={<UserOutlined style={{fontSize: "17px"}}/>}
              style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>
                {item.coach_name}
              </Tag>
              <Tag icon={<TiLocationArrowOutline style={{fontSize: "17px"}}/>} style={{borderRadius: '10px', backgroundColor: 'lightgrey', fontSize:'15px', marginTop:'4px'}}>{item.location}</Tag>
              <p style={{marginTop:'5px'}}>{item.description}</p>
              </div>}
            />
            <Divider />
          </List.Item>
    )}
  />
  </div>
  )
}

export default GroupCard;