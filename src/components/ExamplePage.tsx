import { Typography, Button, Box, IconButton } from "@material-ui/core";
import React from "react";

import {
  PageContainer,
  FixedTopBar,
  FixedMiddleBodyWithVerticalScroll,
  FixedBottomProminentButton,
  TopbarBackButton
} from "./layout-components";
import _ from "lodash";

export default function ExamplePage () {
  const topbarLeftButton: TopbarBackButton = {
    type: "back",
    onClick: () => console.log("Clicked back")
  };
  return (
    <PageContainer>
      <FixedTopBar title="Example Page Title" leftButton={topbarLeftButton} />
      <FixedMiddleBodyWithVerticalScroll>
        {/* Body goes here */}
      </FixedMiddleBodyWithVerticalScroll>
      <FixedBottomProminentButton
        title="Test / Debug"
        onClick={() => console.log("TODO - whatever you want to test/debug")}
      />
    </PageContainer>
  );
};
