import { useDataTable } from '@/hooks/useDataTable'

type CollectionHookProps = {
    api: any
    selector: (state: any) => any
    filters: any
    queryBuilder: (filters: any) => any
}

/*
|--------------------------------------------------------------------------
| createCollectionHook
|--------------------------------------------------------------------------
*/
export const createCollectionHook = ({ api, selector, filters, queryBuilder }: CollectionHookProps) => {
    return function useCollections() {

        return useDataTable({
            /*
            |--------------------------------------------------------------------------
            | API
            |--------------------------------------------------------------------------
            */
            action: api.fetch,

            /*
            |--------------------------------------------------------------------------
            | Redux Selector
            |--------------------------------------------------------------------------
            */
            selector,

            /*
            |--------------------------------------------------------------------------
            | Initial Filters
            |--------------------------------------------------------------------------
            */
            initialFilters: filters,

            /*
            |--------------------------------------------------------------------------
            | Query Builder
            |--------------------------------------------------------------------------
            */
            buildQuery: queryBuilder,
        })
    }
}