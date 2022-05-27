import { connect } from 'react-redux';
// import SignupForm from './signup_form';
import { showModal } from '../../actions/modal_actions';
import About from './about';

const mapStateToProps = (state) => {
	return {
		loggedIn: state.session.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		showModal: modal => dispatch(showModal(modal))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(About);