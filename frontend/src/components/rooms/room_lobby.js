import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import '../../stylesheets/room_lobby.css'
import Chat from '../chat';
import { receiveRoom } from "../../actions/room_actions"
import socket from '../../util/socket_client_util';


const RoomLobby = (props) => {
    let room = useSelector(state => state.room)

    console.log(room)
    console.log(props)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        // dispatch(fetchRoom(props.match.params.roomKey))
        socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        socket.emit("fetchRoom", {roomKey: props.match.params.roomKey})

        socket.on("fetchRoomRes", (data) => {
            dispatch(receiveRoom(data))
        })

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