import {buildQuery} from '@/utils/buildQuery'
import {formatDate} from '@/utils/formatDate'
import {createCollectionHook} from '@/hooks/createCollectionHook'
import {api} from '../api'
import {config} from '../config'

export const useCollections = createCollectionHook({
    api,
    selector: (state: any) => state.invitation,
    filters: config.initialFilters,
    queryBuilder: (filters) => buildQuery({
        "filters[role][$gte]": filters.email,
        "filters[expires_at][$gte]": formatDate(filters.expiresAt[0]),
        "filters[expires_at][$lte]": formatDate(filters.expiresAt[1]),
        "filters[accepted_at][$gte]": formatDate(filters.acceptedAt[0]),
        "filters[accepted_at][$lte]": formatDate(filters.acceptedAt[1]),
        "filters[created_at][$gte]": formatDate(filters.createdAt[0]),
        "filters[created_at][$lte]": formatDate(filters.createdAt[1]),
        "filters[updated_at][$gte]": formatDate(filters.createdAt[0]),
        "filters[updated_at][$lte]": formatDate(filters.createdAt[1]),
    }),
})