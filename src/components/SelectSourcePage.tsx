import React from 'react';
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Box, ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";
import ApplicationBar from './ApplicationBar'
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DataStore } from '../types'



import { LoadingAnimation } from "./LoadingAnimation"
import appStoreService from '../AppState';

import {
    PageContainer,
    FixedTopBar,
    FixedMiddleBodyWithVerticalScroll,
    TopbarBackButton
} from "./layout-components";
import '../styles/style.css'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
        },
        imageList: {},
        imageListItem: {
        cursor: "pointer"
        },
        title: {},
        img: {
        display: "block",
        width: "50%",
        margin: "auto",
        },
        titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
        }
    })
);

const SelectSourcePage = () => {
    const [dataStores, setDataStores] = useState<DataStore[]>([]);
    const [favIndex, setFavIndex] = useState<number[]>([]);
    const classes = useStyles();
    const navigate = useNavigate()

    useEffect(() => {
        async function init() {
            await appStoreService.updateDataStores();
            setDataStores(appStoreService.dataStores);
        }
        init();
    }, []);

    const topbarLeftButton: TopbarBackButton = {
        type: "back",
        onClick: () => navigate("/")
};


    const getImageUrl = (storeName: string) => {
        return `/images/${storeName.toLowerCase().split(" ").join("-")}-logo.png`;
    };

    const toggleFavIndex = (index: number) => {
        if (favIndex.indexOf(index) === -1) {
        setFavIndex([index, ...favIndex]);
        } else {
        const newIndexes = favIndex.filter((i) => i !== index);
        setFavIndex(newIndexes);
        }
    };

    const handleImageTileClick = (storeName: string) => {
        console.log("Clicked on: " + storeName);
        navigate(`/SelectTablePage/${storeName}`);
    };

    const favSources = useMemo(() => dataStores.filter((source: DataStore) =>
        favIndex.includes(source.id)
    ), [dataStores, favIndex]);
    const unfavSources = useMemo(() => dataStores.filter(
        (source: DataStore) => !favIndex.includes(source.id)
    ), [dataStores, favIndex]);
    const sortedSources: DataStore[] = useMemo(() => favSources.concat(unfavSources), [favSources, unfavSources]);
    

    return (
        <PageContainer >
            <ApplicationBar />
            <FixedTopBar title="Select a source." leftButton={topbarLeftButton} />
                {dataStores.length < 1 ? (
                <Box className="text-center" marginTop="30px">
                    <LoadingAnimation />
                </Box>
                ) : (
                <>
                    <FixedMiddleBodyWithVerticalScroll>
                    <Typography variant="body1" className="select-source-text">
                        Below is a list of sources you have connected. Please choose the
                        data source that you'd like to import data from.
                    </Typography>

                    <div className={classes.root}>
                        <ImageList className={classes.imageList} cols={2}>
                            {sortedSources.map((store: DataStore) => (
                                <ImageListItem className={classes.imageListItem} key={store.id}>
                                    <div onClick={() => handleImageTileClick(store.name)}>
                                        <img
                                            className={classes.img}
                                            src={getImageUrl(store.name)}
                                            alt={store.name}
                                        />
                                    </div>
                                        <ImageListItemBar
                                        title={store.name}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title
                                        }}
                                        actionIcon={
                                            <IconButton
                                            onClick={() => toggleFavIndex(store.id)}
                                            aria-label={`star ${store.name}`}
                                            >
                                            {favIndex.includes(store.id) ? (
                                                <FavoriteIcon className={classes.title} />
                                            ) : (
                                                <FavoriteBorderIcon className={classes.title} />
                                            )}
                                            </IconButton>
                                        }
                                        position="bottom"
                                        actionPosition="right"
                                        />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                    </FixedMiddleBodyWithVerticalScroll>
                </>
            )}
        </PageContainer>

    );

}

export default SelectSourcePage