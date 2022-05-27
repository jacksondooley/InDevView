import { connect } from 'react-redux'
import InterviewRoom from './interview_room'
import { fetchRoom } from '../../actions/room_actions'

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return {
        currentUser: state.session.user,
        room: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRoom: (roomKey) => dispatch(fetchRoom(roomKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewRoom)