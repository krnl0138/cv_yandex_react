import { 
    PASSWORD_FORGOT, 
    PASSWORD_FORGOT_RESTORE, 
    TForgotPasswordActions
} from '../actions/forgot-password';

interface IState {
    readonly isPasswordForgotten: boolean;
}

const initialState: IState = {
    isPasswordForgotten: false,
}

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): IState => {
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