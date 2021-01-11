import React, {useState, useEffect} from 'react';
import {List, message, Avatar, Spin } from 'antd';
import { connect } from 'react-redux';
import axios from '../axios'
import './Style.css'

import InfiniteScroll from 'react-infinite-scroller';

function GroupMembersList(props) {

    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [groupChunks, setGroupChunks] = useState([])
    const [loading, setLoading] = useState(false)
    const [groupUsersCount, setGroupUsersCount] = useState(0)
    const [renderLevel, setRenderLevel] = useState(0)
    var token = false

    async function getGroups(data, usersList) {
        var data = data
        setLoading(true)
        if (usersList !== undefined) {
            for (var i = 0; i < usersList.length; i++) {
                try {
                    const result = await axios.get(`/api/profile/${usersList[i]}`)
                    data.push(result.data)
                } catch(err) {
                }
            }
        }
        setData(data)
        setLoading(false)
    }

    function changeGroupChunks(group_users) {
        var groupChunks2 = []
        while (group_users.length > 0){
           const groupChunks1 = group_users.splice(0,3)
           groupChunks2.push(groupChunks1)
        }
        return groupChunks2
    }

    useEffect(() => {
        async function getGroupUsers() {
            const groupID = props.groupID
            const result = await axios.get(`/api/group/${groupID}`).catch(err => alert('Ilmnes tõrge serveriga'))
            var groupUsers = result.data.users
            setGroupUsersCount(groupUsers.length)
            var groupChunks2 = changeGroupChunks(groupUsers)
            const emptyData = []
            getGroups(emptyData, groupChunks2[0])
            setGroupChunks(groupChunks2)
        }
        getGroupUsers()
        token = props.token
    }, [props])

    function handleInfiniteOnLoad() {
        setLoading(true)
        if (data.length === groupUsersCount) {
          setLoading(false)
          setHasMore(false)
          return;
        }
        const renderPage = renderLevel + 1
        getGroups(data, groupChunks[renderPage]);
      };

    return (
        <div>
            {props.isAuth ?
            <>
            <h1>{groupUsersCount} liiget</h1>
            <div className='groupMembersListContainer'>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={handleInfiniteOnLoad}
                  hasMore={!loading && hasMore}
                  useWindow={false}
                >
                    <List
                        dataSource={data}
                        renderItem={item => (
                          <List.Item key={item.token}>
                                <List.Item.Meta
                                  avatar={
                                    <Avatar src={item.image} />
                                  }
                                  title={item.name}
                                  description={item.email}
                                />
                          </List.Item>
                        )}
                    >
                        {loading && hasMore && (
                          <div className="groupMembersListLoading">
                            <Spin />
                          </div>
                    )}
                    </List>
                </InfiniteScroll>
            </div>
            </>
            :
            <></>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(GroupMembersList);