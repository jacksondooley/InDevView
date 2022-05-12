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
    console.log(currentUser)

    useEffect(() => {
        // dispatch(fetchRoom(props.match.params.roomKey))
        socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        socket.emit("fetchRoom", {roomKey: props.match.params.roomKey})   
        
        socket.on("fetchRoomRes", (data) => {
            dispatch(receiveRoom(data))
        })
        
        return () => socket.emit("leaveLobby", { roomKey: props.match.params.roomKey, userId: props.currentUser.id } )
    }, [])



    // renderChat() {
    //     return <Chat roomKey={props.match.params.roomKey} handle={this.props.currentUser.handle} />
    // }

    return (
        <div className='room-lobby-container'>
            <h1>InDevView</h1>
            <div className='entry-code'>
                <div>Entry Code:</div>
                <h2>
                    {props.room?.room_key}
                </h2>
            </div>
            <div className='room-lobby-participants'>
                <div className='room-lobby-item'>
                    <label>Intreviewer</label>
                    <ul>
                        {props.room?.interviewers.map(member =>
                        (<li>
                            {member.handle}
                            {/* {member.id !== props.room.host_id ?
                                <button className='remove-user-button' >Remove this user</button> //onClick={removeParticipant(member._id)}
                                : ' (You)'} */}
                            {/* Maybe show camera feeds here? */}
                        </li>)
                        )}
                    </ul>
                </div>
                <div className='room-lobby-item'>
                    <label>Interviewee</label>
                    <ul>
                        {props.room?.interviewees.map(member =>
                        (<li>
                            {member.handle}
                            {/* {member.id !== props.room.host_id ?
                                <button className='remove-user-button' >Remove this user</button> //onClick={removeParticipant(member._id)}
                                : ' (You)'} */}
                            {/* Maybe show camera feeds here? */}
                        </li>)
                        )}
                    </ul>
                </div>
                {/* <p>{props.room?.participants.length < 2 ? "Waiting on other people..." : "Ready!"}</p> */}
            </div>
            <div className='room-lobby-buttons'>
                {/* {
                    props.room?.participants.length > 1 && currentUser._id === props.room?.host_id ?
                        <Link className='ready-button' to={`/rooms/${props?.room.room_key}/interview`}>Ready!</Link> :
                        <Link className='not-ready-button' onClick={(e) => e.preventDefault()}>Not Ready</Link>
                } */}

            </div>
            <div>
                <Chat roomKey={props.match.params.roomKey} handle={props.currentUser?.handle}/>
            </div>
        </div>
    )
}

export default RoomLobby