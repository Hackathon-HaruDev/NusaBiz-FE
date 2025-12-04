import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import { listed } from './listed';
import Dashboard from '../pages/dashboard';

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
            element: <div>Profile</div>
        }
    ],
    },
])
