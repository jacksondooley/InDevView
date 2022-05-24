import '../stylesheets/css_reset.css';
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav_bar/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import CreateRoomContainer from './rooms/create_room_container';
import JoinRoomContainer from './rooms/join_room_container';
import RoomsContainer from './rooms/rooms_container';
import RoomLobbyContainer from './rooms/room_lobby_container';
import InterviewRoomContainer from './rooms/interview_room_container'
import Chat from './chat';
import QuestionsIndexContainer from './questions/questions_index_container';
import QuestionShowContainer from './questions/question_show';
import Footer from './footer/footer';
import About from './about/about';
import EditorContainer from './editor/editor_container';

const App = () => (
  <>
    <div className='inner-body'>
      <NavBarContainer />
      <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />

          <ProtectedRoute exact path="/rooms/create" component={CreateRoomContainer}/>
          <ProtectedRoute exact path="/rooms/join" component={JoinRoomContainer}/>
          <ProtectedRoute exact path ="/rooms" component={RoomsContainer}/>
          <ProtectedRoute exact path="/rooms/:roomKey/lobby" component={RoomLobbyContainer}/>
          <ProtectedRoute exact path="/rooms/:roomKey/interview" component={InterviewRoomContainer}/>
          <ProtectedRoute exact path="/rooms/:roomKey/editor" component={EditorContainer}/>

          <Route exact path="/about" component={About}/>
          <Route exact path="/questions/all" component={QuestionsIndexContainer}/>
          <Route exact path='/questions/:id' component={QuestionShowContainer}></Route>
      </Switch>
    </div>
  <Footer/>
  </>
);

export default App;