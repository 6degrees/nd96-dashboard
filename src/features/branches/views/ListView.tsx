'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import CrudPage from '@/components/crud-page'
import {useRouter} from 'next/navigation'

/*
|--------------------------------------------------------------------------
| Feature UI
|--------------------------------------------------------------------------
|
*/

import {
    Filters,
    Columns,
    StatsCards,
    BranchPerformanceCards,
} from '@/features/branches/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/branches/hooks'
import {useTenantDashboard} from '@/features/dashboard'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '@/features/branches/api'
import {RefreshCw} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| View Page
|--------------------------------------------------------------------------
|
*/

export default function Page() {

    /*
    |--------------------------------------------------------------------------
    | Router
    |--------------------------------------------------------------------------
    |
    */

    const router = useRouter()

    /*
    |--------------------------------------------------------------------------
    | Collections
    |--------------------------------------------------------------------------
    |
    */

    const {
        list,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        filters,
        setFilters,
        handleSearch,
    } = useCollections()

    /*
    |--------------------------------------------------------------------------
    | Dashboard Statistics
    |--------------------------------------------------------------------------
    |
    */

    const {
        branchDashboardStatistics,
        branchDashboardStatisticsLoading,
        fetchBranchDashboardStatistics,
    } = useTenantDashboard()

    /*
    |--------------------------------------------------------------------------
    | Initial Dashboard Statistics
    |--------------------------------------------------------------------------
    |
    */

    React.useEffect(() => {
        fetchBranchDashboardStatistics()
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    |
    */

    const handleRefresh = () => {

        if (branchDashboardStatisticsLoading) {
            return
        }

        fetchBranchDashboardStatistics()
        handleSearch()
    }

    /*
    |--------------------------------------------------------------------------
    | Data Source
    |--------------------------------------------------------------------------
    |
    */

    const dataSource = list?.data?.map(
        (branch: any) => ({
            key: branch.id,
            ...branch,
        }),
    )

    /*
    |--------------------------------------------------------------------------
    | Branch Statistics
    |--------------------------------------------------------------------------
    |
    */

    const statistics = branchDashboardStatistics?.stats

    const totalBranches = Number(
        statistics?.total_branches || 0,
    )

    const attentionBranchesCount = Number(
        statistics?.attention_branches || 0,
    )

    const totalOrders = Number(
        statistics?.total_orders || 0,
    )

    /*
    |--------------------------------------------------------------------------
    | Branch Performance Data
    |--------------------------------------------------------------------------
    |
    */

    const attentionBranches =
        branchDashboardStatistics?.attention_branches || []

    const topBranches =
        branchDashboardStatistics?.top_branches || []

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <CrudPage
            title="branch.title"

            columns={Columns}

            Form={null}

            api={api}

            /*
            |--------------------------------------------------------------------------
            | Header Actions
            |--------------------------------------------------------------------------
            |
            */

            actions={() => [
                {
                    label: branchDashboardStatisticsLoading
                        ? 'common.refreshing'
                        : 'common.refresh',

                    type: 'default',

                    icon: (
                        <RefreshCw
                            size={15}
                            className={
                                branchDashboardStatisticsLoading
                                    ? 'animate-spin'
                                    : ''
                            }
                        />
                    ),

                    onClick: handleRefresh,

                    disabled:
                    branchDashboardStatisticsLoading,
                },
            ]}

            /*
            |--------------------------------------------------------------------------
            | Header Statistics
            |--------------------------------------------------------------------------
            |
            */

            headerContent={
                <StatsCards
                    totalBranches={totalBranches}
                    attentionBranches={
                        attentionBranchesCount
                    }
                    totalOrders={totalOrders}
                    loading={
                        branchDashboardStatisticsLoading
                    }
                />
            }

            /*
            |--------------------------------------------------------------------------
            | Filters
            |--------------------------------------------------------------------------
            |
            */

            filters={
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                />
            }

            /*
            |--------------------------------------------------------------------------
            | View
            |--------------------------------------------------------------------------
            |
            */

            onView={(record) =>
                router.push(
                    `/dashboard/branches/${record.id}`,
                )
            }

            /*
            |--------------------------------------------------------------------------
            | Table
            |--------------------------------------------------------------------------
            |
            */

            dataSource={dataSource}

            loading={loading}

            page={page}

            limit={limit}

            total={list?.meta?.total || 0}

            setPage={setPage}

            setLimit={setLimit}

            onSearch={handleSearch}

            drawerWidth="80%"

            /*
            |--------------------------------------------------------------------------
            | Footer Performance
            |--------------------------------------------------------------------------
            |
            */

            footerContent={
                <BranchPerformanceCards
                    attentionBranches={
                        attentionBranches
                    }

                    topBranches={
                        topBranches
                    }

                    loading={
                        branchDashboardStatisticsLoading
                    }
                />
            }
        />
    )
}