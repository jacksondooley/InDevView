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
                <Link className='rooms-link' to="/rooms/create">
                    <a id='create-btn' class="effect effect-1" href="#" title="Create Room">
                        <div className="btn-text">
                            Create room
                        </div>
                    </a>
                </Link>
                <Link id="join-link" className='rooms-link' to="/rooms/join">
                    <a id='join-btn' class="effect effect-1" href="#" title="Join Room">
                        Join Room
                    </a>
                </Link>
            </div>
        )
    }
}

export default Rooms;