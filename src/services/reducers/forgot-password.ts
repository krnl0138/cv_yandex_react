import { PASSWORD_FORGOT, PASSWORD_FORGOT_RESTORE } from '../actions/forgot-password';

interface IState {
    test: string;
    isPasswordForgotten: boolean;
}

interface IAction {
    type: 'PASSWORD_FORGOT' | 'PASSWORD_FORGOT_RESTORE';
}

const initialState: IState = {
    test: 'test',
    isPasswordForgotten: false,
}

export const forgotPasswordReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case PASSWORD_FORGOT: {
            return {
                ...state, 
                isPasswordForgotten: true
            }
        }
        case PASSWORD_FORGOT_RESTORE: {
            return {
                ...state, 
                isPasswordForgotten: false
            }
        }
        default: {
            return state;
        }
    }
}