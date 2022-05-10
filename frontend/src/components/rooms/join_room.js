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

    componentDidUpdate(prevProps) {
        if (this.props.rooms.length !== prevProps.rooms.length) {
                this.props.history.push(`/rooms/${this.state.roomKey}/lobby`)
            }
    }

    handleSubmit(e){
        e.preventDefault();
        // based down through props, join a room based upon this.state.roomKey
        console.log(this.state.roomKey)
        this.props.fetchRoom(this.state.roomKey)
            .then(() => this.props.addParticipant(this.state.roomKey, this.props.currentUser))
       
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
                <input type="number" placeholder="Room Key" onChange={this.update('roomKey')}></input>
                <button value="Submit" onClick={this.handleSubmit}>Join Room</button>
                <Link to="/rooms">Back to Lobby</Link>
            </div>
        )
    }
}

export default JoinRoom;