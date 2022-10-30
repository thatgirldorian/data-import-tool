import React, { createContext, useState } from "react";

import { ApiClient } from './api/ApiClient'
import { DataStore } from './types'




class AppStateService {
    dataStores: DataStore[] = [];

    updateDataStores = async () => {
        const apiClient = new ApiClient();
        this.dataStores = await apiClient.getDataStores();

    };
};

const appStateService = new AppStateService();
export default appStateService;

const AppState: React.FC = ({ children }) => {
    const [dataStores, setDataStores] = useState<DataStore[]>([]);
    const apiClient = new ApiClient();

        const updateDataStores = async () => {
        const stores = await apiClient.getDataStores();
        setDataStores(stores);
        };
    
        return (
        <>
    
        </>
        );
    };
