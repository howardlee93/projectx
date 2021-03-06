import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveCurrentUser = (currentUser) =>({
	type: RECEIVE_CURRENT_USER,
	currentUser
});


const logoutCurrentUser = () =>({
	type: LOGOUT_CURRENT_USER
});

export const receiveErrors = errors => ({
	type: RECEIVE_SESSION_ERRORS,
	errors
 });


export const signup = formUser => dispatch => (
  APIUtil.postUser(formUser).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = formUser => dispatch => (
  APIUtil.postSession(formUser).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.deleteSession().then(() => (
    dispatch(logoutCurrentUser())
  ))
);