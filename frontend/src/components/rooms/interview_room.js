import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../../actions/room_actions";
import '../../stylesheets/interview_room.scss'
import EditorContainer from "../editor/editor_container";
import Editor from '@monaco-editor/react'
import { compile } from "../../util/compile_api_util";
import { questionsObj } from "../questions/questions_obj";
import {socket} from '../../util/socket_client_util';
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
        
        return () => {
            socket.emit("leaveRoom", {roomKey: props.match.params.roomKey, handle: props.currentUser.handle})
            socket.emit("leaveLobby", { roomKey: props.match.params.roomKey, userId: props.currentUser.id } )
        }

    }, [])

    const PassFail = (testCase) => {
        return testCase ? (
            <p className='pass'>PASSED!</p>
        ) : (
            <p className="fail">
                FAILED
            </p>
        )
    }

    const diffDisplay = (difficulty) => {
		if (difficulty === 1) {
			return (
				<div id='easy' className="easy">
						EASY
				</div>
			)
		} else if (difficulty === 2) {
			return (
				<div id='medium' className="medium">
						MEDIUM
				</div>
			)
		} else {
			return (
				<div id='hard' className="hard">
						HARD
				</div>
			)
		}
	}

    const solutions = props.room[0].questions[0].solutions;
    const inputs = props.room[0].questions[0].inputs;
    const codeLine = props.room[0].questions[0].codeLine;
    const [userCode, setUserCode] = useState('function solution(){\n\t\n}');
    const [userOutput, setUserOutput] = useState(['','','']);
    const [testCases, setTestCases] = useState([false, false, false]);
    

    const handleChange = useCallback(
        (value, event) => {
            setUserCode(value);
        }
    )

    const handleClick = useCallback(
        () => {

            if(!userCode){
                const code = 'function solution(){\n\t\n}'
                setUserCode(code);
            }

            let data = {
                code: userCode,
                inputs: inputs
            }

            compile(data).then(({ data }) => {
                setUserOutput(data)
                let newTestCases = testCases;
                // let outputs = [];

                userOutput.forEach((output, idx) => {
                    if(output instanceof Array){
                        let testCase = true;

                        output.forEach((ele, i) => {
                            if(ele !== solutions[idx][i]){
                                testCase = false;
                            }
                        })
                        newTestCases[idx] = testCase
                        setTestCases(newTestCases);
                    }
                    else{
                        newTestCases[idx] = (output === solutions[idx])
                        setTestCases(newTestCases);
                    }
                })
                console.log(userOutput)
            })
        }
    )

    // useEffect(() => {
    //     let newTestCases = testCases;
    //     // let outputs = [];

    //     userOutput.forEach((output, idx) => {
    //         if(output instanceof Array){
    //             let testCase = true;

    //             output.forEach((ele, i) => {
    //                 if(ele !== solutions[idx][i]){
    //                     testCase = false;
    //                 }
    //             })
    //             newTestCases[idx] = testCase
    //             setTestCases(newTestCases);
    //         }
    //         else{
    //             newTestCases[idx] = (output === solutions[idx])
    //             setTestCases(newTestCases);
    //         }
    //     })
    //     // console.log(testCases);
    // }, [userOutput])
    
    return (
        <div className="interview-room-container">
            <div className='left-head'>
               
            </div>
            <div className="code">
                <div className='code-editor'>
                    <Editor
                        height="65vh"
                        defaultLanguage='javascript'
                        defaultValue={'function solution(){\n\t\n}'}
                        theme='vs-dark'
                        onChange={handleChange}
                        />
                </div>

                <div className='test-cases'>
                    <div className='run-test-btn-container'>
                        <button onClick={handleClick}>Run tests</button>
                    </div>
                    <div className='test-case'>
                        <div className='test-case-header'>
                            <h3>
                                Test Case 1
                            </h3>
                            {PassFail(testCases[0])}
                            {/* { testCases[0] ? "Passed" : "Failed"} */}
                        </div>
                        <div>
                            <label>
                                Input:
                            </label>
                            <p>
                                {inputs[0].toString()}
                            </p>
                        </div>
                        <div>
                            <label>
                                Expected Output:
                            </label>
                            <p>
                                {solutions[0].toString()}
                            </p>
                        </div>
                        <div>
                            <label>
                                Actual Output:
                            </label>
                            <p>
                                {userOutput[0] ? userOutput[0].toString() : "Undefined"}
                            </p>
                        </div>
                    </div>
                    <div className='test-case'>
                       <div className='test-case-header'>
                            <h3>
                                Test Case 2
                            </h3>
                            {PassFail(testCases[1])}
                        </div>
                        <div>
                            <label>
                                Input:
                            </label>
                            <p>
                                {inputs[1].toString()}
                            </p>
                        </div>
                        <div>
                            <label>
                                Expected Output:
                            </label>
                            <p>
                                {solutions[1].toString()}
                            </p>
                        </div>
                        <div>
                            <label>
                                Actual Output:
                            </label>
                            <p>
                                { userOutput[1] ? userOutput[1].toString() : "Undefined"}
                            </p>
                        </div>
                    </div>
                    <div className='test-case'>
                        <div className='test-case-header'>
                            <h3>
                                Test Case 3
                            </h3>
                            {PassFail(testCases[2])}
                        </div>
                        <div>
                            <label>
                                Input:
                            </label>
                                {inputs[2].toString()}
                        </div>
                        <div>
                            <label>
                                Expected Output:
                            </label>
                            <p>
                                {solutions[2].toString()}
                            </p>
                        </div>
                        <div>
                            <label>
                                Actual Output:
                            </label>
                            <p>
                                { userOutput[2] ? userOutput[2].toString() : "Undefined"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header">
                <div>
                    <ul>
                        {props.room[0]?.questions?.map(question => 
                            (<li>
                                <div className="interview-body-title">
                                    <h2>{question.title}</h2>
                                </div>
                            </li>)
                        )}
                    </ul>
                </div>
            </div>
            <div className='right-head'>
               
            </div>
            <div className="description">
                <ul>
                    {props.room[0]?.questions?.map(question => 
                    (<li>
                        <p>  
                            {question.description}
                        </p>
                    </li>)
                )}
                </ul>
            </div>
            <div className="chat">
                <div className="interview-right-side-bar">
                    <div className='chat-header'>
                    <i className="fa-solid fa-comments"></i>
                        Chat
                    </div>
                    <div>
                        <Chat />
                    </div>
                </div>
            </div>
            <div className="chat-head">
            {props.room[0]?.questions.map(question => 
                <div className='diff-display'>
                    <p className='diff-time-text'>
                        Difficulty
                    </p>
                    <div id='room-diff'>
                        {diffDisplay(question.difficulty)}
                    </div>
                </div>
                    )}
            </div>
            <div id='room-participants' className="participants">
                <div className='roomkey-container'>
                    <div className='roomkey-text'>
                        <i className="fa-solid fa-key"></i>
                        Room Key:
                    </div>
                    <h2 className='roomkey-num'>
                        {props.room[0]?.room_key}
                    </h2>
                </div>
                <div id='interview-participants' className='room-lobby-participants'>
                    <div id='interviewer-col' className='room-lobby-item'>
                        <label>Host</label>
                        <ul id='room-ul' className='members-ul'>
                            {props.room[0]?.interviewers.map(member =>
                            (<li id='room-li' className='user-li'>
                                {member.handle}
                            </li>)
                            )}
                        </ul>
                    </div>
                    <div className='room-lobby-item'>
                        <label>Candidates</label>
                        <ul id='room-ul' className='members-ul'>
                            {props.room[0]?.interviewees.map(member =>
                            (<li id='room-li' className='user-li'>
                                {member.handle}
                            </li>)
                            )}
                        </ul>
                    </div>
                    {/* <p>{props.room?.participants.length < 2 ? "Waiting on other people..." : "Ready!"}</p> */}
                </div>
                    {/* {props.room[0]?.interviewees.map(member => 
                        (
                            <li>
                            {member.handle}
                            </li>
                            ))}
                            {props.room[0]?.interviewers.map(member => 
                                (
                                    <li>
                                    {member.handle}
                                    </li>
                                ))} */}
                
            </div>
            <div className="part-head">
            <div className='diff-display'>
                    <p className='diff-time-text'>
                        Time
                    </p>
                    <div id='room-diff'>
                        <p id='time-disp' className='roomkey-num'>{props.room[0]?.time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewRoom;

