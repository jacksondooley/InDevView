import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../../actions/room_actions";
import '../../stylesheets/interview_room.css'
import EditorContainer from "../editor/editor_container";
import Editor from '@monaco-editor/react'

class InterviewRoom1 extends React.Component{
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

const InterviewRoom = (props) => {
    const room = useSelector(state => state.room);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRoom(props.match.params.roomKey))
    }, [])
    const [answer, setAnswer] = useState('');
    const [parameters, setParameters] = useState('');
    const [testCase1, setTestCase1] = useState(false);
    const [testCase2, setTestCase2] = useState(false);
    const [testCase3, setTestCase3] = useState(false);
    const [value, setValue] = useState('');

    const handleChange = useCallback(
        (value, event) => {
            setValue(value);
            console.log(value)
            // const parameters = extractParameters(value);
            // const answer = extractCode(value);
            // console.log(parameters)
            // console.log(answer)
            // setAnswer(answer);
            // setParameters(parameters);
        }
    )

    const handleClick = useCallback(
        () => {
            // runs through each of the three inputs and checks each answer matches each solution
            // if(testCases(answer, parameters, input1, solution1)){
            //     setTestCase1(true)
            // }
            // else if(!testCases(answer, parameters, input1, solution1)){
            //     setTestCase1(false)
            // }

            // if(testCases(answer, parameters, input2, solution2)){
            //     setTestCase2(true);
            // }
            // else if(!testCases(answer, parameters, input2, solution2)){
            //     setTestCase2(false)
            // }

            // if(testCases(answer, parameters, input3, solution3)){
            //     setTestCase3(true);
            // }
            // else if(!testCases(answer, parameters, input3, solution3)){
            //     setTestCase3(false)
            // }
            var vm = require('vm');
            const script = new vm.Script(`function add(a, b){ return a + b} const x = add(1,2)`)
            console.log(script.runInThisContext())
        }
    )
    // won't work bc cannot operate properly with helper methods
    const extractParameters = function(str){
        let newStr = '';
        let parameters = false;
        for(let i = 0; i < str.length; i++){
            if(str[i] === "("){
                parameters = true
            }
            else if(str[i] === ")"){
                break
            }
            else if(parameters){
                newStr += str[i]
            }
            
        }
        return newStr.replace(',', '').split(' ');
    }

    const extractCode = function(str){
        let newStr = '';
        let code = false;
        let lastRightBracket = str.length;
        let firstLeftRacket = false;

        for(let i = str.length-1; i > -1; i--){
            if(str[i] === "}"){
                lastRightBracket = i;
                break;
            }
        }

        for(let i = 0; i < str.length; i++){
            if(str[i] === "{" && !firstLeftRacket){
                code = true;
                firstLeftRacket = true;
            }
            else if(i === lastRightBracket){
                break
            }
            else if(code){
                newStr += str[i];
            }
        }
        return newStr
    }

    const testCases = (answer, parameters, input, solution) => {
        // input is an array of paramters i.e. binarySearch(arr, target), input would be [[1,2,3],3]
        let func = new Function(...parameters, answer);
        let correct = false;
        if(typeof solution === Array){
            correct = true
            let testAnswer = func(...input)
            solution.forEach((ele, idx) => {
                if(ele !== testAnswer[idx]){
                    correct = false;
                }
            })
        }
        else{
            if(func(...input) === solution){
                correct = true;
            }
        }
        return correct;
    }

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
                            defaultLanguage='javascript'
                            defaultValue='"Hello World"'
                            theme='vs-dark'
                            onChange={handleChange}
                        />
                        <script>
                            {value}
                        </script>
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
                        <div>
                            Test Case 1: { testCase1 ? "Passed": "Failed"}
                        </div>
                        <div>
                            Test Case 2: { testCase2 ? "Passed" : "Failed"}
                        </div>
                        <div>
                            Test Case 3: { testCase3 ? "Passed" : "Failed"}
                        </div>
                        This is where the live chat tab goes.
                        Also here is notes tab.
                    </div>
                    
                </div>
        </div>
    )
}

export default InterviewRoom;