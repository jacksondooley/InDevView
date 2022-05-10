import React from 'react';
import { Link } from 'react-router-dom'
import '../../stylesheets/room_lobby.css'

class RoomLobby extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            room: this.props.room
        }
    }

    componentDidMount(){
        this.props.fetchRoom(this.props.match.params.roomKey)
        console.log(this.props)
    }

    componentDidUpdate(prevProps, prevState){
        console.log(this.props)
        if (prevProps.room !== this.props.room) {
            this.setState({ room: this.props.room })
        }
    }

    render(){
        return (
            <div className='room-lobby-container'>
                <h1>InDevView</h1>
                <div className='entry-code'>
                    <h2>
                        Entry Code: {this.props.room?.room_key}
                    </h2>
                </div>
                <div className='room-lobby-participants'>
                    <p>{this.props.room?.participants.length < 2 ? "Waiting on other people..." : "Ready!"}</p>
                    <ul>
                        {this.props.room?.participants.map(member => 
                            (<li>
                                    {member.handle}
                                    {member.id !== this.props.room.host_id ? 
                                        <button className='remove-user-button' onClick={this.props.removeParticipant(member._id)}>Remove this user</button>
                                    : ' (You)'}
                                {/* Maybe show camera feeds here? */}
                            </li>)
                        )}
                    </ul>
                </div>
                <div className='room-lobby-buttons'>
                    {
                        this.state.roomMembers?.length > 1 && this.props.currentUser._id === this.props.room.host_id ?
                        <Link className='ready-button' to={`/rooms/${this.props.room.room_key}/interview`}>Ready!</Link> :
                        <Link className='not-ready-button' onClick={(e) => e.preventDefault()}>Not Ready</Link>
                    }
                    
                </div>
            </div>
        )
    }
}

export default RoomLobby