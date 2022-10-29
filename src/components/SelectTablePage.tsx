import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography, Box, IconButton } from "@material-ui/core";
import TableGroup from "./TableGroup";
import ApplicationBar from './ApplicationBar'

import {
    PageContainer, 
    FixedTopBar,
    FixedMiddleBodyWithVerticalScroll,
    TopbarBackButton,
    FixedBottomProminentButton
} from "./layout-components";
import '../styles/style.css'


const SelectTablePage = () => {
    const navigate = useNavigate()

    const topbarLeftButton: TopbarBackButton = {
        type: "back",
        onClick: () => navigate("/SelectSourcePage")
};

    return (
        
        <PageContainer>
            <ApplicationBar />
            <FixedTopBar title="Select a table." leftButton={topbarLeftButton} />
            <FixedMiddleBodyWithVerticalScroll>
                    <Typography variant="body1" className="select-table-text">
                        Source has the following tables ready for import. Please select the table you would like to import.
                    </Typography>
                    <FixedBottomProminentButton 
                        // style={{textTransform: "none"}}
                        title="Next"
                        onClick={() => console.log("TODO - whatever you want to test/debug")} />
                        <TableGroup />
                </FixedMiddleBodyWithVerticalScroll>
        </PageContainer>
    )

}

export default SelectTablePage