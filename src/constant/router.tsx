import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import { listed } from './listed';
import Dashboard from '../pages/dashboard';
import LandingPage from '../pages/landing';
import Produk from '../pages/produk';
import Auth from '../pages/auth';
import AuthProtectLayout from '../components/AuthProtectLayout';

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
            element: <div>Test</div>
        },
        {
            path: listed.produk,
            element: <Produk />
        },
        {
            path: listed.profile,
            element: <div>Profile</div>
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
    }
])
