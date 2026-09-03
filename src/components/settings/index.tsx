import {HeroBanner} from "@/components/header/hero-banner";
import {StoreCredentialsCard} from "@/components/cards/StoreCredentialsCard";
import {UserProfileCard} from "@/components/cards/UserProfileCard";
import {SallaEngineCard} from "@/components/cards/SallaEngineCard";
import {MetricsStrip} from "@/components/settings/MetricsStrip";

/*
|--------------------------------------------------------------------------
| @component SettingsOverview
|--------------------------------------------------------------------------
|
| Main responsive settings overview layout component organizing all sections
| (Hero Banner, Metrics Strip, User Profile, Store Credentials, and Salla Engine)
| into a clean, modern cinematic bento grid layout with consistent spacing.
| Supports light mode and dark mode.
|
*/
export function SettingsOverview({tenant, user, language, t, copiedId, onCopy, onSync}: any) {
    return (
        <div className="space-y-8 pb-12">

            {/*
            |--------------------------------------------------------------------------
            | Hero Banner Section
            |--------------------------------------------------------------------------
            */}
            <HeroBanner tenant={tenant} t={t} onSync={onSync}/>

            {/*
            |--------------------------------------------------------------------------
            | Metrics Strip Summary Section
            |--------------------------------------------------------------------------
            */}
            <MetricsStrip tenant={tenant} language={language} t={t}/>

            {/*
            |--------------------------------------------------------------------------
            | Dual-Column Cards Layout (User Profile & Store Credentials)
            |--------------------------------------------------------------------------
            */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UserProfileCard user={user} t={t}/>
                <StoreCredentialsCard tenant={tenant} t={t} copiedId={copiedId} onCopy={onCopy}/>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Salla Engine Integration Status Section
            |--------------------------------------------------------------------------
            */}
            <SallaEngineCard t={t}/>

        </div>
    )
}