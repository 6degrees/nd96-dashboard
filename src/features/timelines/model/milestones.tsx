'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import { Modal, Tag, Empty } from 'antd'
import { CalendarDays, Image as ImageIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/

interface TimelineMilestonesModalProps {
    open: boolean
    timeline: any | null
    onClose: () => void
}

/*
|--------------------------------------------------------------------------
| Timeline Milestones Modal
|--------------------------------------------------------------------------
|
| Displays timeline information and its milestones.
|
*/

export default function TimelineMilestonesModal({open, timeline, onClose}: TimelineMilestonesModalProps) {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    */

    const { t, i18n } = useTranslation()

    const isArabic = i18n.language === 'ar'

    const milestones = timeline?.milestones ?? []

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={850}
            centered
            title={
                <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold">
                        {isArabic
                            ? timeline?.name_ar
                            : timeline?.name_en}
                    </span>

                    <span className="text-sm text-gray-400">
                        {t('milestone.title')}
                    </span>
                </div>
            }
        >

            {/* Timeline Information */}

            <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                    <div>
                        <div className="mb-1 text-xs text-gray-400">
                            {t('timeline.inputs.name_ar')}
                        </div>

                        <div className="font-medium">
                            {timeline?.name_ar || '-'}
                        </div>
                    </div>

                    <div>
                        <div className="mb-1 text-xs text-gray-400">
                            {t('timeline.inputs.name_en')}
                        </div>

                        <div className="font-medium">
                            {timeline?.name_en || '-'}
                        </div>
                    </div>

                    <div>
                        <div className="mb-1 text-xs text-gray-400">
                            {t('timeline.inputs.startYear')}
                        </div>

                        <div className="font-medium">
                            {timeline?.start_year ?? '-'}
                        </div>
                    </div>

                    <div>
                        <div className="mb-1 text-xs text-gray-400">
                            {t('timeline.inputs.endYear')}
                        </div>

                        <div className="font-medium">
                            {timeline?.end_year ?? '-'}
                        </div>
                    </div>

                </div>

            </div>

            {/* Milestones */}

            <div className="mb-4 flex items-center justify-between">

                <div>
                    <h3 className="text-base font-semibold">
                        {t('milestone.title')}
                    </h3>

                    <p className="text-sm text-gray-400">
                        {milestones.length} {t('milestone.title')}
                    </p>
                </div>

                <Tag color="blue">
                    {milestones.length}
                </Tag>

            </div>

            {milestones.length === 0 ? (

                <Empty
                    description={t('milestone.empty')}
                />

            ) : (

                <div className="max-h-[55vh] space-y-3 overflow-y-auto pe-1">

                    {milestones.map((milestone: any) => (

                        <div
                            key={milestone.id}
                            className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.02]"
                        >

                            <div className="flex gap-4">

                                {/* Image */}

                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-white/5">

                                    {milestone.image ? (
                                        <img
                                            src={milestone.image}
                                            alt={
                                                isArabic
                                                    ? milestone.title_ar
                                                    : milestone.title_en
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                                            <ImageIcon size={22} />
                                        </div>
                                    )}

                                </div>

                                {/* Content */}

                                <div className="min-w-0 flex-1">

                                    <div className="mb-2 flex items-start justify-between gap-3">

                                        <div>
                                            <h4 className="font-semibold">
                                                {isArabic
                                                    ? milestone.title_ar
                                                    : milestone.title_en}
                                            </h4>

                                            {!isArabic && milestone.title_ar && (
                                                <p className="text-sm text-gray-400">
                                                    {milestone.title_ar}
                                                </p>
                                            )}

                                        </div>

                                        <Tag
                                            color="gold"
                                            className="m-0 shrink-0"
                                        >
                                            <span className="inline-flex items-center gap-1">
                                                <CalendarDays size={13} />
                                                {milestone.year}
                                            </span>
                                        </Tag>

                                    </div>

                                    <p className="line-clamp-2 text-sm leading-6 text-gray-500 dark:text-white/50">
                                        {isArabic
                                            ? milestone.description_ar
                                            : milestone.description_en}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </Modal>
    )
}