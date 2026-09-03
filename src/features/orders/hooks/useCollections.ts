import {useDataTable} from '@/hooks/useDataTable'
import {buildQuery} from '@/utils/buildQuery'
import {formatDate} from '@/utils/formatDate'
import {api} from '../api'
import {config} from '../config'

/*
|--------------------------------------------------------------------------
| Orders Collection Hook
|--------------------------------------------------------------------------
|
*/

export const useCollections = (branchId?: string) => {

    return useDataTable({

        /*
        |--------------------------------------------------------------------------
        | API
        |--------------------------------------------------------------------------
        |
        */

        action: api.fetch,

        /*
        |--------------------------------------------------------------------------
        | Redux Selector
        |--------------------------------------------------------------------------
        |
        */

        selector: (state: any) => state.order,

        /*
        |--------------------------------------------------------------------------
        | Initial Filters
        |--------------------------------------------------------------------------
        |
        */

        initialFilters: {
            ...config.initialFilters,

            ...(branchId
                ? {
                    branch: branchId,
                }
                : {}),
        },

        /*
        |--------------------------------------------------------------------------
        | Query Builder
        |--------------------------------------------------------------------------
        |
        */

        buildQuery: (filters: any) => buildQuery({

            "filters[branch_id][$eq]":
                branchId || filters.branch,

            "filters[customer][mobile][$contains]":
            filters.phone,

            "filters[number][$contains]":
            filters.number,

            "filters[status][$eq]":
            filters.status,

            "filters[created_at][$gte]":
                filters.createdAt?.[0]
                    ? formatDate(filters.createdAt[0])
                    : undefined,

            "filters[created_at][$lte]":
                filters.createdAt?.[1]
                    ? formatDate(filters.createdAt[1])
                    : undefined,

            "filters[updated_at][$gte]":
                filters.updatedAt?.[0]
                    ? formatDate(filters.updatedAt[0])
                    : undefined,

            "filters[updated_at][$lte]":
                filters.updatedAt?.[1]
                    ? formatDate(filters.updatedAt[1])
                    : undefined,

            "sort": "created_at:desc",
        }),
    })
}