import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/redux/auth/reducers";
import dashboardReducer from "@/redux/dashboard/reducers";
import {createCrudReducer} from "@/redux/curd/createCrudReducer";
import {actions as tenantAction} from '@/redux/tenant'
import {actions as branchAction} from '@/redux/branch'
import {actions as userAction} from '@/redux/user'
import {actions as invitationAction} from '@/redux/invitation'
import {actions as productAction} from '@/redux/product'
import {actions as orderAction} from '@/redux/order'
import {actions as customerAction} from '@/redux/customer'
import {actions as staffAction} from '@/redux/staff'
import {actions as notificationAction} from '@/redux/notification'
import {actions as qualityAction} from '@/redux/quality'
import {actions as ratingAction} from '@/redux/rating'

/*
|--------------------------------------------------------------------------
| Redux Store Configuration
|--------------------------------------------------------------------------
|
| Creates the application's global Redux store.
|
| Each reducer registered here becomes a top-level state slice.
|
| Example:
|
| {
|     auth: {
|         login: false,
|         user: {},
|         loading: false,
|         error: null,
|     }
| }
|
| Additional feature reducers should be registered here as the
| application grows.
|
*/
export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        tenant: createCrudReducer(tenantAction) as any,
        branch: createCrudReducer(branchAction) as any,
        user: createCrudReducer(userAction) as any,
        invitation: createCrudReducer(invitationAction) as any,
        product: createCrudReducer(productAction) as any,
        order: createCrudReducer(orderAction) as any,
        customer: createCrudReducer(customerAction) as any,
        staff: createCrudReducer(staffAction) as any,
        notification: createCrudReducer(notificationAction) as any,
        quality: createCrudReducer(qualityAction) as any,
        rating: createCrudReducer(ratingAction) as any,
    },
});

/*
|--------------------------------------------------------------------------
| RootState Type
|--------------------------------------------------------------------------
|
| Represents the complete shape of the Redux store state.
|
| Used with useSelector for full TypeScript support.
|
*/
export type RootState = ReturnType<typeof store.getState>;

/*
|--------------------------------------------------------------------------
| AppDispatch Type
|--------------------------------------------------------------------------
|
| Typed version of the Redux dispatch function.
|
| Used with useDispatch to provide proper typing for dispatched
| actions and async thunks throughout the application.
|
*/
export type AppDispatch = typeof store.dispatch;