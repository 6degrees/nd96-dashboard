import {buildQuery} from '@/utils/buildQuery'
import {formatDate} from '@/utils/formatDate'
import {createCollectionHook} from '@/hooks/createCollectionHook'
import {api} from '../api'
import {config} from '../config'

export const useCollections = createCollectionHook({
    api,
    selector: (state: any) => state.product,
    filters: config.initialFilters,
    queryBuilder: (filters) => buildQuery({
        "filters[name][$contains]": filters.name,
        "filters[sku][$contains]": filters.sku,
        "filters[price][$eq]": filters.price,
        "filters[created_at][$gte]": formatDate(filters.createdAt[0]),
        "filters[created_at][$lte]": formatDate(filters.createdAt[1]),
        "filters[updated_at][$gte]": formatDate(filters.createdAt[0]),
        "filters[updated_at][$lte]": formatDate(filters.createdAt[1]),
        "sort": "created_at:desc",
    }),
})