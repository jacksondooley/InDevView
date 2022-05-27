import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { closeModal, showModal } from '../../actions/modal_actions';
import LoginForm from './login_form';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    loggedIn: state.session.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    showModal: modal => dispatch(showModal(modal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

