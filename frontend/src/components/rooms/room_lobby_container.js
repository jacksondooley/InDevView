import { connect } from 'react-redux'
import RoomLobby from './room_lobby'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomLobby)