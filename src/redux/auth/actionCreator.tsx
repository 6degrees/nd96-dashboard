import actions from './actions'
import { authService } from '@/services/auth.service'

/*
|--------------------------------------------------------------------------
| Authentication Action Creators
|--------------------------------------------------------------------------
*/
const {
    loginBegin, loginSuccess, loginErr,
    logoutBegin, logoutSuccess, logoutErr,
    forgotPasswordBegin, forgotPasswordSuccess, forgotPasswordErr,
    resetPasswordBegin, resetPasswordSuccess, resetPasswordErr,
    infoBegin, infoSuccess, infoErr,
    switchTenant, switchBranch
} = actions

/*
|--------------------------------------------------------------------------
| logInAction
|--------------------------------------------------------------------------
*/
const logInAction = (email: string, password: string, callback: any) => {
    return async (dispatch: any) => {
        dispatch(loginBegin())
        try {
            const userData = await authService.login({ email, password})
            dispatch(loginSuccess(userData))
            callback()
        } catch (err: any) {
            dispatch(loginErr(err.response?.data))
        }
    }
}

/*
|--------------------------------------------------------------------------
| forgotPasswordAction
|--------------------------------------------------------------------------
*/
const forgotPasswordAction = (email: string, code: string, callback: any) => {
    return async (dispatch: any) => {
        dispatch(forgotPasswordBegin())
        try {
            const data = await authService.forgotPassword({ email, code, })
            dispatch(forgotPasswordSuccess(data))
            if (callback) callback()
        } catch (err: any) {
            dispatch(forgotPasswordErr(err.response?.data))
        }
    }
}

/*
|--------------------------------------------------------------------------
| resetPasswordAction
|--------------------------------------------------------------------------
|
| Handles the final step of password recovery.
| - Sends username, OTP code, and the new password to the API.
| - Executes callback on successful reset.
|
*/
const resetPasswordAction = (data: any, callback: any) => {
    return async (dispatch: any) => {
        dispatch(resetPasswordBegin())
        try {
            const res = await authService.resetPassword(data)
            dispatch(resetPasswordSuccess(res))
            if (callback) callback()
        } catch (err: any) {
            dispatch(resetPasswordErr(err.response?.data))
        }
    }
}

/*
|--------------------------------------------------------------------------
| getInfoAction
|--------------------------------------------------------------------------
|
| Retrieves the currently authenticated user's profile information.
| - Dispatches infoBegin, then infoSuccess or infoErr on failure.
| - Executes callback if provided.
|
*/
const getInfoAction = (callback?: any) => {
    return async (dispatch: any) => {
        dispatch(infoBegin())
        try {
            const res = await authService.info()
            dispatch(infoSuccess(res))
            if (callback) callback(res)
        } catch (err: any) {
            dispatch(infoErr(err.response?.data))
        }
    }
}

/*
|--------------------------------------------------------------------------
| logOutAction
|--------------------------------------------------------------------------
*/
const logOutAction = (callback: any) => {
    return async (dispatch: any) => {
        dispatch(logoutBegin())
        try {
            localStorage.clear()
            sessionStorage.clear()
            dispatch(logoutSuccess(false))
            callback()
        } catch (err) {
            dispatch(logoutErr(err))
        }
    }
}

/*
|--------------------------------------------------------------------------
| switchTenantAction
|--------------------------------------------------------------------------
|
| Updates the globally active tenant across the application ecosystem.
| Supports an optional callback for post-switch router updates.
|
*/
const switchTenantAction = (tenantId: string, callback?: () => void) => {
    return (dispatch: any) => {
        dispatch(switchTenant(tenantId))
        if (callback) callback()
    }
}


/*
|--------------------------------------------------------------------------
| switchBranchAction
|--------------------------------------------------------------------------
|
| Updates the globally active branch across the application.
| Optionally executes a callback after the branch has been switched,
| allowing router navigation or other follow-up actions.
|
*/
const switchBranchAction = (branchId: string, callback?: () => void) => {
    return (dispatch: any) => {
        dispatch(switchBranch(branchId))
        if (callback) callback()
    }
}

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
export { logInAction, forgotPasswordAction, resetPasswordAction, getInfoAction, logOutAction, switchTenantAction, switchBranchAction }