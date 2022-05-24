import React, { useEffect } from 'react'
import Editor from '@monaco-editor/react'
import '../../stylesheets/editor.css'
import { socket } from '../../util/socket_client_util'

// class CodeEditor extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             answer: '',
//             parameters: ''
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.extractParameters = this.extractParameters.bind(this);
//         this.extractCode = this.extractCode.bind(this);
//     }

//     handleChange(value, event){
//         const parameters = this.extractParameters(value);
//         const answer = this.extractCode(value)
//         this.setState({ answer: answer, parameters: parameters})
//     }

//     extractParameters(str){
//         let newStr = '';
//         let parameters = false;
//         for(let i = 0; i < str.length; i++){
//             if(str[i] === "("){
//                 parameters = true
//             }
//             else if(str[i] === ")"){
//                 break
//             }
//             else if(parameters){
//                 newStr += str[i]
//             }
            
//         }
//         return newStr.replace(',', '').split(' ');
//     }

//     extractCode(str){
//         let newStr = '';
//         let code = false;
//         let lastRightBracket = str.length;

//         for(let i = str.length-1; i > -1; i--){
//             if(str[i] === "}"){
//                 lastRightBracket = i;
//                 break;
//             }
//         }

//         for(let i = 0; i < str.length; i++){
//             if(str[i] === "{"){
//                 code = true;
//             }
//             else if(i === lastRightBracket){
//                 break
//             }
//             else if(code){
//                 newStr += str[i];
//             }
//         }
//         return newStr
//     }

//     render(){
//         return(
//             <div className='code-editor'>
//                 <Editor
//                     height="65vh"
//                     defaultLanguage='javascript'
//                     defaultValue='"Hello World"'
//                     theme='vs-dark'
//                     onChange={this.handleChange}
//                 />
                
//             </div>
//         )
//     }
// }

const CodeEditor = (props) => {
    
    
    useEffect(() => {
        socket.emit("joinRoom", { roomKey: props.match.params.roomKey, handle: props.currentUser.handle })
        
        return () => socket.emit("leaveRoom", {roomKey: props.match.params.roomKey, handle: props.currentUser.handle})
    }, [])

    return(
        <div className='code-editor'>
            <Editor
                height="65vh"
                width="50vw"
                defaultLanguage='javascript'
                defaultValue='"Hello World"'
                theme='vs-dark'
                // onChange={this.handleChange}
            />
            
        </div>
    )
}

export default CodeEditor;