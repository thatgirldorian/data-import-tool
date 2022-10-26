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
                        Hey Let's start with the task you want to accomplish today.
                    </Typography>
                </FixedMiddleBodyWithVerticalScroll>
            
            </PageContainer>
    )

}

export default HomePage