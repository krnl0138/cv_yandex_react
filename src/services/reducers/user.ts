import { USER_SET_CREDENTIALS, USER_LOGOUT } from '../actions/user';

interface IState {
    username: string;
    email: string;
}

interface IAction {
    type: 'USER_SET_CREDENTIALS' | 'USER_LOGOUT';
    user: {
        email: string;
        name: string;
    }
}

const initialState: IState = {
    username: '',
    email: ''
}

export const userReducer = (state:IState = initialState, action: IAction) => {
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