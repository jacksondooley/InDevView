import { connect } from "react-redux";
import Questions from "./questions"
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

export default connect(mapStateToProps, mapDispatchToProps)(Questions)