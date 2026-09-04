import React from 'react'
import { Row, Button } from 'antd'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Page Filter Component
|--------------------------------------------------------------------------
|
| Clean SATORP identity filter panel.
|
| Design principles:
| - Minimal
| - Institutional
| - Clean spacing
| - Soft borders
| - Green brand accent
| - No heavy shadows
| - RTL friendly
|
*/

interface PageFilterProps {
    title?: string
    isOpen: boolean
    onToggle: () => void
    onSearch: () => void
    children: React.ReactNode
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

const PageFilter = ({ title = 'filters', isOpen, onToggle, onSearch, children }: PageFilterProps) => {

    const { t } = useTranslation()

    return (
        <section className="mb-7 overflow-hidden rounded-2xl border border-border-default bg-surface-card">

            {/* Header */}

            <button
                type="button"
                onClick={onToggle}
                className="group flex w-full cursor-pointer items-center justify-between px-6 py-4.5 text-start transition-colors duration-200 hover:bg-surface-muted"
            >

                {/* Title */}

                <div className="flex items-center gap-3">

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                        <SlidersHorizontal size={17} strokeWidth={2} />
                    </span>

                    <div className="flex flex-col">

                        <span className="text-base font-bold leading-6 text-text-primary">
                            {t(title)}
                        </span>

                        <span className="mt-0.5 text-xs font-medium text-text-secondary">
                            {t('common.searchInformation')}
                        </span>

                    </div>

                </div>

                {/* Toggle */}

                <span className={`flex h-9 w-9 items-center justify-center rounded-full border border-border-default text-text-secondary transition-all duration-200 group-hover:border-brand-green/30 group-hover:text-brand-green ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={17} strokeWidth={2} />
                </span>

            </button>

            {/* Body */}

            <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>

                <div className="min-h-0 overflow-hidden">

                    <div className="border-t border-border-default px-6 py-6">

                        {/* Fields */}

                        <Row gutter={[20, 20]}>
                            {children}
                        </Row>

                        {/* Actions */}

                        <div className="mt-6 flex items-center justify-end border-t border-border-default pt-5">

                            <Button
                                type="primary"
                                onClick={onSearch}
                                className="!h-11 !rounded-xl !border-0 !bg-brand-green !px-7 !text-sm !font-bold !text-white shadow-none transition-all duration-200 hover:!bg-brand-green-hover hover:!shadow-sm active:!scale-[0.98]"
                            >
                                {t('common.filters')}
                            </Button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default PageFilter