import React from 'react';
import { useNavigate } from 'react-router-dom'
import ExamplePage from "./ExamplePage"
import { Typography, Button, Box, IconButton } from "@material-ui/core";
import {
    PageContainer,
    FixedTopBar,
    FixedMiddleBodyWithVerticalScroll,
    TopbarBackButton
} from "./layout-components";
import _ from "lodash";
import '../styles/style.css'

const SelectSourcePage = () => {
    const navigate = useNavigate()

    const topbarLeftButton: TopbarBackButton = {
        type: "back",
        onClick: () => navigate("/")
};

    return (
        <PageContainer>
            <FixedTopBar title="Select a source." leftButton={topbarLeftButton} />
            <FixedMiddleBodyWithVerticalScroll>
                    <Typography variant="body1" className="select-source-text">
                        Below is a list of the sources you have connected. Please choose the data source you would like to import data from.
                    </Typography>
                </FixedMiddleBodyWithVerticalScroll>
        </PageContainer>
    )

}

export default SelectSourcePage