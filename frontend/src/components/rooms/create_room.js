import React from "react";
import '../../stylesheets/create_room.scss'
import { Link } from "react-router-dom"

class CreateRoom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            questions: '',
            time: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //fetches all questions inorder to display them in form.
    componentDidMount(){
        this.props.fetchQuestions()
    }

    //if rooms changed, when form is submited, redirects user to the created room
    componentDidUpdate(prevProps, prevState){
        if (prevProps.room !== this.props.room) {
            this.props.history.push(`/rooms/${this.props.room.room_key}/lobby`)
        }
    }

    handleSubmit(e){
        e.preventDefault();
        // let room = {
        //     description: this.state.description,
        //     duration: this.state.duration
        const questionObjects = this.state.questions
        
        function questionFilter(question) {
            if (question._id === questionObjects) {
                return question
            }
        }
        const selectedQuestion = this.props.questions.filter(questionFilter)
        const temp_room = {
            questions: selectedQuestion,
            user: this.props.currentUser,
            time: this.state.time * 60
        }
        console.log(temp_room)
        this.props.createRoom(temp_room)
        // creates a room from the method passed down into props
    }

    update(field){
        return e => this.setState({
            [field]: e.target.value
        })
    }

    // setQuestion(value) {
    //     this.setState({ questions: [value]})
    // }

    render(){
        return(
            <div className="create-room-container">
                <div className='create-room-main-col'>
                <form className='create-room-form' onSubmit={this.handleSubmit}>
                    <div className='create-room-form-inputs'>
                        <div>
                        <label>Time (minutes)</label>
                        <div className="create-room-timer">
                            <input
                                id='time-form'
                                className='create-room-input'
                                type="number"
                                min="1" 
                                step="1" 
                                placeholder="time" 
                                onChange={this.update('time')}>    
                            </input>
                        </div> 

                        </div>
                        <ul>
                            {/* {this.props.questions.map(question => (
                                <li>{question.title}</li>
                            ))} */}
                        </ul>
                        <div className="coding-questions-form">
                            <label>Choose a question</label>
                            <select id='quest-sel' className='question-select' onChange={this.update("questions")}>
                                <option className='create-room-dropdown' selected disabled hidden placeholder="Select"></option>
                                {this.props.questions.map((question, idx) => (
                                    <option value={question._id}>{question.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="users-in-lobby">
                            <div>
                                {/* Shows the user that is the interviewer */}
                            </div>
                            <div>
                                {/* Shows all of the users in the room */}
                                {/* Able to select which user is able to into what role */}
                            </div>
                            <div>
                                {/* Shows the user that is the interviewee */}
                            </div>
                        </div>
                    </div>
                    <input className='create-room-btn' type="submit" value="Create Room"/>
                
                </form>
                <Link className='lobby-link' to='/rooms'>Back to Rooms</Link>
                </div>
            </div>
        )
    }
}

export default CreateRoom;