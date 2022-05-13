import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../../actions/room_actions";
import '../../stylesheets/interview_room.css'
import EditorContainer from "../editor/editor_container";
import Editor from '@monaco-editor/react'
import { compile } from "../../util/compile_api_util";
import { questionsObj } from "../questions/questions_obj";
import socket from '../../util/socket_client_util';
import Chat from "../chat";
import { receiveRoom } from "../../actions/room_actions";

const InterviewRoom = (props) => {
    const room = useSelector(state => state.room);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    useEffect(() => {
        socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        socket.emit("fetchRoom", {roomKey: props.match.params.roomKey})

        socket.on("fetchRoomRes", (data) => {
            dispatch(receiveRoom(data))
            socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        })

    }, [])
    // const [userCode, setUserCode] = useState(``);
    // const [userOutput, setUserOutput] = useState([]);
    // const [testCases, setTestCases] = useState([false, false, false]);
    // const [newData, setNewData] = useState([''])
    // const solutions = questionsObj[props.room[0].questions[0].title].solutions;
    // const inputs = questionsObj[props.room[0].questions[0].title].inputs;
    // const codeLine = questionsObj[props.room[0].questions[0].title].codeLine;

    // const handleChange = useCallback(
    //     (value, event) => {
    //         setUserCode(value);
    //     }
    // )

    // const handleClick = useCallback(
    //     () => {
            
    //         inputs.forEach( (input, idx) => {
    //             // console.log(input)
    //             // console.log(idx)
    //             let data = {
    //                 code: userCode + codeLine + '\nmodule.exports = { func }',
    //                 input: input

    //             }
    //             let newOutput = userOutput;
    //             compile(data).then( ({ data }) => {
    //                 let newOutput = userOutput;
    //                 newOutput.push(data);
    //                 setUserOutput(newOutput)
    //                 console.log(userOutput)
    //             })
    //         })
    //         // console.log(userOutput)
    //         let newTestCases = testCases;

    //         userOutput.forEach((output, idx) => {
    //             if(typeof output === Array){
    //                 let testCase = true;

    //                 output.forEach((ele, i) => {
    //                     if(ele !== solutions[idx][i]){
    //                         testCase = false;
    //                     }
    //                 })
    //                 newTestCases[idx] = testCase
    //                 setTestCases(newTestCases);
    //             }
    //             else{
    //                 newTestCases[idx] = (output === solutions[idx])
    //                 setTestCases(newTestCases);
    //             }
    //         })
    //         console.log("has finished compiling")
    //     }
    // )

    return (
        <div className="interview-room-container">
                <div className="interview-room-header">
                    <h1>
                        Entry Code: {props.room[0]?.room_key}
                    </h1>
                    <p>Time left: {props.room[0]?.time}</p>
                </div>
                <div className="interview-room-body">
                    <div>
                        <ul>
                            {props.room[0]?.questions.map(question => 
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
                    <div className='code-editor'>
                        <Editor
                            height="65vh"
                            defaultLanguage='javascript'
                            defaultValue={'//Enter your code here'}
                            theme='vs-dark'
                        />
                        
                    </div>
                </div>
                <div className="interview-right-side-bar">
                    <div>
                        <Chat />
                    </div>
                </div>
                <div className="interview-left-side-bar">
                    {/* <div>
                        Test cases go here.
                        <button onClick={handleClick}>Run tests</button>
                        <div>
                            Test Case 1   
                            <div>
                                Input: {inputs[0].toString()}
                            </div>
                            <div>
                                Output: {solutions[0].toString()}
                            </div>
                            <div>
                                User Submitted: { testCases[0] ? "Passed" : "Failed"}
                            </div>
                        </div>
                        <div>
                            Test Case 2   
                            <div>
                                Input: {inputs[1].toString()}
                            </div>
                            <div>
                                Output: {solutions[1].toString()}
                            </div>
                            <div>
                                User Submitted: { testCases[1] ? "Passed" : "Failed"}
                            </div>
                        </div>
                        <div>
                            Test Case 3   
                            <div>
                                Input: {inputs[2].toString()}
                            </div>
                            <div>
                                Output: {solutions[2].toString()}
                            </div>
                            <div>
                                User Submitted: { testCases[2] ? "Passed" : "Failed"}
                            </div>
                        </div>
                    </div> */}
                    
                </div>
        </div>
    )
}

export default InterviewRoom;