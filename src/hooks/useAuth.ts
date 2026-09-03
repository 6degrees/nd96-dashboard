import { useSelector } from 'react-redux';

/*
|--------------------------------------------------------------------------
| useAuth Hook
|--------------------------------------------------------------------------
|
| A custom hook to easily access auth state and user profile
| data from anywhere in the application.
|
*/
export const useAuth = () => {
    const auth = useSelector((state: any) => state.auth);

    return {
        user: auth.user,
        isLoggedIn: auth.login,
        isLoading: auth.loading,
        error: auth.error
    };
};