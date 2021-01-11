import React from 'react';
import { Route } from 'react-router-dom';

import GroupTrainingsList from './GroupTrainingsListView'
import GroupMembersList from '../components/MembersForGroup'
import GroupAboutPage from '../components/GroupInfo'

const GroupBaseRouter = (props) => (

    <div>
        {console.log('propid', props)}
        <Route exact path={['/trainings', '']} render={() => <GroupTrainingsList groupID={props.group.id}
        users={props.group.users} coach={props.group.coach}/>} />
        <Route exact path='/members' render={() => <GroupMembersList groupUsers={props.group.users} groupID={props.group.id} token={props.token}/>}/>
        <Route exact path='/about' render={() => <GroupAboutPage groupDescription={props.group.description}/>} />
    </div>
);

export default GroupBaseRouter;