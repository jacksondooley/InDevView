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
                <h1>
                    Rooms
                </h1>
                <div className='create'>
                    <h2 className='create-header'>
                        Create a custom room
                    </h2>
                    <Link id='create-link' className='rooms-link' to="/rooms/create">
                        <div id='create-btn' className="effect effect-1" title="Create Room">
                            Create room
                        </div>
                    </Link>
                </div>
                <div className="join">
                    <h2 className='join-header'>
                        Already have a roomkey?
                    </h2>
                    <Link id="join-link" className='rooms-link' to="/rooms/join">
                        <div id='join-btn' className="effect effect-1" title="Join Room">
                            Join Room
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Rooms;