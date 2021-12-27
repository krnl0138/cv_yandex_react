import { USER_SET_CREDENTIALS, USER_LOGOUT, TUserActions } from '../actions/user';

interface IState {
    readonly username: string;
    readonly email: string;
}

const initialState: IState = {
    username: '',
    email: ''
}

export const userReducer = (state = initialState, action: TUserActions): IState => {
    switch (action.type) {
        case USER_SET_CREDENTIALS: {
            return {
                ...state,
                email: action.user.email,
                username: action.user.name,
            }
        }
        case USER_LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}