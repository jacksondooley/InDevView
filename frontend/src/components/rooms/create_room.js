import React from "react";
import '../../stylesheets/create_room.css'
import { Link } from "react-router-dom"

class CreateRoom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            questions: [],
            duration: '',
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //fetches all questions inorder to display them in form.
    componentDidMount(){
        // this.props.fetchQuestions()
    }

    //if rooms changed, when form is submited, redirects user to the created room
    componentDidUpdate(prevProps, prevState){
        if (prevProps.rooms !== this.props.rooms) {
            this.props.history.push(`/rooms/${this.props.rooms.room_key}/lobby`)
        }
    }

    handleSubmit(e){
        e.preventDefault();
        // let room = {
        //     description: this.state.description,
        //     duration: this.state.duration
        // }
        const temp_room = {
            questions: "62797280795905abe470a3f8",
            user: this.props.currentUser
        }
        this.props.createRoom(temp_room)
        // creates a room from the method passed down into props
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render(){
        return(
            <div className="create-room-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="entry-code-timer">
                        <p>Entry Code:</p>
                        <p className="entry-code">Placeholder Code</p>
                        <input type="number" min="1" step="1" placeholder="Please enter a time duration" onChange={this.update('duration')}></input>
                    </div>
                    

                    <div className="coding-questions-form">
                        <label>Choose a question</label>
                        <select>
                            {/* Maps each of the questions that are available into an option */}
                        </select>
                    </div>

                    <div className="users-in-lobby">
                        <div>
                            {/* Shows the user that is the interviewer */}
                        </div>
                        <div>
                            {/* Shows all of the users in the room */}
                            {/* Able to select which user is able to into what role */}
                        </div>
                        <div>
                            {/* Shows the user that is the interviewee */}
                        </div>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
                <Link to='/rooms'>Back to Lobby</Link>
            </div>
        )
    }
}

export default CreateRoom;