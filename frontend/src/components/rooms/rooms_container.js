import { connect } from 'react-redux'
import { removeRoom } from '../../actions/room_actions'
import Rooms from './rooms'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeRoom: () => dispatch(removeRoom())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)