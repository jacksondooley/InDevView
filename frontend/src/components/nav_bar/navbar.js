import React from 'react';
import { Link } from 'react-router-dom'
import { showModal } from '../../actions/modal_actions';
import '../../stylesheets/navbar.scss'
// import Timer from './test_timer';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.signupModal = this.signupModal.bind(this);
		this.loginModal = this.loginModal.bind(this);
    // console.log(this.props.loggedIn);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  signupModal() {
		this.props.showModal("signup")
	}

	loginModal() {
		this.props.showModal("login")
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
                <Link
                  onClick={this.signupModal}
                  className='signup'
                >
                  Sign Up
                </Link>
                <Link
                  onClick={this.loginModal}
                  className='login'
                  // to={'/login'}
                >
                  Login
                </Link>
            </div>
        );
      }
  }

  render() {
    const {loggedIn} = this.props;
    let component;
    if (loggedIn) { component = 
      <Link className='nav-link' to='/rooms'>
        <input type="radio" name="month"/>
          <span>
            Rooms
          </span>
      </Link>
    } else {
        component =
        <Link className='nav-link' onClick={this.loginModal}>
          <input type="radio" name="month"/>
            <span>
              Rooms
            </span>
        </Link>
    }

      return (
        <div className='nav-bar'>
           <Link className='home-button' to="/">
             <h1 id="home-button-icon">
              In<span className='orange-text'>Dev</span>View
            </h1>
          </Link>
          <div className='nav-right'>
            <div className='nav-middle'>
         
            <div className="list-choice">
              <div className="list-choice-title">
                Explore
                <i className="fa-brands fa-wpexplorer"></i>
              </div>
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
                    {component}
                  </label>  
                </div>
              </div>
              <div className='nav-bar-buttons'>
                <Link className='about' to={'/about'}>About</Link>
              </div>
            </div>
            { this.getLinks() }
          </div>
        </div>
      );
  }
}

export default NavBar;