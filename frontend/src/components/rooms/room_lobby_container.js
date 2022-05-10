import { connect } from "react-redux"
import RoomLobby from "./room_lobby"
import { addParticipant, removeParticipant } from "../../actions/room_actions"

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.id,
        room: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addParticipant: (participant) => dispatch(addParticipant(participant)),
        removeParticipant: (participantId) => dispatch(removeParticipant(participantId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomLobby)