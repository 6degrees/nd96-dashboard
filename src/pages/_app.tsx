import "@/styles/globals.css";
import "@/i18n";
import type { AppProps } from "next/app";
import AppProvider from "@/providers/app-provider";
import {useRouter} from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import Head from "next/head";
import {useTranslation} from "react-i18next";


/*
|--------------------------------------------------------------------------
| Root Application Component
|--------------------------------------------------------------------------
|
| The root entry point for the Next.js application.
|
| Responsibilities:
| - Loads global application styles.
| - Initializes the internationalization (i18n) system.
| - Provides the Redux store to the entire component tree.
|
| Every page rendered by Next.js is wrapped with the Redux Provider,
| allowing all components to access the global application state.
|
*/
export default function App({ Component, pageProps }: AppProps) {
    /*
    |--------------------------------------------------------------------------
    | Conditional Layout Routing
    |--------------------------------------------------------------------------
    |
    | Checks the current URL pathname to determine if the user is browsing
    | a dashboard route. If true, the page component is automatically
    | wrapped inside the DashboardLayout to provide consistent structure.
    |
    */
    const router = useRouter();
    const { t } = useTranslation();
    const isDashboardRoute = router.pathname.startsWith('/dashboard');

    return (
        <AppProvider>
            <Head>
                <title>{t("common.siteName")}</title>
                <meta name="description" content={t("common.description")}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" href="/icon.png" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" href="/icon.png" />
            </Head>
            {isDashboardRoute ? (<DashboardLayout><Component {...pageProps} /></DashboardLayout>) : (<Component {...pageProps} />)}
        </AppProvider>
    );
}