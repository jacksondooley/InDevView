import { connect } from 'react-redux'
import Rooms from './rooms'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)