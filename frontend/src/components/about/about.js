import React from "react";
import { Link } from "react-router-dom"
import '../../stylesheets/about.scss'
import signup from '../../gifs/signup.gif';
import createRoom from '../../gifs/createroom.gif';
import shareRoom from '../../gifs/shareroomkey.gif';
import joinRoom from '../../gifs/joinroom.gif';
import readyUp from '../../gifs/readyup.gif';
import {showModal} from '../../actions/modal_actions';

class About extends React.Component{
    constructor(props) {
        super(props)

        this.loginModal = this.loginModal.bind(this);
        console.log(this.props.loggedIn);
    }

    loginModal() {
		this.props.showModal("login")
	};

    
    
    
    render(){
        const {loggedIn} = this.props;
        let component;
        if (loggedIn) { component = 
            <Link
                className="signup-btn"
                to='/rooms'
                // onClick={this.loginModal}
                >
                Start
            </Link>
        } else {
            component=
                <Link
                    className="signup-btn"
                    // to='/rooms'
                    onClick={this.loginModal}
                    >
                    Start
                </Link> 
        }

        return (
            <div className="about-page">
                <div className='about-main'>
                    <h1 className="about-title">
                        In<span className='orange-text'>Dev</span>View
                    </h1>
                    <div className="about-description-container">
                        <h2>
                            <span className='orange-text'>
                                Live Technical Interview Practice
                            </span>
                        </h2>
                    </div>
                    <div className='start-btn-container'>
                        {component}
                    </div>
                <footer className="splash-footer">
                    Copyright &copy; 2022 InDevView
                </footer>
                </div>
                <div className='about-middle'>
                    <h2>
                        Getting Started
                    </h2>
                    <div className='about-row'>
                        <h3>
                            <span className='orange-text'>Sign up</span> or <span className='orange-text'>Login</span>
                        </h3>
                        <div>
                            <img src={signup} alt='Loading...'></img>
                        </div>
                    </div>
                    <div className='about-row'>
                        <div>
                            <img src={createRoom} alt='Loading...'/>
                        </div>
                        <h3>
                            Next, <span className='orange-text'>create a room</span> and <span className='orange-text'>select a question</span> to practice.
                        </h3>
                    </div>
                    <div className='about-row'>
                        <h3>
                            Share your <span className='orange-text'>Room Key</span> with friends so they can <br></br> <span className='orange-text'>join your lobby</span>
                        </h3>
                        <div>
                            <img src={shareRoom} alt='Loading...'/>
                        </div>

                    </div>
                    <div className='about-row'>
                        <div>
                            <img src={readyUp}/>
                        </div>
                        <h3>
                            After they join, <span className='yellow-text'>Ready Up</span> to enter the interview room and <span className='green-text'>Start Coding!</span>
                        </h3>
                    </div>
                </div>
                <div className="about-us-container">
                    <h2>
                        About Us
                    </h2>
                    <h3>
                        We are 3 coding bootcamp graduates.
                    </h3>
                    <div>
                        While studying at App Academy, we learned a lot about
                        programming and full stack development.
                        However, we felt there were limited resources for live technical interview practice.
                        There is no better thing to learn from than experience, so 
                        we set off to create a tool to
                        benefit many developers in the future.
                        <br></br>
                        <br></br>
                        Welcome to In<span className='orange-text'>Dev</span>View.
                    </div>
                </div>
            </div>
        )
    }
}

export default About;