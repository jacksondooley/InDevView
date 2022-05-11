import { connect } from "react-redux"
import RoomLobby from "./room_lobby"
import { addParticipant, removeParticipant, fetchRoom } from "../../actions/room_actions"

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        room: state.room[0]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addParticipant: (participant) => dispatch(addParticipant(participant)),
        removeParticipant: (participantId) => dispatch(removeParticipant(participantId)) ,
        fetchRoom: (roomKey) => dispatch(fetchRoom(roomKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomLobby)