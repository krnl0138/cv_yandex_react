import { TLoginActions } from "./login";
import { TLogoutActions } from "./logout";
import { TPasswordActions } from "./password";
import { TRegisterActions } from "./register";
import { TUserDataActions } from "./user-data";

export type TAuthActions = TLoginActions | TLogoutActions | TRegisterActions | TPasswordActions | TUserDataActions