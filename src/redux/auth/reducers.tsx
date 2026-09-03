import actions from './actions'
import {UnknownAction} from "redux";
import Cookies from "js-cookie";

/*
|--------------------------------------------------------------------------
| Authentication Reducer
|--------------------------------------------------------------------------
*/
const {
    LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERR,
    LOGOUT_BEGIN, LOGOUT_SUCCESS, LOGOUT_ERR,
    FORGOT_PASSWORD_BEGIN, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERR,
    RESET_PASSWORD_BEGIN, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERR,
    INFO_BEGIN, INFO_SUCCESS, INFO_ERR,
    SWITCH_TENANT, SWITCH_BRANCH
} = actions

/*
|--------------------------------------------------------------------------
| getPersistedUser
|--------------------------------------------------------------------------
|
| Retrieves the authenticated user's profile from localStorage.
|
| Returns:
| - Parsed user object when available.
| - null when no persisted user exists or when executed
|   outside the browser environment.
|
*/
const getPersistedUser = () => {
    if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user_profile')
        return savedUser ? JSON.parse(savedUser) : null
    }
    return null
}

/*
|--------------------------------------------------------------------------
| setAuthenticationSession
|--------------------------------------------------------------------------
|
| Persists the authenticated user's session.
|
| Stores:
| - Access token in localstorage.
| - Login status flag.
| - User profile in localStorage.
|
| Returns the sanitized user profile without authentication tokens.
|
*/
export const setAuthenticationSession = (data: any) => {
    const {token, user} = data

    if (typeof window !== 'undefined') {
        if (token) {
            Cookies.set('tenant_access_token', token)
            localStorage.setItem('tenant_access_token', token)
            localStorage.setItem('loggedIn', 'true')
        }

        if (user) {
            localStorage.setItem('user_profile', JSON.stringify(user))
        }
    }

    return user || data
}

/*
|--------------------------------------------------------------------------
| clearAuthenticationSession
|--------------------------------------------------------------------------
|
| Removes all persisted authentication data.
|
| Clears:
| - Authentication localstorage.
| - Login status.
| - Stored user profile.
|
| Returns null to reset the authenticated user state.
|
*/
export const clearAuthenticationSession = () => {
    if (typeof window !== 'undefined') {
        Cookies.remove('tenant_access_token')
        localStorage.clear();
    }

    return null
}

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/
const initState = {
    login: typeof window !== 'undefined' ? localStorage.getItem('loggedIn') === 'true' : false,
    user: getPersistedUser(),
    currentTenantId: null,
    loading: false,
    error: null,
}

/*
|--------------------------------------------------------------------------
| AuthReducer
|--------------------------------------------------------------------------
*/
const AuthReducer = (state = initState, action: UnknownAction) => {
    const {type} = action
    const data = (action as any).data
    const err = (action as any).err
    const tenantId = (action as any).tenantId
    const branchId = (action as any).branchId

    switch (type) {
        /*
        |--------------------------------------------------------------------------
        | Login Flow
        |--------------------------------------------------------------------------
        */
        case LOGIN_BEGIN:
            return {...state, loading: true, error: null}

        case LOGIN_SUCCESS:
            return {...state, login: true, user: setAuthenticationSession(data), loading: false, error: null}

        case LOGIN_ERR:
            return {...state, login: false, user: null, error: err, loading: false}

        /*
        |--------------------------------------------------------------------------
        | Logout Flow
        |--------------------------------------------------------------------------
        */
        case LOGOUT_BEGIN:
            return {...state, loading: true}

        case LOGOUT_SUCCESS:
            return {...state, login: false, user: clearAuthenticationSession(), loading: false, error: null}

        case LOGOUT_ERR:
            return {...state, error: err, loading: false}

        /*
        |--------------------------------------------------------------------------
        | Info Flow
        |--------------------------------------------------------------------------
        */
        case INFO_BEGIN:
            return {...state, loading: true, error: null}

        case INFO_SUCCESS:
            return {...state, login: true, user: setAuthenticationSession(data), loading: false, error: null}

        case INFO_ERR:
            return {...state, error: err, loading: false}

        /*
        |--------------------------------------------------------------------------
        | Tenant Management Flow
        |--------------------------------------------------------------------------
        */
        case SWITCH_TENANT:
            if (typeof window !== 'undefined') {
                localStorage.setItem('active_tenant_id', tenantId)
            }
            return {...state, currentTenantId: tenantId}

        /*
        |--------------------------------------------------------------------------
        | Branch Management Flow
        |--------------------------------------------------------------------------
        */
        case SWITCH_BRANCH:
            if (typeof window !== 'undefined') {
                localStorage.setItem('active_branch_id', branchId)
            }
            return {...state, currentBranchId: branchId}

        /*
        |--------------------------------------------------------------------------
        | Forgot Password Flow
        |--------------------------------------------------------------------------
        */
        case FORGOT_PASSWORD_BEGIN:
            return {...state, loading: true, error: null}

        case FORGOT_PASSWORD_SUCCESS:
            return {...state, loading: false, error: null}

        case FORGOT_PASSWORD_ERR:
            return {...state, error: err, loading: false}

        /*
        |--------------------------------------------------------------------------
        | Reset Password Flow
        |--------------------------------------------------------------------------
        */
        case RESET_PASSWORD_BEGIN:
            return {...state, loading: true, error: null}

        case RESET_PASSWORD_SUCCESS:
            return {...state, loading: false, error: null}

        case RESET_PASSWORD_ERR:
            return {...state, error: err, loading: false}

        default:
            return state
    }
}

/*
|--------------------------------------------------------------------------
| Module Export
|--------------------------------------------------------------------------
|
| Exports the authentication reducer as the default reducer for the
| authentication feature.
|
| This reducer is registered in the Redux store and is responsible
| for managing the application's authentication state.
|
*/
export default AuthReducer