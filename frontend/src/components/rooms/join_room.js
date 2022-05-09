import React from "react";

class JoinRoom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            roomKey: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){

    }

    handleSubmit(e){
        e.preventDefault();
        // based down through props, join a room based upon this.state.roomKey
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render(){
        return(
            <div>
                <p>Please enter a room key:</p>
                <input type="text" placeholder="Room Key" onChange={this.update('roomKey')}></input>
                <button value="Submit" onClick={this.handleSubmit}>Join Room</button>
            </div>
        )
    }
}

export default JoinRoom;