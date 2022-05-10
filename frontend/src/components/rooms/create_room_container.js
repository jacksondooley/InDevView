import { connect } from "react-redux";
import CreateRoom from "./create_room"
import { createRoom } from "../../actions/room_actions";
import { fetchQuestions } from "../../actions/question_actions";

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        rooms: state.rooms,
        questions: Object.values(state.questions)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRoom: roomData => dispatch(createRoom(roomData)),
        fetchQuestions: () => dispatch(fetchQuestions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)