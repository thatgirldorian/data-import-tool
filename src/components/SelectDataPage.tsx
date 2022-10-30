import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Box, GridList,
    GridListTile,
    GridListTileBar } from "@material-ui/core";
import ApplicationBar from './ApplicationBar'
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AppContext } from '../AppState'

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



//export to types.ts later

type DataStore = {
    id: number;
    name: string;
    tables: DataSourceTable[];
};

type DataSourceTable = {
    id: number;
    title: string;
    isIndented: boolean;
};



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
        },
        gridList: {},
        gridListTile: {
        cursor: "pointer"
        },
        title: {},
        img: {
        display: "block",
        width: "50%",
        margin: "auto",
        marginTop: "15%"
        },
        titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
        }
    })
);


const SelectDataPage = () => {
    const { dataStores, updateDataStores } = useContext(AppContext);
    const [favIdxs, setFavIdxs] = useState<number[]>([]);
    const classes = useStyles();
    const navigate = useNavigate()

    useEffect(() => {
        if (dataStores.length < 1) {
        updateDataStores();
        }
    }, []);

    const topbarLeftButton: TopbarBackButton = {
        type: "back",
        onClick: () => navigate("/")
};


    const getImgUrl = (storeName: string) => {
        return `/images/${storeName.toLowerCase().split(" ").join("-")}-logo.png`;
    };

    const toggleFavIdx = (idx: number) => {
        if (favIdxs.indexOf(idx) === -1) {
        setFavIdxs([idx, ...favIdxs]);
        } else {
        const newIdxs = favIdxs.filter((i) => i !== idx);
        setFavIdxs(newIdxs);
        }
    };

    const handleTileClick = (storeName: string) => {
        //fix navigate.push, not working :(
        navigate(`/SelectTablePage/${storeName}`);
    };

    const favSources = dataStores.filter((source: DataStore) =>
        favIdxs.includes(source.id)
    );
    const unfavSources = dataStores.filter(
        (source: DataStore) => !favIdxs.includes(source.id)
    );
    const sortedSources: DataStore[] = favSources.concat(unfavSources);
    

    return (
        <PageContainer >
        <FixedTopBar title="Select a source." leftButton={topbarLeftButton} />
            {dataStores.length < 1 ? (
            <Box className="text-center" marginTop="30px">
                {/* <LoadingAnimation /> */}
            </Box>
            ) : (
            <>
                <div>
                <p>
                    Below is a list of sources you have connected. Please choose the
                    data source that you'd like to import data from.
                </p>
                </div>

                

                <div className={classes.root}>
                <GridList className={classes.gridList} cols={2}>
                    {sortedSources.map((store: DataStore) => (
                    <GridListTile className={classes.gridListTile} key={store.id}>
                        <div onClick={() => handleTileClick(store.name)}>
                        <img
                            className={classes.img}
                            src={getImgUrl(store.name)}
                            alt={store.name}
                        />
                        </div>
                        <GridListTileBar
                        title={store.name}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title
                        }}
                        actionIcon={
                            <IconButton
                            onClick={() => toggleFavIdx(store.id)}
                            aria-label={`star ${store.name}`}
                            >
                            {favIdxs.includes(store.id) ? (
                                <FavoriteIcon className={classes.title} />
                            ) : (
                                <FavoriteBorderIcon className={classes.title} />
                            )}
                            </IconButton>
                        }
                        titlePosition="bottom"
                        actionPosition="right"
                        />
                    </GridListTile>
                    ))}
                </GridList>
                </div>
            </>
            )}
        </PageContainer>

    );

}

export default SelectDataPage