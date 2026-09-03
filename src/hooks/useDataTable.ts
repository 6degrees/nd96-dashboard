'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface UseCrudTableProps {
    action: (payload: any) => any
    selector: (state: any) => any

    initialFilters?: any
    buildQuery?: (filters: any) => any
}

export const useDataTable = (
    {
        action,
        selector,
        initialFilters = {},
        buildQuery,
    }: UseCrudTableProps) => {

    const dispatch = useDispatch()
    const { list, loading } = useSelector(selector)

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */
    const [filters, setFilters] = useState(initialFilters)

    /*
    |--------------------------------------------------------------------------
    | Fetch Data
    |--------------------------------------------------------------------------
    */
    const fetchData = (overrideFilters?: any) => {
        const payload = {
            page: page,
            per_page: limit,
            ...(buildQuery ? buildQuery(overrideFilters || filters) : overrideFilters),
        }

        dispatch(action(payload) as any)
    }

    /*
    |--------------------------------------------------------------------------
    | Auto Fetch
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        fetchData()
    }, [page, limit])

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */
    const handleSearch = () => {
        setPage(1)
        fetchData()
    }

    return {
        list,
        loading,

        page,
        setPage,
        limit,
        setLimit,

        filters,
        setFilters,

        handleSearch,
        fetchData,
        refresh: fetchData,
    }
}