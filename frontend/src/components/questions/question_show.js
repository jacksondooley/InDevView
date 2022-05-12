import "../../stylesheets/question_show.scss";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchQuestion } from "../../actions/question_actions";

const QuestionShowContainer = (props) => {
	const dispatch = useDispatch()
	const questions = useSelector(state => state.questions)
	const question = questions[0]
	console.log(question)
	useEffect(() => {
		dispatch(fetchQuestion(props.match.params.id))
	}, [])

	const diffDisplay = (difficulty) => {
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

	return (
		<>
			<div className="question-show-container">
				<h2 className="question-show-title">
					{question?.title}
				</h2>
				<div className="question-show-difficulty">
					LEVEL : <span className="diff-color">{diffDisplay(question?.difficulty)}</span>
				</div>
				<div className="question-show-body">
				
					<div id="quest-show-col" className="question-show-description">
						<h3 className="question-show-body-header">
							description
						</h3>
						<div className="quest-show-left-col">
							<div className="quest-body-text">
								{question?.description}
								<br/>
								<br/>
								<div className="template-container">
									{question?.template}
								</div>
							</div>
							
						</div>
					</div>
					<div id="quest-show-col" className="question-show-solution">
						<h3 className="question-show-body-header">
							solution
						</h3>
						<div id='quest-solution-text' className="quest-body-text">
							{question?.solution}
						</div>
					</div>
				</div>
				
			</div>
		</>
	)
}

export default withRouter(QuestionShowContainer);


