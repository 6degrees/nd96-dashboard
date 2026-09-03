import { useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../api'

export function useTenantDetail(customId?: string) {
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
    const TenantId = useMemo(() => {
        return customId || (params?.id as string)
    }, [customId, params?.id])

    /*
    |--------------------------------------------------------------------------
    | Redux State Selectors
    |--------------------------------------------------------------------------
    |
    */
    const TenantDataFromRedux = useSelector(
        (state: any) => state.Tenant?.current
    )
    const loading = useSelector(
        (state: any) => state.Tenant?.loading ?? false
    )
    const error = useSelector(
        (state: any) => state.Tenant?.error ?? null
    )

    /*
    |--------------------------------------------------------------------------
    | Data Normalization & Extraction
    |--------------------------------------------------------------------------
    |
    */
    const Tenant = useMemo(() => {
        if (!TenantDataFromRedux) return null
        const data = 'data' in TenantDataFromRedux ? TenantDataFromRedux.data : TenantDataFromRedux
        if (!data || Object.keys(data).length === 0) return null
        return data
    }, [TenantDataFromRedux])

    /*
    |--------------------------------------------------------------------------
    | Actions & Handlers
    |--------------------------------------------------------------------------
    |
    */
    const refetch = useCallback(() => {
        if (TenantId) {
            dispatch(api.detail(TenantId) as any)
        }
    }, [TenantId, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Side Effects
    |--------------------------------------------------------------------------
    |
    */
    useEffect(() => {
        if (!TenantId) return
        dispatch(api.detail(TenantId) as any)
    }, [TenantId, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Return Values
    |--------------------------------------------------------------------------
    |
    */
    return {
        Tenant,
        loading,
        error,
        TenantId,
        refetch
    }
}