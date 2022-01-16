export const USER_SET_CREDENTIALS = 'USER_SET_CREDENTIALS' as const;
export const USER_LOGOUT = 'USER_LOGOUT' as const;

export interface IUserSetCredentials {
    readonly type: typeof USER_SET_CREDENTIALS;
    readonly user: {
        email: string;
        name: string;
    }
}
export interface IUserLogout {
    readonly type: typeof USER_LOGOUT;
}

export type TUserActions = IUserSetCredentials | IUserLogout;

export const setUserCredentials = (user: IUserSetCredentials["user"]): IUserSetCredentials => ({
    type: USER_SET_CREDENTIALS,
    user,
})