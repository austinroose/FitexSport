import React from 'react';
import { Route } from 'react-router-dom';
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

import SearchTrainingList from './containers/TrainingListSearchView';
import SearchGroupList from './containers/GroupListSearchView';
import TrainingDetail from './containers/TrainingDetailView';
import CoachProfile from './containers/CoachProfileView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import TrainingCreate from './containers/TrainingCreateView';
import Profile from './containers/Profile';
import UserRegistrations from './containers/Registrations';
import UserVerificationForm from './containers/UserVerification';
import KeyConfirmForm from './containers/EmailVerification';
import UserSignupForm from './containers/UserSignup';
import CoachTrainingsList from './containers/CoachTrainingsListView';
import Home from './containers/Home';
import MyHome from './containers/MyHome';
import MyControlPanel from './containers/MyControlPanel';
import TrainingGroupCreate from './containers/TrainingGroupCreateView';
import CoachTrainingGroups from './containers/CoachTrainingGroupsList';
import TrainingGroup from './containers/TrainingGroup';
import AdminPageLogin from './containers/AdminPageLogin';
import AdminPage from './containers/AdminPage';
import PrivacyPolicy from './containers/PrivacyPolicy';
import TermsAndConditions from './containers/TermsAndConditions';
import DataDeletionInstructions from './containers/UserDataDeletion';
import UserGroupsList from './containers/UserGroupsPage';
import SignupOptions from './containers/SignupOptions';
import CoachInformationPage from './containers/CoachInfoPage';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/trainings/search' component={SearchTrainingList} />
        <Route exact path='/group/search' component={SearchGroupList} />
        <Route exact path='/trainingsdetail/:trainingID' component={TrainingDetail} />
        <Route exact path='/coachprofile/:coachUsername' component={CoachProfile} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup' component={SignupOptions} />
        <Route exact path='/signup_email' component={UserVerificationForm} />
        <Route exact path='/createtraining/' component={TrainingCreate} />
        <Route exact path='/profile/' component={Profile} />
        <Route exact path='/userregistrations/' component={UserRegistrations}/>
        <Route exact path='/emailverification/:userEmail' component={KeyConfirmForm}/>
        <Route exact path='/usersignup/:token' component={UserSignupForm}/>
        <Route exact path='/mytrainings' component={CoachTrainingsList}/>
        <Route exact path='/myhome' component={MyHome}/>
        <Route exact path='/mycontrolpanel' component={MyControlPanel}/>
        <Route exact path='/create/groups' component={TrainingGroupCreate}/>
        <Route exact path='/coach/mygroups' component={CoachTrainingGroups}/>
        <Route path='/groups/:groupID' component={TrainingGroup}/>
        <Route exact path='/admin_login/1234' component={AdminPageLogin}/>
        <Route exact path='/admin_control/1234' component={AdminPage} />
        <Route exact path='/privacy-policy/' component={PrivacyPolicy} />
        <Route exact path='/terms/' component={TermsAndConditions} />
        <Route exact path='/user-data-deletion/' component={DataDeletionInstructions} />
        <Route exact path='/user_groups/' component={UserGroupsList} />
        <Route exact path='/coach_info' component={CoachInformationPage} />
    </div>
);

export default BaseRouter;