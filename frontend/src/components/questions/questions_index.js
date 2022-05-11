import React from "react";
import '../../stylesheets/questions_index.scss'

class QuestionsIndex extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchQuestions()
    }

    diffDisplay(difficulty) {
        if (difficulty === 1) {
            return (
                <div className="easy">
                    EASY
                </div>
            )
        } else if (difficulty === 2) {
            return (
                <div className="medium">
                    MEDIUM
                </div>
            )
        } else {
            return (
                <div className="hard">
                    HARD
                </div>
            )
        }
    }

    render(){
        return(
            <div className="questions-index-container">
                <h2 className="problems-index-header">
                    Problems
                </h2>
                <div className="questions-list-container">
                    {this.props.questions.map((question, idx) => (
                        <button className="question-list-btn" value={question._id}>
                            <header className='questions-btn-header'>
                                <h3 className="question-list-title">
                                    {question.title}
                                </h3>
                                <div className="difficulty-indicator">
                                    {this.diffDisplay(question.difficulty)}
                                </div>
                            </header>
                            <div className="questions-list-info-container">
                                <div>
                                    {question.description}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        )
    }
}

export default QuestionsIndex;