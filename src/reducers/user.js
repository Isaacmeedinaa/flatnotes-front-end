import { userLogin } from "../actions/userActions"

const user = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return action.user
        case 'REGISTER_SUCCESS':
            return action.user
        case 'LOGOUT_SUCCESS':
            return null
        default:
            return state
    }
}

export default user