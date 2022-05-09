import { connect } from 'react-redux'
import Room from './room'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)