// modal.jsx


import React from "react";
import { closeModal } from "../actions/modal_actions";
import { connect } from "react-redux";
import LoginFormContainer from "./session_form/login_container";
import SignupFormContainer from "./session_form/signup_container";
//import ReviewFormContainer from "../review/review_form_container";
import Loading from "./loading";



const Modal = ({ modal, closeModal }) => {

	if(!modal){
		return null;
	};
	let component;

	switch(modal){
		case "login":
			component = <LoginFormContainer/>;
			break;
		case "signup":
			component = <SignupFormContainer/>;
			break;
		case "loading": 
			component = <Loading/>;
			break;

		default:
		return null;
	}
	return(
		<div onClick={closeModal}>
			<div onClick={e=>e.stopPropagation}>
			{component}
			</div>
		</div>
		);
};


const mapStateToProps = (state) =>({
	modal: state.ui.modal

});

const mapDispatchToProps = dispatch => ({
	closeModal: dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
