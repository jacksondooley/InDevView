import React from 'react';
import { render } from 'react-dom';
import '../../stylesheets/modal.scss'
// import { useSelector, useDispatch } from 'react-redux';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
import { closeModal } from '../../actions/modal_actions';

class Modal extends React.Component {
	constructor(props) {
		super(props)

		this.handleModal = this.handleModal.bind(this);
	};
	
	handleModal(e) {
		e.preventDefault();
		this.props.closeModal();
	};

	render() {
		// deconstruct modal from props
		// console.log(this.props.modal); // << check it out!
		const {modal} = this.props;
		let component;

		// check which modal type to render
		switch (modal) {
			case "signup":
				component = <SignupFormContainer/>
				break;
			case "login":
				component = <LoginFormContainer/>
				break;
			default:
				return null;
		}

		return (
			<div className="modal-bg" onClick={this.handleModal}>
				<div className="modal-guts" onClick={e => e.stopPropagation()}>
						{/* <img className="auth-form-x-btn-img" src={`data:image/svg+xml;utf8,${icClose}`}/> */}
					{component}
				</div>
			</div>
		)
	}
}

export default Modal;