import { connect } from "react-redux";
import QuestionsIndex from "./questions_index"
import { fetchQuestions } from "../../actions/question_actions";

const mapStateToProps = (state) => {
    return {
        questions: Object.values(state.questions)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuestions: () => dispatch(fetchQuestions())
    }
}

const QuestionsIndexContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionsIndex)
export default QuestionsIndexContainer;