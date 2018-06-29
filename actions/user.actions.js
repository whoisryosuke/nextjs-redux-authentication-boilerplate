import { userConstants } from '../constants';
import AuthService from '../utils/AuthService';
// import { alertActions } from './';
import Router from 'next/router';

export const userActions = {
    login,
    logout,
    loggedIn,
    register,
    getAll,
    delete: _delete
};

const auth = new AuthService('http://localhost')


function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        auth.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    Router.push('/dashboard');
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loggedIn() {
    return dispatch => {
        dispatch(request());
        dispatch(success(auth.loggedIn()));
    };
    function request() { return { type: userConstants.TOKEN_REQUEST } }
    function success(status) { return { type: userConstants.TOKEN_SUCCESS, status } }
}

function logout() {
    auth.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        auth.register(user)
            .then(
                user => { 
                    dispatch(success());
                    Router.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        auth.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        auth.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}