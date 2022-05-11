import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import '../../stylesheets/room_lobby.css'
import Chat from '../chat';
import { fetchRoom } from "../../actions/room_actions"
import socket from '../../util/socket_client_util';


class RoomLobby1 extends React.Component{
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

    renderChat() {
        return <Chat roomKey={this.props.match.params.roomKey} handle={this.props.currentUser.handle}/>
    }

    render(){
        return (
            <div className='room-lobby-container'>
                <h1>InDevView</h1>
                <div>
                    {this.renderChat()}
                </div>
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


const RoomLobby = (props) => {
    let room = useSelector(state => state.room)
    console.log(room)
    console.log(props)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchRoom(props.match.params.roomKey))
    }, [])

    // renderChat() {
    //     return <Chat roomKey={props.match.params.roomKey} handle={this.props.currentUser.handle} />
    // }

    return (
        <div className='room-lobby-container'>
            <h1>InDevView</h1>
            <div>
                <Chat roomKey={props.match.params.roomKey} handle={props.currentUser?.handle}/>
            </div>
            <div className='entry-code'>
                <h2>
                    Entry Code: {props.room?.room_key}
                </h2>
            </div>
            <div className='room-lobby-participants'>
                <p>{props.room?.participants.length < 2 ? "Waiting on other people..." : "Ready!"}</p>
                <ul>
                    {props.room?.participants.map(member =>
                    (<li>
                        {member.handle}
                        {member.id !== props.room.host_id ?
                            <button className='remove-user-button' >Remove this user</button> //onClick={removeParticipant(member._id)}
                            : ' (You)'}
                        {/* Maybe show camera feeds here? */}
                    </li>)
                    )}
                </ul>
            </div>
            <div className='room-lobby-buttons'>
                {
                    props.room?.participants.length > 1 && currentUser._id === props.room?.host_id ?
                        <Link className='ready-button' to={`/rooms/${props?.room.room_key}/interview`}>Ready!</Link> :
                        <Link className='not-ready-button' onClick={(e) => e.preventDefault()}>Not Ready</Link>
                }

            </div>
        </div>
    )
}

export default RoomLobby