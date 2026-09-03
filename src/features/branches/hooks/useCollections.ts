import {buildQuery} from '@/utils/buildQuery'
import {formatDate} from '@/utils/formatDate'
import {createCollectionHook} from '@/hooks/createCollectionHook'
import {api} from '../api'
import {config} from '../config'

export const useCollections = createCollectionHook({
    api,
    selector: (state: any) => state.branch,
    filters: config.initialFilters,
    queryBuilder: (filters) => buildQuery({
        "filters[name][$contains]": filters.name,
        "filters[code][$contains]": filters.code,
        "filters[phone][$contains]": filters.phone,
        "filters[email][$contains]": filters.email,
        "filters[country_id][$eq]": filters.country,
        "filters[city_id][$eq]": filters.city,
        "filters[district_id][$eq]": filters.city,
        "filters[created_at][$gte]": formatDate(filters.createdAt[0]),
        "filters[created_at][$lte]": formatDate(filters.createdAt[1]),
        "filters[updated_at][$gte]": formatDate(filters.createdAt[0]),
        "filters[updated_at][$lte]": formatDate(filters.createdAt[1]),
        "sort": "created_at:desc",
    }),
})