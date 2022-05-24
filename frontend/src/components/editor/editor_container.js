import { connect } from 'react-redux'
import CodeEditor from './editor'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// }

export default connect(mapStateToProps, null)(CodeEditor);