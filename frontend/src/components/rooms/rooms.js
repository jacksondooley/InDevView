import React from "react";
import { Link } from "react-router-dom"
import '../../stylesheets/rooms.css'

class Rooms extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="room-lobby-container">
                <div className="create-room">
                    <Link to="/rooms/create">Create a Room</Link>
                </div>
                <div className="join-room">
                    <Link to="/rooms/join">Join a Room</Link>
                </div>
            </div>
        )
    }
}

export default Rooms;