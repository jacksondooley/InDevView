import React from 'react';
import { Link } from 'react-router-dom'
import '../../stylesheets/room_lobby.css'

class RoomLobby extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            roomMembers: this.props.room.participants
        }
    }

    componentDidMount(){
        this.props.addParticipant(this.props.currentUser)
        // this.props.currentUser is an id, need User object
    }

    render(){
        return (
            <div className='room-lobby-container'>
                <h1>InDevView</h1>
                <h2>
                    {this.props.room.room_key}
                </h2>
                <div>
                    <p>{this.state.roomMembers.length < 2 ? "Waiting on other people..." : "Ready!"}</p>
                    <ul>
                        {this.state.roomMembers.forEach(member => {
                            <li>
                                {member.handle}
                                <button onClick={this.props.removeParticipant(member._id)}>X</button>
                                {/* Maybe show camera feeds here? */}
                            </li>
                        })}
                    </ul>
                </div>
                <div>
                    {
                        this.state.roomMembers.length > 1 && this.props.currentUser._id === this.props.room.host_id ?
                        <Link className='ready-button' to={`/rooms/${this.props.room.room_key}`}>Ready!</Link> :
                        <Link className='not-ready-button' onClick={(e) => e.preventDefault()}>Not Ready</Link>
                    }
                    
                </div>
            </div>
        )
    }
}

export default RoomLobby