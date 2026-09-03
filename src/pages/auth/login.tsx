import { useTranslation } from "react-i18next";
import AuthLayout from "@/layout/AuthLayout";
import { SignInForm } from "@/features/auth";

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
|
*/
export default function Login() {

    /*
    |--------------------------------------------------------------------------
    | Localization
    |--------------------------------------------------------------------------
    |
    | Provides localized text based on the active application language.
    |
    */
    const { t } = useTranslation();

    return (
        <AuthLayout
            title={t("auth.login.title")}
            subtitle={t("auth.login.subtitle")}
            heroTitle={t("auth.hero.title")}
            heroSubtitle={t("auth.hero.description")}>

            {/*
            |--------------------------------------------------------------------------
            | Login Form
            |--------------------------------------------------------------------------
            |
            | Main authentication form responsible for collecting
            | user credentials and submitting the login request.
            |
            */}
            <SignInForm />

        </AuthLayout>
    );
}