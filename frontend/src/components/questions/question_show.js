import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchQuestion } from "../../actions/question_actions";

const QuestionShowContainer = (props) => {
	const dispatch = useDispatch()
	const questions = useSelector(state => state.questions)
	const [question, setQuestion] = useState()
	useEffect(() => {
		dispatch(fetchQuestion(props.match.params.id))
	}, [])

	console.log(props.match.params.id) // => "627ac4c623ab85a880964d47"
	console.log(question)
	// if (questions)
	return (
		<>
			<div className="question-show-container">
				<div>
				</div>
			</div>
		</>
	)
}

export default withRouter(QuestionShowContainer);

