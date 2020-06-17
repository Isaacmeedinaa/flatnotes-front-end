export const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        user
    }
}

export const registerSuccess = (user) => {
    return {
        type: 'REGISTER_SUCCESS',
        user
    }
}

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}