'use client'
import { UilArrowLeft } from '@iconscout/react-unicons'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/
type Props = {
    title: string
    description: string
    avatar?: string
}

/*
|--------------------------------------------------------------------------
| Details Header Component
|--------------------------------------------------------------------------
|
*/
export const DetailsHeader = ({title, description, avatar}: Props) => {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */
    return (
        <div
            className="
                bg-white
                dark:bg-[#0f172a]

                rounded-[32px]

                border
                border-gray-100
                dark:border-white/10

                shadow-sm
                dark:shadow-black/20

                p-8

                mb-8
            "
        >

            <div className="flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <div
                        className="
                            w-16
                            h-16

                            rounded-2xl

                            bg-blue-50
                            dark:bg-primary/10

                            flex items-center justify-center

                            text-blue-600
                            dark:text-primary

                            text-2xl
                            font-bold

                            overflow-hidden
                        "
                    >

                        {avatar ? (

                            <img
                                src={avatar}
                                alt={title}
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                "
                            />

                        ) : (
                            title?.charAt(0)
                        )}

                    </div>

                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold

                                text-gray-900
                                dark:text-white/90
                            "
                        >
                            {title}
                        </h1>

                        <p
                            className="
                                mt-1

                                text-gray-400
                                dark:text-white/40
                            "
                        >
                            {t(description)}
                        </p>

                    </div>

                </div>

                {/* Right */}
                <button
                    onClick={() => window.history.back()}

                    className="
                        h-12

                        px-5

                        rounded-2xl

                        border
                        border-gray-200
                        dark:border-white/10

                        bg-white
                        dark:bg-white/[0.03]

                        hover:bg-gray-50
                        dark:hover:bg-white/[0.05]

                        transition-all

                        flex
                        items-center
                        gap-2

                        text-gray-700
                        dark:text-white/80

                        font-medium

                        shadow-sm
                        dark:shadow-black/10
                    "
                >

                    <UilArrowLeft size="18" />

                    <span>
                        {t('back')}
                    </span>

                </button>

            </div>

        </div>
    )
}