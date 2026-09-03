import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, Mail, Building2, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, LogIn, UserCheck } from 'lucide-react'
import AuthLayout from '@/layout/AuthLayout'
import { useShowInvitation, useAcceptInvitation } from '../hooks'
import AcceptInvitationForm from "@/features/invitations/forms/Accept"

/*
|--------------------------------------------------------------------------
| Types & Contracts
|--------------------------------------------------------------------------
*/
interface InvitationDetails {
    email: string;
    has_account: boolean;
    invited_by?: string;
}

/*
|--------------------------------------------------------------------------
| AcceptInvitationView Page
|--------------------------------------------------------------------------
*/
export default function AcceptInvitationView() {
    /*
    |--------------------------------------------------------------------------
    | Hooks & Local State
    |--------------------------------------------------------------------------
    */
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const { token } = router.query

    const { showInvitation, loading: showLoading } = useShowInvitation()
    const { acceptInvitation, actionLoading: acceptLoading } = useAcceptInvitation()

    const [invitation, setInvitation] = useState<InvitationDetails | null>(null)
    const [tokenError, setTokenError] = useState<string | null>(null)
    const [currentStep, setCurrentStep] = useState<1 | 2>(1)

    const isRtl = i18n.language === 'ar'

    /*
    |--------------------------------------------------------------------------
    | Data Fetching & Guarding
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        if (!token) return

        showInvitation(token as string)
            .then((data: InvitationDetails) => {
                setInvitation(data)
            })
            .catch((err: any) => {
                const apiError =
                    err?.response?.data?.errors?.token?.[0] ||
                    err?.response?.data?.message ||
                    t("invitation.invalidOrExpired", "This invitation link is invalid or has expired.")

                setTokenError(apiError)
            })
    }, [token, showInvitation, t])

    /*
    |--------------------------------------------------------------------------
    | Direct Activation for Existing Account Users
    |--------------------------------------------------------------------------
    */
    const handleDirectAccept = async () => {
        if (!token) return

        await acceptInvitation({ token: token as string })
    }

    /*
    |--------------------------------------------------------------------------
    | Sidebar Statistics Payload
    |--------------------------------------------------------------------------
    */
    const statsData = [
        { label: t("auth.login.stats.stores"), value: "5" },
        { label: t("auth.login.stats.rating"), value: "4.6" },
        { label: t("auth.login.stats.alerts"), value: "8" },
    ]

    /*
    |--------------------------------------------------------------------------
    | Loading Skeleton State
    |--------------------------------------------------------------------------
    */
    if (showLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-9 w-9 animate-spin rounded-full border-3 border-indigo-600 border-t-transparent" />
                    <p className="text-sm font-medium text-slate-500 animate-pulse">
                        {t("common.loading", "Loading invitation details...")}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <AuthLayout
            title={
                tokenError
                    ? t("invitation.accept.errorTitle", "Invalid Invitation")
                    : invitation?.has_account
                        ? t("invitation.accept.existingAccountTitle", "Welcome Back!")
                        : currentStep === 1
                            ? t("invitation.accept.step1Title", "You've been invited!")
                            : t("invitation.accept.step2Title", "Complete Your Account")
            }
            subtitle={
                tokenError
                    ? t("invitation.accept.errorSubtitle", "We couldn't process this invitation link")
                    : invitation?.has_account
                        ? t("invitation.accept.existingAccountSubtitle", "Accept the invitation to join this workspace")
                        : currentStep === 1
                            ? t("invitation.accept.step1Subtitle", "Review your invitation details to proceed")
                            : t("invitation.accept.step2Subtitle", "Set up your credentials to join the workspace")
            }
            heroTitle={t("auth.login.heroTitle")}
            heroSubtitle={t("auth.login.heroSubtitle")}
            stats={statsData}>

            {/* Error State View (Token Expired / Invalid / Accepted) */}
            {tokenError ? (
                <div className="space-y-6">
                    <div className="rounded-3xl border border-rose-200/80 bg-rose-50/50 p-6 text-center shadow-xs">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 ring-8 ring-rose-100/50">
                            <AlertTriangle className="h-7 w-7" />
                        </div>

                        <h3 className="text-base font-bold text-slate-900">
                            {t("invitation.accept.linkUnavailable", "Invitation Link Unavailable")}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-sm mx-auto">
                            {tokenError}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.push('/auth/login')}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all">
                        <LogIn className="h-4 w-4" />
                        <span>{t("auth.backToLogin", "Go to Login")}</span>
                    </button>
                </div>
            ) : (
                <>
                    {/* Visual Stepper Header - Displays only for new registration flow */}
                    {!invitation?.has_account && (
                        <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                                    currentStep === 1 ? 'bg-indigo-600 text-white shadow-xs' : 'bg-emerald-500 text-white'
                                }`}>
                                    {currentStep > 1 ? <CheckCircle2 className="h-4 w-4" /> : '1'}
                                </div>
                                <span className={`text-xs font-semibold ${currentStep === 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                                    {t("invitation.accept.steps.review", "Invitation Review")}
                                </span>
                            </div>

                            <div className="h-px w-12 bg-slate-200" />

                            <div className="flex items-center gap-3">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                                    currentStep === 2 ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'
                                }`}>
                                    2
                                </div>
                                <span className={`text-xs font-semibold ${currentStep === 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                                    {t("invitation.accept.steps.account", "Account Setup")}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Scenario A: User HAS AN ACCOUNT -> Direct Acceptance Card */}
                    {invitation?.has_account ? (
                        <div className="space-y-6">
                            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                                <div className="flex flex-col items-center text-center">

                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-8 ring-indigo-50/50">
                                        <Building2 className="h-8 w-8" />
                                    </div>

                                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                        {t("invitation.accept.invitedByLabel", "You've been invited by")}
                                    </span>

                                    <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                                        {invitation.invited_by || t("common.workspace", "Workspace")}
                                    </h2>

                                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
                                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="dir-ltr text-slate-900 font-semibold">{invitation.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Accept Action */}
                            <button
                                type="button"
                                disabled={acceptLoading}
                                onClick={handleDirectAccept}
                                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-all">
                                <UserCheck className="h-4 w-4" />
                                <span>
                                    {acceptLoading
                                        ? t("common.processing", "Processing...")
                                        : t("invitation.accept.joinWorkspace", "Accept & Join Workspace")}
                                </span>
                            </button>
                        </div>
                    ) : (
                        /* Scenario B: User DOES NOT HAVE AN ACCOUNT -> 2-Step Flow */
                        <>
                            {/* Step 1: Review */}
                            {currentStep === 1 && invitation && (
                                <div className="space-y-6">
                                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                                        <div className="flex flex-col items-center text-center">

                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-8 ring-indigo-50/50">
                                                <Building2 className="h-8 w-8" />
                                            </div>

                                            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                                {t("invitation.accept.invitedByLabel", "You've been invited by")}
                                            </span>

                                            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                                                {invitation.invited_by || t("common.workspace", "Workspace")}
                                            </h2>

                                            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
                                                <Mail className="h-3.5 w-3.5 text-slate-400" />
                                                <span className="dir-ltr text-slate-900 font-semibold">{invitation.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(2)}
                                        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all">
                                        <span>{t("invitation.accept.continueButton", "Continue to Registration")}</span>
                                        {isRtl ? (
                                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                        ) : (
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Step 2: Form */}
                            {currentStep === 2 && token && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between rounded-2xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-xs text-indigo-950">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Building2 className="h-4 w-4 shrink-0 text-indigo-600" />
                                            <span className="truncate font-bold">{invitation?.invited_by}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(1)}
                                            className="shrink-0 text-xs font-semibold text-indigo-600 hover:underline">
                                            {t("invitation.accept.changeStep", "View details")}
                                        </button>
                                    </div>

                                    <AcceptInvitationForm token={token as string} />
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            {/* Workspace Security Notice */}
            <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{t("auth.protectedWorkspace", "Protected Workspace")}</span>
                </div>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {t("auth.protectedWorkspaceDesc", "Your connection is encrypted and secured. All workspace activity complies with enterprise security policies.")}
                </p>
            </div>
        </AuthLayout>
    )
}