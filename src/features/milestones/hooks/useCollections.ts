import { buildQuery } from '@/utils/buildQuery'
import { createCollectionHook } from '@/hooks/createCollectionHook'
import { api } from '../api'
import { config } from '../config'

export const useCollections = (timelineId: string) =>
    createCollectionHook({
        api,
        selector: (state: any) => state.milestone,
        filters: config.initialFilters,
        queryBuilder: (filters) => buildQuery({
            "filters[timeline_id][$eq]": timelineId,
            "filters[title_ar][$contains]": filters.title_ar,
            "filters[title_en][$contains]": filters.title_en,
            "filters[created_at][$gte]": filters.createdAt?.[0],
            "filters[created_at][$lte]": filters.createdAt?.[1],
            "filters[updated_at][$gte]": filters.updatedAt?.[0],
            "filters[updated_at][$lte]": filters.updatedAt?.[1],
            "sort": "sort_order:asc,year:asc",
        }),
    })()