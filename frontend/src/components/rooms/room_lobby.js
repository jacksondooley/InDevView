import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import '../../stylesheets/room_lobby.scss'
import Chat from '../chat';
import { receiveRoom } from "../../actions/room_actions"
import { socket} from '../../util/socket_client_util';

const startButton = (room) => {
    if (room[0]?.interviewers.every(interviewee => interviewee.status === 1)) {
        return <button id='ready' className='start-button' onClick={() => socket.emit("hostStart", {roomKey: room[0].room_key})}>START</button>
    }
    else {
        return <button id='not-ready' className='start-button'>NOT READY</button>
    }
}

const RoomLobby = (props) => {
    console.log(props)
    let room = useSelector(state => state.room)
    const dispatch = useDispatch()
    

    useEffect(() => {
        // dispatch(fetchRoom(props.match.params.roomKey))
        socket.emit("fetchRoom", {roomKey: props.match.params.roomKey})
        socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        
        
        socket.on("startInterview", (data) => {
            props.history.push(`/rooms/${props.match.params.roomKey}/interview`)
        })

        socket.on("fetchRoomRes", (data) => {
            dispatch(receiveRoom(data))
            socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        })
        
        return () => {
            socket.emit("leaveRoom", {roomKey: props.match.params.roomKey, handle: props.currentUser.handle})
            socket.emit("leaveLobby", { roomKey: props.match.params.roomKey, userId: props.currentUser.id } )
        }
    }, [])

    return (
        <div className='room-lobby-container'>
            <div className="roomkey">
                <div className='roomkey-text'>
                <i className="fa-solid fa-key"></i>
                    Room Key:
                </div>
                <h2 className='roomkey-num'>
                    {props.room?.room_key}
                </h2>
            </div>
            <div className="time">
                <div className='time-header'>
                    <i className="fa-solid fa-hourglass-start"></i>
                    <div className='duration'>
                        {props.room?.time / 60} minutes
                    </div>
                </div>
            </div>
            <h1 className="header">
                Lobby
            </h1>
            <div className="buttons">
                <div className='room-lobby-buttons'>
                    {/* {
                        props.room?.participants.length > 1 && currentUser._id === props.room?.host_id ?
                            <Link className='ready-button' to={`/rooms/${props?.room.room_key}/interview`}>Ready!</Link> :
                            <Link className='not-ready-button' onClick={(e) => e.preventDefault()}>Not Ready</Link>
                    } */}
                    {room ? startButton(room) : <div>yes</div>}
                    <button id='ready-up' className='start-button' onClick={() => socket.emit("changeStatus", { roomKey: props.match.params.roomKey, userId: props.currentUser.id })}>
                        {props.currentUser.status === 0 ? "READY UP" : "NOT READY"}
                    </button>
                </div>
            </div>
            <div className="chat">
                <div className='lobby-chat-container'>
                    <Chat roomKey={props.match.params.roomKey} handle={props.currentUser?.handle}/>
                </div>
            </div>
            <div className="participants">
                <div className='room-lobby-participants'>
                    <div id='interviewer-col' className='room-lobby-item'>
                        <label>Host</label>
                        <ul className='members-ul'>
                            {props.room?.interviewers.map(member =>
                            (<li className = 'user-li'>
                                <div className='status-icons'>
                                    {member.status === 0 ?
                                    <i className="fa-solid fa-circle-xmark"></i> :
                                    <i className="fa-solid fa-circle-check"></i>  
                                    }
                                </div>
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
                        <label>Candidates</label>
                        <ul className='members-ul'>
                            {props.room?.interviewees.map(member =>
                            (<li className = 'user-li'>
                                <div className='status-icons'>
                                    {member.status === 0 ?
                                    <i className="fa-solid fa-circle-xmark"></i> :
                                    <i className="fa-solid fa-circle-check"></i>  
                                    }
                                </div>
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
            </div>
            <div className="chat-header">
                <i className="fa-solid fa-comments"></i>
                Chat
            </div>
        </div>
    )
}

export default RoomLobby


