import { useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../api'

export function useBranchDetail(customId?: string) {
    /*
    |--------------------------------------------------------------------------
    | Hooks & Params Setup
    |--------------------------------------------------------------------------
    |
    */
    const dispatch = useDispatch()
    const params = useParams()

    /*
    |--------------------------------------------------------------------------
    | Memoized ID Resolution
    |--------------------------------------------------------------------------
    |
    */
    const branchId = useMemo(() => {
        return customId || (params?.id as string)
    }, [customId, params?.id])

    /*
    |--------------------------------------------------------------------------
    | Redux State Selectors
    |--------------------------------------------------------------------------
    |
    */
    const branchDataFromRedux = useSelector(
        (state: any) => state.branch?.current
    )
    const loading = useSelector(
        (state: any) => state.branch?.loading ?? false
    )
    const error = useSelector(
        (state: any) => state.branch?.error ?? null
    )

    /*
    |--------------------------------------------------------------------------
    | Data Normalization & Extraction
    |--------------------------------------------------------------------------
    |
    */
    const branch = useMemo(() => {
        if (!branchDataFromRedux) return null
        const data = 'data' in branchDataFromRedux ? branchDataFromRedux.data : branchDataFromRedux
        if (!data || Object.keys(data).length === 0) return null
        return data
    }, [branchDataFromRedux])

    /*
    |--------------------------------------------------------------------------
    | Actions & Handlers
    |--------------------------------------------------------------------------
    |
    */
    const refetch = useCallback(() => {
        if (branchId) {
            dispatch(api.detail(branchId) as any)
        }
    }, [branchId, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Side Effects
    |--------------------------------------------------------------------------
    |
    */
    useEffect(() => {
        if (!branchId) return
        dispatch(api.detail(branchId) as any)
    }, [branchId, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Return Values
    |--------------------------------------------------------------------------
    |
    */
    return {
        branch,
        loading,
        error,
        branchId,
        refetch
    }
}