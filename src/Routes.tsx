import React from "react";
import { redirect, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SelectSourcePage from "./components/SelectSourcePage";
import SelectTablePage from "./components/SelectTablePage";
import SelectDataPage from './components/SelectDataPage'

const AppRoutes: React.FC = () => {
    return (
            <Routes>
                <Route path="/" >
                    <HomePage />
                </Route>

                <Route path="/select-source" >
                    <SelectSourcePage />
                </Route>

                <Route path="/select-table" >
                    redirect("/select-source")
                </Route>

                <Route path="/select-table/:source" >
                    <SelectTablePage />
                </Route>

                <Route path="/select-table/:source/:table" >
                    <SelectTablePage />
                </Route>

                <Route path="*">
                    redirect('/')
                </Route>
            </Routes>
            
        
    );
};

export default AppRoutes;