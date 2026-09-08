/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import {useEffect, useRef, useState} from 'react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/
interface UseInfiniteScrollProps {
    enableInfiniteScroll: boolean
    hasMore: boolean
    loading: boolean
    loadingMore: boolean
    onLoadMore?: () => void
    rootMargin?: string
}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
|
*/
export function useInfiniteScroll(
    {
        enableInfiniteScroll,
        hasMore,
        loading,
        loadingMore,
        onLoadMore,
        rootMargin = '300px',
    }: UseInfiniteScrollProps) {

    /*
    |--------------------------------------------------------------------------
    | Refs & States
    |--------------------------------------------------------------------------
    |
    */
    const observerRef = useRef<HTMLDivElement | null>(null)
    const isRequestedRef = useRef(false)
    const [isRequested, setIsRequested] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Effects
    |--------------------------------------------------------------------------
    |
    */
    useEffect(() => {
        if (!loadingMore && !loading) {
            isRequestedRef.current = false
            setIsRequested(false)
        }
    }, [loadingMore, loading])

    /*
    |--------------------------------------------------------------------------
    | Effects
    |--------------------------------------------------------------------------
    |
    */
    useEffect(() => {
        if (!enableInfiniteScroll || !hasMore) return

        const currentObserverRef = observerRef.current

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isRequestedRef.current && !loadingMore && !loading) {
                    isRequestedRef.current = true
                    setIsRequested(true)
                    onLoadMore?.()
                }
            },
            {
                root: null,
                rootMargin,
                threshold: 0.01,
            }
        )

        if (currentObserverRef) {
            observer.observe(currentObserverRef)
        }

        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef)
            }
        }
    }, [enableInfiniteScroll, hasMore, loadingMore, loading, onLoadMore, rootMargin])

    /*
    |--------------------------------------------------------------------------
    | triggerLoadMore
    |--------------------------------------------------------------------------
    |
    */
    const triggerLoadMore = () => {
        isRequestedRef.current = true
        setIsRequested(true)
        onLoadMore?.()
    }

    /*
    |--------------------------------------------------------------------------
    | return
    |--------------------------------------------------------------------------
    |
    */
    return {
        observerRef,
        isRequested,
        triggerLoadMore,
    }
}