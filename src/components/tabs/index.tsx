'use client'

import React from 'react'
import {Tabs as BaseTabs, TabsProps} from 'antd'

type TabItem = {
    key: string
    label: React.ReactNode
    children: React.ReactNode
}

type Props = Omit<TabsProps, 'items'> & {
    items: TabItem[]
}

export const Tabs = ({items, ...rest}: Props) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <BaseTabs
                defaultActiveKey={items?.[0]?.key}
                size="large"
                className="modern-tabs"
                items={items}
                {...rest}
            />

            <style jsx global>{`
                .modern-tabs {
                    width: 100%;
                }

                .modern-tabs .ant-tabs-nav {
                    margin: 0 !important;
                    padding: 0 28px !important;
                }

                .modern-tabs .ant-tabs-nav::before {
                    border-bottom: 1px solid #e2e8f0 !important;
                }

                .modern-tabs .ant-tabs-nav-list {
                    display: flex !important;
                    align-items: center;
                    gap: 28px;
                }

                .modern-tabs .ant-tabs-tab {
                    margin: 0 !important;
                    padding: 18px 0 15px !important;
                    border: 0 !important;
                    background: transparent !important;
                }

                .modern-tabs .ant-tabs-tab-btn {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    color: #64748b;
                    font-size: 15px;
                    font-weight: 600;
                    white-space: nowrap;
                    transition: color 0.2s ease;
                }

                .modern-tabs .ant-tabs-tab:hover .ant-tabs-tab-btn {
                    color: #334155;
                }

                .modern-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #315efb !important;
                    font-weight: 700;
                }

                .modern-tabs .ant-tabs-ink-bar {
                    height: 3px !important;
                    border-radius: 999px 999px 0 0 !important;
                    background: #315efb !important;
                }

                .modern-tabs .ant-tabs-content-holder {
                    padding: 28px !important;
                }

                .dark .modern-tabs .ant-tabs-nav::before {
                    border-bottom-color: #262626 !important;
                }

                .dark .modern-tabs .ant-tabs-tab-btn {
                    color: #a3a3a3;
                }

                .dark .modern-tabs .ant-tabs-tab:hover .ant-tabs-tab-btn {
                    color: #e5e5e5;
                }

                .dark .modern-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #60a5fa !important;
                }

                .dark .modern-tabs .ant-tabs-ink-bar {
                    background: #60a5fa !important;
                }

                @media (max-width: 640px) {
                    .modern-tabs .ant-tabs-nav {
                        padding: 0 16px !important;
                    }

                    .modern-tabs .ant-tabs-nav-list {
                        gap: 20px;
                    }

                    .modern-tabs .ant-tabs-tab-btn {
                        font-size: 14px;
                    }

                    .modern-tabs .ant-tabs-content-holder {
                        padding: 20px 16px !important;
                    }
                }
            `}</style>
        </div>
    )
}