import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav_bar/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import CreateRoomContainer from './rooms/create_room_container';
import JoinRoomContainer from './rooms/join_room_container';
import RoomsContainer from './rooms/rooms_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />

        <ProtectedRoute exact path="/rooms/create" component={CreateRoomContainer}/>
        <ProtectedRoute exact path="/rooms/join" component={JoinRoomContainer}/>
        <ProtectedRoute exact path ="/rooms" component={RoomsContainer}/>
    </Switch>
  </div>
);

export default App;