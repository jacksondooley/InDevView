import React from 'react'
import Editor from '@monaco-editor/react'
import '../../stylesheets/editor.css'

class CodeEditor extends React.Component{
    constructor(props){
        super(props)
    }

    handleChange(value, event){
        //value is a string
    }



    render(){
        return(
            <div className='code-editor'>
                <Editor
                    height="65vh"
                    defaultLanguage='javascript'
                    defaultValue='"Hello World"'
                    theme='vs-dark'
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default CodeEditor;