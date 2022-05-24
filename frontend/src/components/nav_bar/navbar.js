import React from 'react';
import { Link } from 'react-router-dom'
import '../../stylesheets/navbar.scss'
// import Timer from './test_timer';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className='nav-bar-buttons'>
                {/* <Link to={'/tweets'}>All Tweets</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Write a Tweet</Link> */}
                <Link className='logout' to={'/signup'} onClick={this.logoutUser}>Logout</Link>
            </div>
        );
      } else {
        return (
            <div className='nav-bar-buttons'>
                <Link className='signup' to={'/signup'}>Signup</Link>
                <Link className='login' to={'/login'}>Login</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div className='nav-bar'>
           <Link className='home-button' to="/">
             <h1 id="home-button-icon">
              In<span className='orange-text'>Dev</span>View
            </h1>
          </Link>
          <div className='nav-right'>
            <div className='nav-middle'>
              <Link className='nav-about-link' to='/about/'>About</Link>
            <div className="list-choice">
              <div className="list-choice-title">Explore <i className="fa-brands fa-wpexplorer"></i></div>
                <div className="list-choice-objects">
                  <label>
                    <Link className='nav-link' to="/questions/all">
                    <input type="radio" name="month"/>
                      <span>
                        Questions
                      </span>
                    </Link>
                  </label>  
                  <label>
                    <Link className='nav-link' to="/rooms">
                    <input type="radio" name="month"/>
                      <span>
                        Rooms
                      </span>
                    </Link>
                  </label>  
                </div>
              </div>
            </div>
            { this.getLinks() }
          </div>
        </div>
      );
  }
}

export default NavBar;