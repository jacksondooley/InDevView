import React from "react";

class Questions extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchQuestions()
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default Questions;