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

    renderDescription(description) {
        if (description.length < 120) {
            return description
        } else {
            let chars = description.split("");
            return chars.slice(0, 120).join("") + "..."
        }
    }

    

    render(){
        return(
            <div className="questions-index-page-container">
                <div className="questions-index-container">
                    <h2 className="problems-index-header">
                        Interview questions
                    </h2>
                    <div className="questions-list-container">
                        {this.props.questions.map((question, idx) => (
                            <button className="question-list-btn" value={question._id}>
                                <header className='questions-btn-header'>
                                    <h3 className="question-list-title">
                                        {question.title}
                                    </h3>
                                    <div id="diff" className="difficulty-indicator">
                                        {this.diffDisplay(question.difficulty)}
                                    </div>
                                </header>
                                <div className="questions-list-info-container">
                                    <div>
                                        {this.renderDescription(question.description)}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="create-question-sidebar-container">
                    <header className="create-question-sidebar-header">
                        <h2 className="create-problems-header">
                            Got an idea?
                        </h2>
                    </header>
                    <button className='create-question-button'>
                        Create question
                    </button>
                    <div className="create-problem-description">
                        Create a question to give coders new challenges. Get creative!
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionsIndex;