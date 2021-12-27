export const PASSWORD_FORGOT = 'PASSWORD_FORGOT' as const;
export const PASSWORD_FORGOT_RESTORE = 'PASSWORD_FORGOT_RESTORE' as const;

export interface IPasswordForgot {
    readonly type: typeof PASSWORD_FORGOT;
}

export interface IPasswordForgotRestore {
    readonly type: typeof PASSWORD_FORGOT_RESTORE;
}

export type TForgotPasswordActions = IPasswordForgot | IPasswordForgotRestore;