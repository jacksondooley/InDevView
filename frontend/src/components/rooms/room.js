import React from "react";

class Room extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="room-container">
                <h1>
                    {/* Room key to share */}
                    {this.props.room.room_key}
                </h1>
                <div>
                    {/* Timer goes here */}
                </div>
                <div>
                    <div>
                        <ul>
                            {/* Code question goes here */}
                            {this.props.room.questions.forEach(question => {
                                <li>
                                    <div>
                                        <h1>{question.title}</h1>
                                        <p>{question.difficulty}</p>
                                    </div>

                                    <div>
                                        {question.description}
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div>
                        {/* Code editor goes here */}
                    </div>
                </div>
                <div>
                    <div>
                        {/* Live camera feeds go here */}
                    </div>
                    <div>
                        {/* Live chat goes here */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Room;