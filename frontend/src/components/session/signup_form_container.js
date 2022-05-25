import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SignupForm from './signup_form';
import { showModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.isAuthenticated,
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    showModal: modal => dispatch(showModal(modal))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);