import React from "react";
import { connect } from "react-redux";
import { fetchQuestion } from "../../actions/question_actions";
import QuestionShow from "./question_show";

const mSTP = state => ({

})

const mDTP = dispatch => ({
	fetchQuestion: dispatch => fetchQuestion()
})


const QuestionShowContainer = connect(mSTP, mDTP)(QuestionShow);
export default QuestionShowContainer;
