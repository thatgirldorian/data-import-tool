import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Box } from "@material-ui/core";
import ApplicationBar from './ApplicationBar'

import IconList from "./IconList";
import {
    PageContainer,
    FixedTopBar,
    FixedMiddleBodyWithVerticalScroll,
    TopbarBackButton
} from "./layout-components";
import '../styles/style.css'


const SelectSourcePage = () => {
    const navigate = useNavigate()

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
                <IconList />

                </FixedMiddleBodyWithVerticalScroll>
        </PageContainer>
    )

}

export default SelectSourcePage