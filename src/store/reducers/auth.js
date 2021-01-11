import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false,
    iscoach: false,
    rememberMe: false,
}

const authStart = (state, action) =>  {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) =>  {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading:false
    });
}

const authFail = (state, action) =>  {
    return updateObject(state, {
        error: action.error,
        loading:false,
        iscoach: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        iscoach: false,
        rememberMe: false,
    })
}

const rememberMe = (state, action) => {
    return updateObject(state, {
        rememberMe: true,
    })
}

const authUserState = (state, action) => {
    return updateObject(state, {
        iscoach: action.iscoach
    })
}

const auth = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_USER_STATE: return authUserState(state, action);
        case actionTypes.REMEMBER_ME: return rememberMe(state, action);
        default:
            return state;
    }
}

export default auth;