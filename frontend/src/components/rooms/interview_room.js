import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../../actions/room_actions";
import '../../stylesheets/interview_room.css'
import EditorContainer from "../editor/editor_container";
import Editor from '@monaco-editor/react'
import { compile } from "../../util/compile_api_util";

const InterviewRoom = (props) => {
    const room = useSelector(state => state.room);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRoom(props.match.params.roomKey))
    }, [])
    const [userCode, setUserCode] = useState(``);
    // const [userOutput, setUserOutput] = useState(['', '', '']);
    const [testCases, setTestCases] = useState('')
    // const solutions = [[2], [4, 6], [0]]
    const inputs = [[1,2], [2,3], [0]]


    const handleChange = useCallback(
        (value, event) => {
            setUserCode(value);
        }
    )

    const handleClick = useCallback(
        () => {
            let data = {
                code: userCode + 'doubler(1,2);'
            }
            compile(data).then(({ data }) => { setTestCases(data)}).catch(err => console.log(err))
            // solutions.forEach( (solution, idx) => {
            //     let data = {
            //         code: userCode,
            //         language: "rb",
            //         input: inputs[idx]
            //     }

            //     compile(data).then(res => {
            //         let newOutput = userOutput;
            //         newOutput[idx] = res.data.output
            //         setUserOutput(newOutput)
            //     })

            //     if(typeof userOutput[idx] === Array){
            //         let testCase = true;

            //         userOutput[idx].forEach( (ele, i) => {
            //             if(ele !== solution[i]){
            //                 testCase = false;
            //             }
            //         })

            //         let newTestCases = testCases;
            //         newTestCases[idx] = testCase;
            //         setTestCases(newTestCases)
            //     }
            //     else{
            //         let newTestCases = testCases;
            //         newTestCases[idx] = (userOutput[idx] === solution)
            //     }
            // })
        }
    )

    return (
        <div className="interview-room-container">
                <div className="interview-room-header">
                    <h1>
                        Entry Code: {props.room?.room_key}
                    </h1>
                    <p>Timer</p>
                </div>
                <div className="interview-room-body">
                    <div>
                        <ul>
                            {props.room[0].questions.map(question => 
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
                            defaultLanguage='ruby'
                            defaultValue='"Hello World"'
                            theme='vs-dark'
                            onChange={handleChange}
                        />
                        
                    </div>
                </div>
                <div className="interview-right-side-bar">
                    <div>
                        These are the live camera feeds
                    </div>
                </div>
                <div className="interview-left-side-bar">
                    <div>
                        Test cases go here.
                        <button onClick={handleClick}>Run tests</button>
                        {/* {testCases.forEach( (testCase, idx) => {
                            return (
                                <div>
                                    Test Case {inputs[idx]} : {testCase ? "Passed" : "Failed"}
                                </div>
                            )
                        })} */}
                        This is where the live chat tab goes.
                        Also here is notes tab.
                    </div>
                    
                </div>
        </div>
    )
}

export default InterviewRoom;