import {
    Monitor,
    Pause,
    Play,
    Trash2,
    RotateCcw,
    Wifi,
    ArrowUpLeft,
    Loader2,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCommand } from '@/features/command'

/*
|--------------------------------------------------------------------------
| ScreenCommandPanel Component
|--------------------------------------------------------------------------
|
| Provides a modern SATORP-inspired control center for remote screens.
|
| Features:
| - Localized screen names and commands.
| - RTL and LTR compatible layout.
| - Brand-aligned colors and surfaces.
| - Responsive command cards.
| - Realtime command execution.
|
*/

const ScreenCommandPanel = () => {
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Command Hook
    |--------------------------------------------------------------------------
    |
    | Handles command execution and request state.
    |
    */
    const {
        handleCommand,
        loading,
    } = useCommand()

    /*
    |--------------------------------------------------------------------------
    | Screens Configuration
    |--------------------------------------------------------------------------
    |
    | Defines all available remote display screens.
    |
    */
    const screens = [
        {
            key: 'message_wall',
            title: t('command.screens.messageWall.title'),
            description: t('command.screens.messageWall.description'),
        },
        {
            key: 'message_moment',
            title: t('command.screens.messageMoment.title'),
            description: t('command.screens.messageMoment.description'),
        },
        {
            key: 'kings_energy_journey',
            title: t('command.screens.kingsEnergyJourney.title'),
            description: t('command.screens.kingsEnergyJourney.description'),
        },
    ]

    /*
    |--------------------------------------------------------------------------
    | Commands Configuration
    |--------------------------------------------------------------------------
    |
    | Defines available screen commands and their visual identity.
    |
    */
    const commands = [
        {
            key: 'holding',
            label: t('command.actions.holding.title'),
            description: t('command.actions.holding.description'),
            icon: Pause,
            color: 'text-[var(--brand-brown)]',
            background: 'bg-[var(--color-warning-background)]',
            hoverBorder: 'hover:border-[var(--brand-brown)]',
            hoverBackground: 'hover:bg-[#FBF8F0]',
        },
        {
            key: 'resume',
            label: t('command.actions.resume.title'),
            description: t('command.actions.resume.description'),
            icon: Play,
            color: 'text-[var(--brand-green)]',
            background: 'bg-[var(--color-success-background)]',
            hoverBorder: 'hover:border-[var(--brand-green)]',
            hoverBackground: 'hover:bg-[#F5FBF7]',
        },
        {
            key: 'clear',
            label: t('command.actions.clear.title'),
            description: t('command.actions.clear.description'),
            icon: Trash2,
            color: 'text-[var(--brand-burgundy)]',
            background: 'bg-[var(--color-error-background)]',
            hoverBorder: 'hover:border-[var(--brand-burgundy)]',
            hoverBackground: 'hover:bg-[#FCF6F8]',
        },
        {
            key: 'resetEvent',
            label: t('command.actions.resetEvent.title'),
            description: t('command.actions.resetEvent.description'),
            icon: RotateCcw,
            color: 'text-[var(--brand-blue)]',
            background: 'bg-[var(--color-info-background)]',
            hoverBorder: 'hover:border-[var(--brand-blue)]',
            hoverBackground: 'hover:bg-[#F5F8FC]',
        },
    ]

    /*
    |--------------------------------------------------------------------------
    | Handle Screen Command
    |--------------------------------------------------------------------------
    |
    | Sends the selected command to the selected screen.
    |
    */
    const handleScreenCommand = (
        screen: string,
        command: string
    ) => {
        handleCommand(screen, command)
    }

    return (
        <div className="p-1 sm:p-3 lg:p-8 min-h-screen space-y-7">

            {/*
            |--------------------------------------------------------------------------
            | Page Header
            |--------------------------------------------------------------------------
            |
            | Displays the page title and supporting description.
            |
            */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand-lime)]" />

                    <span className="text-xs font-bold tracking-wide text-[var(--brand-green)]">
                        {t('command.badge')}
                    </span>
                </div>

                <div>
                    <h1 className="m-0 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                        {t('command.title')}
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                        {t('command.description')}
                    </p>
                </div>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Screens List
            |--------------------------------------------------------------------------
            |
            | Renders all remote screens and their available commands.
            |
            */}
            <div className="space-y-5">
                {screens.map((screen) => (
                    <section
                        key={screen.key}
                        className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)] transition-all duration-300 hover:border-[var(--color-border)] hover:shadow-[var(--shadow-sm)]"
                    >
                        {/*
                        |--------------------------------------------------------------------------
                        | Brand Accent
                        |--------------------------------------------------------------------------
                        */}
                        <div className="absolute inset-y-0 start-0 w-1 bg-[var(--brand-green)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/*
                        |--------------------------------------------------------------------------
                        | Screen Header
                        |--------------------------------------------------------------------------
                        */}
                        <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-primary)] text-white">
                                    <Monitor
                                        size={21}
                                        strokeWidth={1.8}
                                    />

                                    <span className="absolute -bottom-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[var(--brand-green)]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                    </span>
                                </div>

                                <div className="min-w-0">
                                    <h2 className="m-0 text-base font-bold text-[var(--color-text-primary)] sm:text-lg">
                                        {screen.title}
                                    </h2>

                                    <p className="mt-1 m-0 text-xs leading-5 text-[var(--color-text-muted)]">
                                        {screen.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 self-start rounded-full border border-[var(--color-success-border)] bg-[var(--color-success-background)] px-3 py-1.5 lg:self-center">
                                <Wifi
                                    size={13}
                                    className="text-[var(--brand-green)]"
                                    strokeWidth={2}
                                />

                                <span className="text-xs font-bold text-[var(--brand-green)]">
                                    {t('command.connected')}
                                </span>
                            </div>
                        </div>

                        {/*
                        |--------------------------------------------------------------------------
                        | Divider
                        |--------------------------------------------------------------------------
                        */}
                        <div className="h-px bg-[var(--color-border-light)]" />

                        {/*
                        |--------------------------------------------------------------------------
                        | Commands
                        |--------------------------------------------------------------------------
                        */}
                        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-4">
                            {commands.map((command) => {
                                const CommandIcon = command.icon

                                return (
                                    <button
                                        key={command.key}
                                        type="button"
                                        disabled={loading}
                                        onClick={() =>
                                            handleScreenCommand(
                                                screen.key,
                                                command.key
                                            )
                                        }
                                        className={`
                                            group/command
                                            relative
                                            flex
                                            min-h-[84px]
                                            items-center
                                            gap-3
                                            overflow-hidden
                                            rounded-xl
                                            border
                                            border-[var(--color-border-light)]
                                            bg-[var(--color-surface)]
                                            px-4
                                            py-3
                                            text-start
                                            transition-all
                                            duration-200
                                            hover:-translate-y-0.5
                                            hover:shadow-[var(--shadow-sm)]
                                            active:translate-y-0
                                            disabled:pointer-events-none
                                            disabled:opacity-60
                                            ${command.hoverBorder}
                                            ${command.hoverBackground}
                                        `}
                                    >
                                        {/*
                                        |--------------------------------------------------------------------------
                                        | Command Icon
                                        |--------------------------------------------------------------------------
                                        */}
                                        <div
                                            className={`
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                transition-transform
                                                duration-200
                                                group-hover/command:scale-105
                                                ${command.background}
                                                ${command.color}
                                            `}
                                        >
                                            {loading ? (
                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <CommandIcon
                                                    size={19}
                                                    strokeWidth={1.9}
                                                />
                                            )}
                                        </div>

                                        {/*
                                        |--------------------------------------------------------------------------
                                        | Command Content
                                        |--------------------------------------------------------------------------
                                        */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                                                    {command.label}
                                                </span>

                                                <ArrowUpLeft
                                                    size={14}
                                                    strokeWidth={1.8}
                                                    className={`
                                                        shrink-0
                                                        text-[var(--color-text-muted)]
                                                        opacity-0
                                                        transition-all
                                                        duration-200
                                                        group-hover/command:-translate-y-0.5
                                                        group-hover/command:translate-x-0.5
                                                        group-hover/command:opacity-100
                                                        ${command.color}
                                                    `}
                                                />
                                            </div>

                                            <span className="mt-1 block text-[11px] font-medium leading-4 text-[var(--color-text-muted)]">
                                                {command.description}
                                            </span>
                                        </div>

                                        {/*
                                        |--------------------------------------------------------------------------
                                        | Bottom Accent
                                        |--------------------------------------------------------------------------
                                        */}
                                        <span
                                            className={`
                                                absolute
                                                inset-x-0
                                                bottom-0
                                                h-0.5
                                                opacity-0
                                                transition-opacity
                                                duration-200
                                                group-hover/command:opacity-100
                                                ${command.color.replace(
                                                'text-',
                                                'bg-'
                                            )}
                                            `}
                                        />
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default ScreenCommandPanel