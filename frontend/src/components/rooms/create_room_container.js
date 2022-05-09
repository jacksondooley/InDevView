import { connect } from "react-redux";
import CreateRoom from "./create_room"

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)