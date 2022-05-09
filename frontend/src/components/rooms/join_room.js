import React from "react";
import '../../stylesheets/join_room.css'
import { Link } from "react-router-dom"

class JoinRoom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            roomKey: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){

    }

    handleSubmit(e){
        e.preventDefault();
        // based down through props, join a room based upon this.state.roomKey
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render(){
        return(
            <div className="join-room-container">
                <p>Please enter a room key:</p>
                <input type="number" min='0' max='999999'step='0' placeholder="Room Key" onChange={this.update('roomKey')}></input>
                <button value="Submit" onClick={this.handleSubmit}>Join Room</button>
                <Link to="/rooms">Back to Lobby</Link>
            </div>
        )
    }
}

export default JoinRoom;