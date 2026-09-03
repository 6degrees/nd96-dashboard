import {productService} from '@/services/product.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Product Actions
|--------------------------------------------------------------------------
*/
export const actions = createActions('products')

/*
|--------------------------------------------------------------------------
| Product API
|--------------------------------------------------------------------------
*/
export const api = createCrudActions(actions, productService)