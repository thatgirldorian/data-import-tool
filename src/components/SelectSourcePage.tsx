import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Box } from "@material-ui/core";
import ApplicationBar from './ApplicationBar'

import { Alert } from '@mui/material'
import { TitlebarGridList } from "./DataSources";
import { LoadingAnimation } from "./LoadingAnimation"
import { DataSourceTable} from '../types'

import {
    PageContainer,
    FixedTopBar,
    FixedBottomProminentButton,
    FixedMiddleBodyWithVerticalScroll,
    TopbarBackButton
} from "./layout-components";
import '../styles/style.css'

interface DataSource {
    id: number;
    name: string;
    uuid: string;
    tables: DataSourceTable[];
    title: string;
    isIndented: boolean;
    isFavorited: boolean;
}



const SelectSourcePage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataSources, setDataSources] = useState<DataSource[]>([]);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwcGxpY2FudEBhaXJib3hyLmNvbSIsImlhdCI6MTY2NjkwNzg3OCwiZXhwIjoxNjY2OTA5Njc4fQ.pXTK2Ltqo-xUSY2EiykNASoQWQhQ2dFMTf3zoHHWY4M"

    
        

            


    const fetchSources = () => {
        setIsLoading(true);
        fetch("https://api.airboxr.com/data/dataSources", {
        method: "GET",
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
        })
        .then((response) => response.json())
        .then(
            (response) => {
                
            setIsLoaded(true);
            setIsLoading(false);
            if (response.statusCode) {        
                setError(response.message);
            } else {
                    response.push({ id: 13, name: "MailChimp", tables: response.tables.map(({ id, title}) => {
                        id
                        title
                    })
                });
                    
            response.forEach((source: DataSource) => (source.isFavorited = false));
            setDataSources(response);
            console.log(setDataSources)
            }
        },
        )
    }


    useEffect(() => {
        fetchSources()
    }, [])


    const topbarLeftButton: TopbarBackButton = {
        type: "back",
        onClick: () => navigate("/")
};




    return (
        <PageContainer >
            <ApplicationBar  />  
            <FixedTopBar title="Select a source." leftButton={topbarLeftButton} />
            <FixedMiddleBodyWithVerticalScroll>
                    <Typography variant="body1" className="select-source-text">
                        Below is a list of the sources you have connected. Please choose the data source you would like to import data from.
                    </Typography>
                    

                    {isLoading ? (
            <LoadingAnimation />
            ) : error ? (
            <Alert severity="error">Error! Please check if your token has expired.</Alert>
            ) : (
            <TitlebarGridList datasource={dataSources} isLoaded={isLoaded} />
            )}
        </FixedMiddleBodyWithVerticalScroll>
        {/* <FixedBottomProminentButton
            title="Test / Debug"
            // onClick={() => fetchSources()}
        /> */}
                    </PageContainer>
    )

}
        

export default SelectSourcePage