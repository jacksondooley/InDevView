import React from "react";
import { Link } from "react-router-dom"
import '../../stylesheets/about.scss'

class About extends React.Component{
    render(){
        return (
            <div className="about-page">
                <h1 className="about-title">
                    WELCOME TO INDEVVIEW
                </h1>
                <div className="about-description-container">
                    <h2>
                        InDevView is an educational platform in which aspiring developers can get an 
                        experienced developer's view of their interviewing skills live.
                    </h2>
                    <h3>
                        Sign up or log in to an account.
                    </h3>
                    <h3>
                        Next, create a room and select a common technical interview question to practice.
                    </h3>
                    <h3>
                        Send an entry code to a friend so that they can join your lobby.
                    </h3>
                    <h3>
                        After they join, ready up, enter the interview room, and start practicing!
                    </h3>
                </div>
                <div className="about-us-container">
                    <h2>
                        Who are we?
                    </h2>
                    <h3>
                        We are coding bootcamp graudates.
                    </h3>
                    <h3>
                        While studying in a bootcamp, while we learned a lot about
                        programming and full stack development,
                        we felt that aspiring developers were often lacking 
                        live technical interview practice.
                        There is no better thing to learn from than experience and 
                        we set off to create a tool to hopefully
                        benefit many developers in the future.
                    </h3>
                </div>
                <h2>
                    Get started: 
                    <Link className="signup-button" to='/signup'>Sign Up</Link>
                </h2>
            </div>
        )
    }
}

export default About