/*
|--------------------------------------------------------------------------
| Authentication Actions (Redux Action Types & Creators)
|--------------------------------------------------------------------------
|
| This file defines all auth-related Redux action types and
| their corresponding action creators for login, logout, and user info flows.
|
| It is used to manage auth state transitions such as:
| - Begin request
| - Success response
| - Error handling
|
*/

const actions = {

    /*
    |--------------------------------------------------------------------------
    | Action Types
    |--------------------------------------------------------------------------
    |
    | Constants used as Redux action type identifiers.
    |
    */
    LOGIN_BEGIN: 'LOGIN_BEGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERR: 'LOGIN_ERR',

    LOGOUT_BEGIN: 'LOGOUT_BEGIN',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERR: 'LOGOUT_ERR',

    FORGOT_PASSWORD_BEGIN: 'FORGOT_PASSWORD_BEGIN',
    FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_ERR: 'FORGOT_PASSWORD_ERR',

    RESET_PASSWORD_BEGIN: 'RESET_PASSWORD_BEGIN',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_ERR: 'RESET_PASSWORD_ERR',

    INFO_BEGIN: 'INFO_BEGIN',
    INFO_SUCCESS: 'INFO_SUCCESS',
    INFO_ERR: 'INFO_ERR',

    SWITCH_TENANT: 'SWITCH_TENANT',
    SWITCH_BRANCH: 'SWITCH_BRANCH',

    /*
    |--------------------------------------------------------------------------
    | Login Actions
    |--------------------------------------------------------------------------
    */
    loginBegin: () => {
        return {
            type: actions.LOGIN_BEGIN,
        }
    },

    loginSuccess: (data: any) => {
        return {
            type: actions.LOGIN_SUCCESS,
            data,
        }
    },

    loginErr: (err: any) => {
        return {
            type: actions.LOGIN_ERR,
            err,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Logout Actions
    |--------------------------------------------------------------------------
    */
    logoutBegin: () => {
        return {
            type: actions.LOGOUT_BEGIN,
        }
    },

    logoutSuccess: (data: any) => {
        return {
            type: actions.LOGOUT_SUCCESS,
            data,
        }
    },

    logoutErr: (err: any) => {
        return {
            type: actions.LOGOUT_ERR,
            err,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Forgot Password Actions
    |--------------------------------------------------------------------------
    */
    forgotPasswordBegin: () => {
        return {
            type: actions.FORGOT_PASSWORD_BEGIN,
        }
    },

    forgotPasswordSuccess: (data: any) => {
        return {
            type: actions.FORGOT_PASSWORD_SUCCESS,
            data,
        }
    },

    forgotPasswordErr: (err: any) => {
        return {
            type: actions.FORGOT_PASSWORD_ERR,
            err,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Reset Password Actions
    |--------------------------------------------------------------------------
    */
    resetPasswordBegin: () => {
        return {
            type: actions.RESET_PASSWORD_BEGIN,
        }
    },

    resetPasswordSuccess: (data: any) => {
        return {
            type: actions.RESET_PASSWORD_SUCCESS,
            data,
        }
    },

    resetPasswordErr: (err: any) => {
        return {
            type: actions.RESET_PASSWORD_ERR,
            err,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Info Actions
    |--------------------------------------------------------------------------
    */
    infoBegin: () => {
        return {
            type: actions.INFO_BEGIN,
        }
    },

    infoSuccess: (data: any) => {
        return {
            type: actions.INFO_SUCCESS,
            data,
        }
    },

    infoErr: (err: any) => {
        return {
            type: actions.INFO_ERR,
            err,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Tenant Management Actions
    |--------------------------------------------------------------------------
    */
    switchTenant: (tenantId: string) => {
        return {
            type: actions.SWITCH_TENANT,
            tenantId,
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Branch Management Actions
    |--------------------------------------------------------------------------
    */
    switchBranch: (branchId: string) => {
        return {
            type: actions.SWITCH_BRANCH,
            branchId,
        }
    },
}

/*
|--------------------------------------------------------------------------
| Module Export
|--------------------------------------------------------------------------
|
| Exports all auth actions for use in Redux store and thunks.
|
*/
export default actions;