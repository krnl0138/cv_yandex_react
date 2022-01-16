import { PASSWORD_FORGOT, PASSWORD_FORGOT_RESTORE } from '../actions/forgot-password';

const initialState = {
    test: 'test',
    isPasswordForgotten: false,
}

export const forgotPasswordReducer = (state = initialState, action) => {
    console.log(action);
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