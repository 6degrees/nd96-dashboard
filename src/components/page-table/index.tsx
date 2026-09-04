'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/

import React, { useState } from 'react'
import { Row, Col, Table } from 'antd'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { ChevronDown } from 'lucide-react'

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
    title?: string
    description?: string
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

const PageTable = ({
                       loading,
                       columns,
                       dataSource,
                       page,
                       limit,
                       total,
                       onChange,
                       title = 'المستخدمين',
                       description = 'إدارة المستخدمين',
                   }: PageTableProps) => {

    /*
    |--------------------------------------------------------------------------
    | Collapse State
    |--------------------------------------------------------------------------
    */

    const [isOpen, setIsOpen] = useState(true)

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Row>
            <Col span={24}>

                <section className="overflow-hidden rounded-2xl border border-border-default bg-surface-card font-ar">

                    {/* ---------------------------------------------------------------- */}
                    {/* Header */}
                    {/* ---------------------------------------------------------------- */}

                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="group flex w-full items-center justify-between border-b border-border-default px-6 py-4.5 text-start transition-colors duration-200 hover:bg-surface-muted cursor-pointer"
                    >

                        {/* Title */}

                        <div className="flex items-center gap-3">

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                                <UilUsersAlt size="17" />
                            </span>

                            <div className="flex flex-col">

                                <span className="text-2xl font-bold leading-6 text-text-primary">
                                    {title}
                                </span>

                                <span className="mt-0.5 text-base font-medium text-text-secondary">
                                    {description}
                                </span>

                            </div>

                        </div>

                        {/* Collapse */}

                        <span className={`flex h-9 w-9 items-center justify-center rounded-full border border-border-default text-text-secondary transition-all duration-200 group-hover:border-brand-green/30 group-hover:text-brand-green ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown size={17} strokeWidth={2} />
                        </span>

                    </button>

                    {/* ---------------------------------------------------------------- */}
                    {/* Table Content */}
                    {/* ---------------------------------------------------------------- */}

                    <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>

                        <div className="min-h-0 overflow-hidden">

                            {loading ? (

                                /* ------------------------------------------------------ */
                                /* Loading */
                                /* ------------------------------------------------------ */

                                <div className="w-full">

                                    <div className="flex h-14 items-center gap-6 border-b border-border-default px-6">

                                        {columns.map((_, index) => (
                                            <div
                                                key={index}
                                                className="h-4 flex-1 animate-pulse rounded bg-border-default"
                                            />
                                        ))}

                                    </div>

                                    <div>

                                        {Array.from({ length: 4 }).map((_, rowIndex) => (

                                            <div
                                                key={rowIndex}
                                                className="flex min-h-16 items-center gap-6 border-b border-border-default px-6"
                                            >

                                                {columns.map((_, colIndex) => (

                                                    <div
                                                        key={colIndex}
                                                        className="flex flex-1 items-center border-s border-border-default px-4 first:border-s-0"
                                                    >

                                                        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-muted" />

                                                    </div>

                                                ))}

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            ) : (

                                /* ------------------------------------------------------ */
                                /* Table */
                                /* ------------------------------------------------------ */

                                <div className="satorp-table-wrapper">

                                    <Table
                                        columns={columns}
                                        dataSource={dataSource}
                                        scroll={{ x: 'max-content' }}
                                        pagination={{
                                            current: page,
                                            pageSize: limit,
                                            total: total,
                                            showSizeChanger: true,
                                            onChange: (currentPage, pageSize) => {
                                                onChange(currentPage, pageSize)
                                            },
                                            className: '!m-0 !border-t !border-border-default !px-6 !py-4',
                                            showTotal: (totalItems, range) => (
                                                <span className="text-sm font-medium text-text-secondary">
                                                    {range[0]}–{range[1]} من {totalItems}
                                                </span>
                                            ),
                                        }}
                                        className="modern-table"
                                        rowClassName={() => 'transition-colors duration-200 hover:bg-surface-muted'}
                                    />

                                </div>

                            )}

                        </div>

                    </div>

                </section>

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