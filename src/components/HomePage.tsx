import React from 'react';
import ExamplePage from "./ExamplePage"
import { Typography, Button} from "@material-ui/core";
import { FixedMiddleBodyWithVerticalScroll, FixedTopBar, PageContainer, TopbarBackButton } from './layout-components';
import '../styles/style.css'


const HomePage = () => {

    return (
            <PageContainer>
                <FixedTopBar title="What would you like to do today?"  />
                <FixedMiddleBodyWithVerticalScroll>
                    <Typography variant="body1" className="homepage-text">
                        Welcome to Airboxr. Let's start with the task you want to accomplish today.
                    </Typography>
                    <Button href="/SelectSourcePage" variant="outlined" className="homepage-button">Import data</Button>
                    <Button href="/SelectSourcePage" variant="outlined" className="homepage-button" color="secondary">Lookup data</Button>
                </FixedMiddleBodyWithVerticalScroll>
            
            </PageContainer>
    )

}

export default HomePage