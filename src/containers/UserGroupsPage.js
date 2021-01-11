import React, {useEffect, useState} from 'react';
import {Pagination} from 'antd';
import axios from '../axios';
import {connect} from 'react-redux';
import GroupCard from '../components/Group';
import './Style.css';

function UserGroupsList(props) {
    const [userGroups, setUserGroups] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [currentGroups, setCurrentGroups] = useState([])

    useEffect(() => {
        if (props.token !== null) {
            var token = props.token
            axios.get(`/api/profile/${token}`)
                .then(res => {
                    if (res.data.groups !== undefined) {
                        var groups = res.data.groups
                        var count = Math.ceil(groups.length/4)
                        var groupChunks = []
                        for (var i = 0; i < count; i ++) {
                            var groupChunk = []
                            for (var z = 0; z < 4; z ++) {
                                groupChunk.push(groups[z])
                            }
                            groupChunks.push(groupChunk)
                            groups.splice(0, 4)
                        }
                        setUserGroups(groupChunks)
                        const pageCount = count * 10
                        setPagesCount(pageCount)
                        const current = groupChunks[0]
                        if (current.length !== 0) {
                            getFirstGroups(current)
                        }
                    }
                })
                .catch(err => alert(err))
        }
    }, [props])

    async function getFirstGroups(current) {
        var groups2 = []
        for (var i = 0; i < current.length; i++) {
                try {
                    const result = await axios.get(`/api/group/${current[i]}`)
                    groups2.push(result.data)
                } catch(err) {
                }
            }
        setCurrentGroups(groups2)
    }

//    for (var x = 0; x < current.length; x ++) {
//                const groupID = current[x]
//                const result = await axios.get(`/api/group/${groupID}`)
//                const group = result.data
//                groups2.push(result.data)
//                console.log('result data', result.data)
//                console.log('groups', groups2)
//            }

    useEffect(() => {
        async function getNewGroups() {
            const page = currentPage - 1
            var groupIDs = userGroups[page]
            var groups2 = []
            if (groupIDs !== undefined) {
                for (var z = 0; z < groupIDs.length; z++) {
                        try {
                            const result = await axios.get(`/api/group/${groupIDs[z]}`)
                            groups2.push(result.data)
                        } catch(err) {
                        }
                    }
                setCurrentGroups(groups2)
            }
        }
        getNewGroups()
    }, [currentPage])

    function changePage(page) {
        setCurrentPage(page)
    }

    return (
        <div className='userGroupsPage'>
            <GroupCard data={currentGroups} />
            <Pagination current={currentPage} total={pagesCount}
                        onChange={(page) => changePage(page)} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(UserGroupsList);