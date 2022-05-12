import React from "react";
import { Link } from "react-router-dom"
import '../../stylesheets/rooms.scss'

class Rooms extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.removeRoom()
    }

    render(){
        return(
            <div className="rooms-container">
                <div className="create-room">
                    <Link to="/rooms/create">Create Room</Link>
                </div>
                <div className="join-room">
                    <Link to="/rooms/join">Join Room</Link>
                </div>
            </div>
        )
    }
}

export default Rooms;