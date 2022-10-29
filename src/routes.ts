import HomePage from './components/HomePage'
import SelectSourcePage from './components/SelectSourcePage'
import SelectTablePage from './components/SelectTablePage'
import SelectDataPage from './components/SelectDataPage'
// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'HomePage',
        path: '/',
        enabled: true,
        component: HomePage
    },
    {
        key: 'select-source-route',
        title: 'Select Source Page',
        path: '/SelectSourcePage',
        enabled: true,
        component: SelectSourcePage
    },
    {
        key: 'select-data-route/',
        title: 'Select Data Page',
        path: '/SelectDataPage',
        enabled: true,
        component: SelectDataPage
    },
    {
        key: 'select-table-route/:source',
        title: 'Select Table Page',
        path: '/SelectTablePage/:source',
        enabled: true,
        component: SelectTablePage
    },
    {
        key: 'select-table-route/:source/:table',
        title: 'Select Table Page',
        path: '/SelectTablePage/:source/:table',
        enabled: true,
        component: SelectTablePage
    }
    
]
