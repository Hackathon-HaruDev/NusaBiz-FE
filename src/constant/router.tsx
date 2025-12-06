import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import { listed } from './listed';
import Dashboard from '../pages/dashboard';
import LandingPage from '../pages/landing';
import Produk from '../pages/produk';

export const Router = createBrowserRouter([
    {
    path: '/',
    element: (
        <>
            <Layout />
        </>
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
        path: listed.signIn,
        element: <div>Sign In</div>
    }
])
