import React from "react";
import '../../stylesheets/create_room.css'
// import '../../stylesheets/index.css'
// import './create_room.css'

class CreateRoom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            description: '',
            duration: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){

    }

    handleSubmit(e){
        e.preventDefault();
        let room = {
            description: this.state.description,
            duration: this.state.duration
        }
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
                    <div className="room-description">
                        <input type="text" placeholder="Please enter a description" onChange={this.update('description')}></input>
                    </div>
                    
                    <div className="entry-code-timer">
                        <p>Entry Code:</p>
                        <input type="number" min="1" step="1" placeholder="Please enter a time duration" onChange={this.update('duration')}></input>
                    </div>
                    

                    <div className="coding-questions-form">
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
                </form>
            </div>
        )
    }
}

export default CreateRoom;