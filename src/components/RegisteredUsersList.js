import React, {useState, useEffect} from 'react';
import {List, Avatar, Spin } from 'antd';
import { connect } from 'react-redux';
import axios from '../axios';
import './Style.css';

import InfiniteScroll from 'react-infinite-scroller';

function RegisteredUsersList(props) {

    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [groupChunks, setGroupChunks] = useState([])
    const [loading, setLoading] = useState(false)
    const [registeredUsersCount, setRegisteredUsersCount] = useState(0)
    const [renderLevel, setRenderLevel] = useState(0)
    var token = false

    async function getGroups(data, usersList) {
        var data = data
        setLoading(true)
        if (usersList !== undefined) {
            for (var i = 0; i < usersList.length; i++) {
                try {
                    const result = await axios.get(`/api/profile/${usersList[i].profile}`)
                    data.push(result.data) // push user to array, which is shown on page
                } catch(err) {
                }
            }
        }
        setData(data)
        setLoading(false)
    }

    function changeGroupChunks(registered_users) {
        var groupChunks2 = []
        while (registered_users.length > 0){ // divide fetched user ids into groups of 3
           const groupChunks1 = registered_users.splice(0,3)
           groupChunks2.push(groupChunks1)
        } 
        return groupChunks2
    }

    useEffect(() => {
        async function getRegisteredUsers() {
            const trainingID = props.trainingID
            const result = await axios.get(`/api/eventregistrations/${trainingID}`).catch(err => alert('Ilmnes tõrge serveriga'))
            var registeredUsers = result.data
            setRegisteredUsersCount(registeredUsers.length)
            var groupChunks2 = changeGroupChunks(registeredUsers)
            const emptyData = []
            getGroups(emptyData, groupChunks2[0])
            setGroupChunks(groupChunks2)
        }
        getRegisteredUsers()
        token = props.token
    }, [props])

    function handleInfiniteOnLoad() {
        setLoading(true)
        if (data.length === registeredUsersCount) { // if all users are fetched don't show spinning icon and stop user from scrolling
          setLoading(false)
          setHasMore(false)
          return;
        }
        const renderPage = renderLevel + 1
        getGroups(data, groupChunks[renderPage]);
        setRenderLevel(renderPage)
      };

    return (
        <div>
            {registeredUsersCount > 0 &&
                <>
                {props.isAuth ?
                <>
                <h1>Registreenunud</h1>
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
                </>
            }
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(RegisteredUsersList);