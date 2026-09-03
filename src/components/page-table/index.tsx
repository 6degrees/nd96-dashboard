'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/
import React from 'react'
import { Row, Col, Table } from 'antd'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/
interface PageTableProps {
    loading: boolean
    columns: any[]
    dataSource: any[]
    page: number
    limit: number
    total: number
    onChange: (page: number, pageSize: number) => void
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
const PageTable = (
    {
        loading,
        columns,
        dataSource,
        page,
        limit,
        total,
        onChange,
    }: PageTableProps) => {

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */
    return (
        <Row>
            <Col span={24}>
                <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-[28px] border border-neutral-200/80 dark:border-neutral-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden font-ar">
                    {loading ? (
                        /*
                        |--------------------------------------------------------------------------
                        | Modern Table Skeleton (Dynamic Columns Match)
                        |--------------------------------------------------------------------------
                        */
                        <div className="w-full p-6 space-y-4">
                            {/* Table Header Skeleton matching actual columns length */}
                            <div className="w-full h-12 bg-neutral-100 dark:bg-neutral-800/60 rounded-2xl animate-pulse flex items-center px-6 gap-6">
                                {columns.map((_, index) => (
                                    <div key={index} className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded flex-1" />
                                ))}
                            </div>

                            {/* Table Rows Skeleton (4 Items, columns matched) */}
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className="w-full h-16 bg-white/50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/60 rounded-2xl px-6 flex items-center gap-6 relative overflow-hidden group">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-neutral-100/60 dark:via-neutral-800/40 to-transparent pointer-events-none" />

                                        {columns.map((_, colIndex) => (
                                            <div key={colIndex} className="flex-1 flex items-center gap-3">
                                                {colIndex === 0 && (
                                                    <div className="w-9 h-9 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse shrink-0" />
                                                )}
                                                <div className="space-y-2 w-full">
                                                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse w-3/4" />
                                                    {colIndex === 0 && (
                                                        <div className="h-3 bg-neutral-100 dark:bg-neutral-800/60 rounded-lg animate-pulse w-1/2" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /*
                        |--------------------------------------------------------------------------
                        | Table Content
                        |--------------------------------------------------------------------------
                        */
                        <div>
                            <div className="overflow-hidden">
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                    scroll={{ x: 'max-content' }}
                                    pagination={{
                                        current: page,
                                        pageSize: limit,
                                        total: total,
                                        showSizeChanger: true,
                                        onChange: (p, l) => onChange(p, l),
                                        className: 'px-6 py-4 border-t border-neutral-200/40 dark:border-neutral-800/40 m-0',
                                    }}
                                    className="modern-table"
                                    rowClassName={() => `hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40 transition-colors duration-300`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    )
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/
export default PageTable