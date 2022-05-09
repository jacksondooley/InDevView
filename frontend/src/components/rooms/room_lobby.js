import React from "react";
import { Link } from "react-router-dom"

class RoomLobby extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="room-lobby-container">
                <div className="create-room">
                    <Link to="/create">Create</Link>
                </div>
                <div className="join-room">
                    <Link to="/join">Join</Link>
                </div>
            </div>
        )
    }
}

export default RoomLobby;