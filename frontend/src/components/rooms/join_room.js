import React from "react";
import '../../stylesheets/join_room.scss'
import { Link } from "react-router-dom"
import { socket } from '../../util/socket_client_util';

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
            .then(() => socket.emit("fetchRoom", { roomKey: this.state.roomKey }))
       
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render(){
        return(
            <div className="join-room-container">
                <div className='join-room-main-col'>
                    <p>Enter a room key</p>
                    <input className='join-room-input' type="number" placeholder="Room Key" onChange={this.update('roomKey')}></input>
                        <div className='join-room-btn-container'>
                            <button id='join-room-btn' value="Submit" onClick={this.handleSubmit}>Join Room</button>
                        </div>
                    <Link id="lobby-link" className='form-small-link' to="/rooms">Back to rooms</Link>
                    <br/>
                    <Link id="lobby-link" className='form-small-link' to="/rooms/create">Create room</Link>
                </div>
            </div>
        )
    }
}

export default JoinRoom;