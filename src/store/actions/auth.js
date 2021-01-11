import axios from './../../axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const rememberMe = () => {
    const rememberMe = true
    localStorage.setItem('rememberMe', rememberMe)
    return {
        type: actionTypes.REMEMBER_ME
    }
}

export const logout = () => { // if user has put that remember me, it wont log out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('rememberMe')
    sessionStorage.clear()
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    const rememberMe = localStorage.getItem('rememberMe')
    return dispatch => {
        if (rememberMe === null) {
            setTimeout(() => {  // after 24hr, log user out
                    dispatch(logout());
                }, expirationTime * 24000 )
        }
    }
}

export const authLogin = (username, password, rememberMe) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            console.log('logindata', res.data)
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 24000); // expiration period is 1 day
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(checkUserStatus(token));
            dispatch(authSuccess(token));
            if (rememberMe === true) {
                dispatch(rememberMe())
            } else {
                dispatch(checkAuthTimeout(3600));
            }
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2, fullname) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
        })
        .then(res => {
            const token = res.data.key;
            const fullname1 = fullname
            const username1 = username
            const expirationDate = new Date(new Date().getTime() + 3600 * 24000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(checkUserStatus(token));
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const socialLoginGoogle = (accessToken) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('rest-auth/google/', {
            access_token: accessToken
        })
            .then(res => {
                const token = res.data.key
                console.log('res', res.data.key)
                localStorage.setItem('token', token)
                dispatch(authSuccess(token));
                dispatch(checkUserStatus(token));
                const expirationDate = new Date(new Date().getTime() + 3600 * 24000);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
};

export const socialLoginFacebook = (accessToken) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('rest-auth/facebook/', {
            access_token: accessToken
        })
            .then(res => {
                const token = res.data.key
                console.log('res', res.data.key)
                localStorage.setItem('token', token)
                dispatch(authSuccess(token));
                dispatch(checkUserStatus(token));
                const expirationDate = new Date(new Date().getTime() + 3600 * 24000);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
};

export const verifyUsersEmail = (Email, username, verifytoken) => {
    return dispatch => {
        const userEmail = Email
        const veriftoken = verifytoken
        const userName = username
        axios.post(`/api/send_account_verification/${userEmail}`, {
            token: veriftoken,
            email: userEmail,
            username: userName,
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const rememberMe = localStorage.getItem('rememberMe');
        if (token === undefined) {
            dispatch(logout());
        } else if ( rememberMe === null ){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= Date() ) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(checkUserStatus(token));
                dispatch(checkAuthTimeout(( expirationDate.getTime() - (new Date().getTime() )) / 1000))
            }
        } else {
            dispatch(authSuccess(token))
            dispatch(checkUserStatus(token));
        }
    }
}

export const authUserState = iscoach => {
    return {
        type: actionTypes.AUTH_USER_STATE,
        iscoach: iscoach
    }
}

export const checkUserStatus = token => {
    return dispatch => {
        const profileID = token
        axios.get(`/api/profile/${profileID}`)
            .then(res => {
                const iscoach = res.data.is_coach;
                console.log('Tulemus', iscoach);
                dispatch(authUserState(iscoach))
            })
    }
}

export const adminLogin = () => {
    return dispatch => {
        const admin = 'true'
        sessionStorage.setItem('is_admin', admin)
    }
}

export const adminLogout = () => {
    return dispatch => {
        sessionStorage.removeItem('is_admin')
    }
}