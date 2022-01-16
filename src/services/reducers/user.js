import { USER_SET_CREDENTIALS, USER_LOGOUT } from '../actions/user';

const initialState = {
    username: '',
    email: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SET_CREDENTIALS: {
            return {
                ...state,
                email: action.user.email,
                username: action.user.name,
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                username: '',
                email: ''
            }
        }
        default: {
            return state;
        }
    }
}