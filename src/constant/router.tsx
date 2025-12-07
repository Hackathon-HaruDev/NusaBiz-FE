import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import { listed } from './listed';
import Dashboard from '../pages/dashboard';
import Auth from '../pages/auth';
import PasswordObscure from '../components/auth/obscure';
import AuthToggle from '../components/auth/toggle';
import profile from '../pages/profile';
import Profile from '../pages/profile';

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
            path: listed.dashboard,
            element: <Dashboard />
        },
        {
            path: listed.transaksi,
            element: <div>Test</div>
        },
        {
            path: listed.produk,
            element: <div>Test</div>
        },
        {
            path: listed.profile,
            element: <Profile />
        }
    ],
    },
    {
        path: listed.landingPage,
        element: <div>landing Page</div>
    },
    {
        path: listed.auth,
        element: <Auth />
    }
])
