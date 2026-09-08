'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/
import React from 'react'
import {Row, Col, Pagination, Spin, Empty, Button} from 'antd'
import {useTranslation} from 'react-i18next'
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll"

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/
interface PageGridProps {
    loading?: boolean
    dataSource: any[]
    page: number
    limit: number
    total: number
    onChange?: (page: number, limit: number) => void
    CardComponent: React.ComponentType<any>
    cardProps?: Record<string, any>
    gridClassName?: string
    enableInfiniteScroll?: boolean
    onLoadMore?: () => void
    hasMore?: boolean
    loadingMore?: boolean
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export default function PageGrid(
    {
        loading = false,
        dataSource = [],
        page,
        limit,
        total,
        onChange,
        CardComponent,
        cardProps = {},
        gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        enableInfiniteScroll = false,
        onLoadMore,
        hasMore = false,
        loadingMore = false,
    }: PageGridProps) {

    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */
    const {t} = useTranslation()

    const {observerRef, isRequested, triggerLoadMore} = useInfiniteScroll({
        enableInfiniteScroll,
        hasMore,
        loading,
        loadingMore,
        onLoadMore,
    })

    /*
    |--------------------------------------------------------------------------
    | Computed States
    |--------------------------------------------------------------------------
    */
    const showInitialLoading = loading && dataSource.length === 0
    const showInfiniteLoading = loadingMore || isRequested

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */
    return (
        <Row>
            <Col span={24}>
                {showInitialLoading ? (
                    /*
                    |--------------------------------------------------------------------------
                    | Ultra-Modern 10 Items Skeleton Grid
                    |--------------------------------------------------------------------------
                    */
                    <div className="w-full my-4">
                        <div className={gridClassName}>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-[28px] p-6 border border-neutral-200/80 dark:border-neutral-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex flex-col space-y-5 overflow-hidden relative group"
                                >
                                    {/* Shimmer Animation Overlay */}
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-neutral-100/60 dark:via-neutral-800/40 to-transparent pointer-events-none" />

                                    {/* Top Row: Status Pill & Order ID */}
                                    <div className="flex items-center justify-between">
                                        <div className="w-24 h-7 bg-neutral-100 dark:bg-neutral-800/60 rounded-full border border-neutral-200/50 dark:border-neutral-700/30 animate-pulse" />
                                        <div className="w-32 h-6 bg-neutral-200/80 dark:bg-neutral-800 rounded-xl animate-pulse" />
                                    </div>

                                    {/* Notification / Alert Bar Skeleton */}
                                    <div className="w-full h-12 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/20 rounded-2xl flex items-center justify-between px-4 animate-pulse">
                                        <div className="w-5 h-5 bg-amber-200 dark:bg-amber-900/40 rounded-full" />
                                        <div className="w-36 h-4 bg-amber-200/60 dark:bg-amber-900/30 rounded-lg" />
                                    </div>

                                    {/* Products Pills Row Skeleton */}
                                    <div className="w-full flex items-center justify-end gap-3">
                                        {[1, 2, 3].map((pill) => (
                                            <div key={pill} className="w-32 h-16 bg-neutral-50 dark:bg-neutral-800/40 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 p-2.5 flex items-center justify-between animate-pulse">
                                                <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                                                <div className="space-y-1.5">
                                                    <div className="w-12 h-3 bg-neutral-200 dark:bg-neutral-700 rounded" />
                                                    <div className="w-8 h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Divider Line */}
                                    <div className="w-full h-[1px] bg-neutral-100 dark:bg-neutral-800" />

                                    {/* Bottom Row: Customer Info & Total Price */}
                                    <div className="flex items-center justify-between pt-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200/60 dark:border-neutral-700/50 animate-pulse" />
                                            <div className="space-y-1.5 text-right">
                                                <div className="w-32 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
                                                <div className="w-24 h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded-lg animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5 text-left">
                                            <div className="w-12 h-3 bg-neutral-200/70 dark:bg-neutral-800 rounded animate-pulse" />
                                            <div className="w-24 h-7 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Action Button Skeleton */}
                                    <div className="w-full h-13 bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 rounded-2xl animate-pulse mt-2 flex items-center justify-center">
                                        <div className="w-28 h-4 bg-indigo-500/30 rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col min-h-[calc(100vh-200px)] space-y-6 my-4 font-ar">
                        <div className="flex-1">
                            {dataSource.length === 0 ? (
                                <div
                                    className="bg-white/80 dark:bg-neutral-950/80 p-12 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm backdrop-blur-md flex justify-center items-center h-full min-h-[400px]">
                                    <Empty description={t('common.noData', 'لا توجد بيانات')}/>
                                </div>
                            ) : (
                                <div className={gridClassName}>
                                    {dataSource.map((item, index) => (
                                        <CardComponent
                                            key={item.id || item.key || index}
                                            item={item}
                                            {...cardProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {enableInfiniteScroll ? (
                            <div ref={observerRef} className="h-20 flex justify-center items-center my-4 w-full">
                                {hasMore ? (
                                    showInfiniteLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Spin size="small"/>
                                            <span className="text-sm text-neutral-500 animate-pulse">
                                                {t('common.loadingMore', 'جاري تحميل المزيد...')}
                                            </span>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={triggerLoadMore}
                                            type="default"
                                            className="rounded-xl px-6">
                                            {t('common.loadMore', 'عرض المزيد')}
                                        </Button>
                                    )
                                ) : (
                                    dataSource.length > 0 && (
                                        <span className="text-xs text-neutral-400">
                                            {t('common.noMoreData', 'تم عرض كافة النتائج')}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            total > 0 && (
                                <div
                                    className="mt-auto flex justify-end bg-white/80 dark:bg-neutral-950/80 p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm backdrop-blur-md">
                                    <Pagination
                                        current={page}
                                        pageSize={limit}
                                        total={total}
                                        onChange={(p, l) => onChange?.(p, l)}
                                        showSizeChanger
                                        pageSizeOptions={['10', '20', '50']}
                                    />
                                </div>
                            )
                        )}
                    </div>
                )}
            </Col>
        </Row>
    )
}