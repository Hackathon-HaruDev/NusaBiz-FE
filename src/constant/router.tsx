import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';

export const Router = createBrowserRouter([
    {
    path: '/',
    element: (
        <>
            <Layout />
        </>
    ),
    children: [
        {}
    ],
    },
])
