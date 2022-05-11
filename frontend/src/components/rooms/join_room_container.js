import { connect } from "react-redux";
import { addParticipant } from "../../actions/room_actions";
import JoinRoom from "./join_room"
import { fetchRoom } from "../../actions/room_actions";

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        rooms: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRoom: roomKey => dispatch(fetchRoom(roomKey)),
        addParticipant: (roomKey, participant) => dispatch(addParticipant(roomKey, participant))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom)