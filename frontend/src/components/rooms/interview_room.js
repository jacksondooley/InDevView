import React from "react";
import '../../stylesheets/interview_room.css'
import EditorContainer from "../editor/editor_container";

class InterviewRoom extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchRoom(this.props.room.room_key)
    }

    render(){
        return(
            <div className="interview-room-container">
                <div className="interview-room-header">
                    <h1>
                        Entry Code: {this.props.room[0].room_key}
                    </h1>
                    {/* Timer goes here */}
                    <p>Timer</p>
                </div>
                <div className="interview-room-body">
                    <div>
                        <ul>
                            {/* Code question goes here */}
                            {this.props.room[0].questions.map(question => 
                                (<li>
                                    <div className="interview-body-title">
                                        <h2>{question.title}</h2>
                                        <p>Difficulty:  
                                            {question.difficulty === 1 ? ' Easy' : question.difficulty === 2 ? ' Medium' : ' Hard'}
                                        </p>
                                    </div>

                                    <div className="question-description">
                                        {question.description}
                                    </div>
                                </li>)
                            )}
                        </ul>
                    </div>
                    <div>
                        {/* Code editor goes here */}
                        <EditorContainer/>
                    </div>
                </div>
                <div className="interview-right-side-bar">
                    <div>
                        These are the live camera feeds
                        {/* Live camera feeds go here */}
                        
                    </div>
                </div>
                <div className="interview-left-side-bar">
                    <div>
                        Test cases go here.
                        {/* test cases go here */}
                        This is where the live chat tab goes.
                        {/* Live chat goes here */}
                        Also here is notes tab.
                        {/* Notes for interviewer are here */}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default InterviewRoom;