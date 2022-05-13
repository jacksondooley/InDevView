import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import '../../stylesheets/room_lobby.css'
import Chat from '../chat';
import { receiveRoom } from "../../actions/room_actions"
import socket from '../../util/socket_client_util';

const startButton = (room) => {
    if (room[0]?.interviewers.every(interviewee => interviewee.status === 1)) {
        return <button onClick={() => socket.emit("hostStart", {roomKey: room[0].room_key})}>Start</button>
    }
    else {
        return <button>Awaiting Ready</button>
    }
}

const RoomLobby = (props) => {
    let room = useSelector(state => state.room)
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        // dispatch(fetchRoom(props.match.params.roomKey))
        socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        socket.emit("fetchRoom", {roomKey: props.match.params.roomKey})
        
        
        socket.on("startInterview", (data) => {
            console.log("pls sir")
            props.history.push(`/rooms/${data.roomKey}/interview`)
        })

        socket.on("fetchRoomRes", (data) => {
            dispatch(receiveRoom(data))
            socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        })
        
        return () => socket.emit("leaveLobby", { roomKey: props.match.params.roomKey, userId: props.currentUser.id } )
    }, [])



    // renderChat() {
    //     return <Chat roomKey={props.match.params.roomKey} handle={this.props.currentUser.handle} />
    // }

    // const changeStatus = () => {
        
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
            <div>
                <label>Interview Length:</label>
                <div>{props.room?.time / 60} minutes</div>
            </div>
            <div className='room-lobby-participants'>
                <div className='room-lobby-item'>
                    <label>Interviewer</label>
                    <ul>
                        {props.room?.interviewers.map(member =>
                        (<li>
                            {member.handle}
                            {/* {member.id !== props.room.host_id ?
                                <button className='remove-user-button' >Remove this user</button> //onClick={removeParticipant(member._id)}
                                : ' (You)'} */}
                            {/* Maybe show camera feeds here? */}
                            {member.status === 0 ? 'not ready' : 'ready'}
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
                            {member.status === 0 ? 'not ready' : 'ready'}
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
                {room ? startButton(room) : <div>yes</div>}
                <button onClick={() => socket.emit("changeStatus", { roomKey: props.match.params.roomKey, userId: props.currentUser.id })}>
                    {props.currentUser.status === 0 ? "ready up" : "not ready"}
                </button>
            </div>
            <div>
                <Chat roomKey={props.match.params.roomKey} handle={props.currentUser?.handle}/>
            </div>
        </div>
    )
}

export default RoomLobby


