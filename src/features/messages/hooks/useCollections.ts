import { buildQuery } from '@/utils/buildQuery'
import { formatDate } from '@/utils/formatDate'
import { createCollectionHook } from '@/hooks/createCollectionHook'

import { api } from '../api'
import { config } from '../config'

export const useCollections = createCollectionHook({
    api,
    selector: (state: any) => state.message,
    filters: config.initialFilters,
    queryBuilder: (filters) => buildQuery({
        "filters[client_ref][$contains]": filters.client_ref,
        "filters[name][$contains]": filters.name,
        "filters[department_id][$eq]": filters.department_id,
        "filters[activated_at][$gte]": formatDate(filters.activatedAt?.[0]),
        "filters[activated_at][$lte]": formatDate(filters.activatedAt?.[1]),
        "filters[created_at][$gte]": formatDate(filters.createdAt?.[0]),
        "filters[created_at][$lte]": formatDate(filters.createdAt?.[1]),
        "filters[updated_at][$gte]": formatDate(filters.updatedAt?.[0]),
        "filters[updated_at][$lte]": formatDate(filters.updatedAt?.[1]),
        "sort": "created_at:desc",
    }),
})