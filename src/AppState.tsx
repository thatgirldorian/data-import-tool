import React, { createContext, useState } from "react";

import { ApiClient} from './api/ApiClient'

//export to types.ts later
type DataStore = {
    id: number;
    name: string;
    tables: DataSourceTable[];
};

type DataSourceTable = {
    id: number;
    title: string;
    isIndented: boolean;
};

    export const AppContext =  createContext<{
    dataStores: DataStore[];
    updateDataStores: () => Promise<void>;
    }>({
    dataStores: [],
    updateDataStores: () => Promise.reject()
    });

    const AppState: React.FC = ({ children }) => {
    const [dataStores, setDataStores] = useState<DataStore[]>([]);
    const apiClient = new ApiClient();


    const updateDataStores = async () => {
        const stores = await apiClient.getDataStores();
        setDataStores(stores);
        console.log(setDataStores(stores))
    };

    return (
        <>
        <AppContext.Provider value={{ dataStores, updateDataStores }}>
            {children}
        </AppContext.Provider>
        </>
    );
};

export default AppState;