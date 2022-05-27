import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom"
import '../../stylesheets/interview_room.scss'
import Editor from '@monaco-editor/react'
import { compile } from "../../util/compile_api_util";
import {socket} from '../../util/socket_client_util';
import Chat from "../chat";
import { receiveRoom } from "../../actions/room_actions";

const InterviewRoom = (props) => {
    const room = useSelector(state => state.room);
    const dispatch = useDispatch();
    const { roomKey } = useParams();
    const solutions = props.room[0]?.questions[0].solutions;
    const inputs = props.room[0]?.questions[0].inputs;
    const codeLine = props.room[0]?.questions[0].codeLine;
    const currentUserId = useSelector(state => state.session.user.id)
    const [userCode, setUserCode] = useState({
        editorCode: 'function solution(){\n\t\n}',
        lastUserId: currentUserId
    });
    const [userOutput, setUserOutput] = useState(['','','']);
    const [testCases, setTestCases] = useState([false, false, false]);

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        console.log(editorRef)
        editorRef.current = editor; 
        console.log(editorRef)
    }

    let letParams = useParams();
    const constParams = useParams()
    console.log(`letParams: ${letParams.roomKey}`)
    console.log(`constParams: ${constParams.roomKey}`)

    useEffect(() => {
        socket.emit("fetchRoom", {roomKey: roomKey})
        socket.emit("joinRoom", { roomKey: roomKey, handle: props.currentUser.handle, component: 'interview' })

        socket.on("fetchRoomRes", (data) => {
            dispatch(receiveRoom(data))
            // socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        })

        socket.on("receiveEditorChange", (data) => {
            console.log("receiveEditorChange")
            setUserCode(data)
        })
        
        return () => {
            socket.emit("leaveRoom", {roomKey: roomKey, handle: props.currentUser.handle})
            socket.emit("leaveLobby", { roomKey: roomKey, userId: props.currentUser.id } )
            socket.removeAllListeners()
        }

    }, [])

    useEffect(() => {
        console.log("in useEffect-userCode")
        console.log(userCode)
        if (editorRef.current) {
            if (userCode.lastUserId === 0) {
                const cursorPosition = editorRef.current.getPosition();
                editorRef.current.setValue(userCode.editorCode);
                editorRef.current.setPosition(cursorPosition);
                setUserCode({
                    editorCode: userCode.editorCode,
                    lastUserId: currentUserId
                })
            }
        }
    }, [userCode.editorCode])

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
    

    const handleChange = useCallback(
        (value, event) => {

            
            if (userCode.lastUserId === currentUserId) {
                setUserCode({
                    lastUserId: currentUserId,
                    editorCode: value,
                });
                let data = {
                    lastUserId: currentUserId,
                    editorCode: value,
                    roomKey
                }
                
                socket.emit("sendEditorChange", data)
            }
        }
    )

    const handleClick = useCallback(
        () => {

            // if(!userCode){
            //     const editorCode = 'function solution(){\n\t\n}'
            //     setUserCode(code);
            // }

            let data = {
                code: userCode.editorCode,
                inputs: inputs
            }

            compile(data).then(({ data }) => {
                setUserOutput(data)

                // checks if output is equal to solution
                const newData = data.map((output, idx) => {
                    console.log(`${idx}: ${output} ${solutions[idx]}`)
                    console.log(parseInt(output) === solutions[idx])
                    return solutions[idx] === parseInt(output)
                })

                setTestCases(newData)
            })
        }
    )

    
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
                        onMount={handleEditorDidMount}
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
                        <Chat roomKey={roomKey}/>
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
                </div>
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

