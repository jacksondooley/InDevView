import { connect } from 'react-redux'
import Room from './room'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        room: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)