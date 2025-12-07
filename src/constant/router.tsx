import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import { listed } from './listed';
import Dashboard from '../pages/dashboard';
import LandingPage from '../pages/landing';
import Produk from '../pages/produk';
import Transaksi from '../pages/transaksi';
import Auth from '../pages/auth';
import AuthProtectLayout from '../components/AuthProtectLayout';
import Profile from '../pages/profile';
import ResetPassword from '../pages/resetpassword';

export const Router = createBrowserRouter([
    {
    path: '/',
    element: (
        <AuthProtectLayout>
            <Layout />
        </AuthProtectLayout>
    ),
    children: [
        {
            index: true,
            element: <Dashboard />,
        },
        {
            path: listed.dashboard,
            element: <Dashboard />
        },
        {
            path: listed.transaksi,
            element: <Transaksi />
        },
        {
            path: listed.produk,
            element: <Produk />
        },
        {
            path: listed.profile,
            element: <Profile />
        }
    ],
    },
    {
        path: listed.landingPage,
        element: <LandingPage />
    },
    {
        path: listed.auth,
        element: <Auth />
    },
    {
        path: listed.resetPassword,
        element: <ResetPassword />
    }
])
