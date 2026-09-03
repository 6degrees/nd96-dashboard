import { useTranslation } from "react-i18next";
import AuthLayout from "@/layout/AuthLayout";
import {ForgotPasswordForm} from "@/features/auth";

/*
|--------------------------------------------------------------------------
| Login Page
|--------------------------------------------------------------------------
|
| Renders the authentication login page.
|
| Responsibilities:
| - Loads localized page content.
| - Configures the shared authentication layout.
| - Displays the sign-in form.
| - Shows additional security and workspace information.
|
*/
export default function ForgotPassword() {
    /*
    |--------------------------------------------------------------------------
    | Localization
    |--------------------------------------------------------------------------
    |
    | Provides localized text based on the active application language.
    |
    */
    const { t } = useTranslation();

    /*
    |--------------------------------------------------------------------------
    | Hero Statistics
    |--------------------------------------------------------------------------
    |
    | Statistics displayed inside the authentication hero section.
    |
    */
    const statsData = [
        { label: t("auth.login.stats.stores"), value: "5" },
        { label: t("auth.login.stats.rating"), value: "4.6" },
        { label: t("auth.login.stats.alerts"), value: "8" },
    ];

    return (
        <AuthLayout
            title={t("auth.forgotPasswordPage.title")}
            subtitle={t("auth.forgotPasswordPage.description")}
            heroTitle={t("auth.login.heroTitle")}
            heroSubtitle={t("auth.login.heroSubtitle")}
            stats={statsData}>

            {/*
            |--------------------------------------------------------------------------
            | Login Form
            |--------------------------------------------------------------------------
            |
            | Main authentication form responsible for collecting
            | user credentials and submitting the login request.
            |
            */}
            <ForgotPasswordForm />
        </AuthLayout>
    );
}