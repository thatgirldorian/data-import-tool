import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Box } from "@material-ui/core";
import ApplicationBar from './ApplicationBar'

import { Alert } from '@mui/material'
import { TitlebarGridList } from "./DataSources";
import { LoadingAnimation } from "./LoadingAnimation"

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
    isFavorited: boolean;
}



const SelectSourcePage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dataSources, setDataSources] = useState<DataSource[]>([]);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwcGxpY2FudEBhaXJib3hyLmNvbSIsImlhdCI6MTY2Njg5NjIyMiwiZXhwIjoxNjY2ODk4MDIyfQ.KqIyZ0KlhLmWZZQ4aszP_Lwcl3Cfm3gZj5dsx5O6iJ8"

    const fetchSources = () => {


        
        // setIsLoading(true);
        // fetch("https://api.airboxr.com/data/dataSources", {
        // method: "GET",
        // headers: new Headers({
        //     Authorization: `Bearer ${token}`,
        // }),
        // })
        // .then((res) => res.json())
        // .then(
        //     (res) => {
        //     setIsLoaded(true);
        //     setIsLoading(false);
        //     if (res.statusCode) {        
        //         setError(res.message);
        //     } else {
        //         res.push({ id: 3, name: "MailChimp" });
        //         res.forEach((source: DataSource) => (source.isFavorited = false));
        //         setDataSources(res);
        //     }
        //     },
        // );
    }

    useEffect(() => {
        if (dataSources) {
            console.log(dataSources)
        }
    }, [])

    // useEffect(() => {
    //     if (dataSources.length < 1) {
    //     setDataSources(fetchSources());
    //     }
    // }, []);

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
        <FixedBottomProminentButton
            title="Test / Debug"
            onClick={() => fetchSources()}
        />
                    
                    
                

                
        </PageContainer>
    )

}

export default SelectSourcePage