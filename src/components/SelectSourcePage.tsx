import React from 'react';
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Box, ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";
import ApplicationBar from './ApplicationBar'
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { Alert } from '@mui/material'
import { TitlebarGridList } from "./DataSources";
import { LoadingAnimation } from "./LoadingAnimation"
import appStoreService from '../AppState';

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
        imageList: {},
        imageListItem: {
        cursor: "pointer"
        },
        title: {},
        img: {
        display: "block",
        width: "50%",
        margin: "auto",
        // marginTop: "5%"
        },
        titleBar: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
        }
    })
);

const SelectSourcePage = () => {

    const [favIdxs, setFavIdxs] = useState<number[]>([]);
    const [dataStores, setDataStores] = useState<DataStore[]>([]);
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
        console.log("Clicked on: " + storeName);
        navigate(`/SelectTablePage/${storeName}`);
    };

    const favSources = useMemo(() => dataStores.filter((source: DataStore) =>
        favIdxs.includes(source.id)
    ), [dataStores, favIdxs]);
    const unfavSources = useMemo(() => dataStores.filter(
        (source: DataStore) => !favIdxs.includes(source.id)
    ), [dataStores, favIdxs]);
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
                        <div onClick={() => handleTileClick(store.name)}>
                            <img
                                className={classes.img}
                                src={getImgUrl(store.name)}
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







//     const navigate = useNavigate()
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [dataSources, setDataSources] = useState<DataSource[]>([]);


//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFwcGxpY2FudEBhaXJib3hyLmNvbSIsImlhdCI6MTY2NzAzODQ3MSwiZXhwIjoxNjY3MDQwMjcxfQ.euHLtpRdAQZdcFGS2eTC4_bC17q1wk9VyPlrM1-na6o"


//     const fetchSources = () => {
//         setIsLoading(true);
//         fetch("https://api.airboxr.com/data/dataSources", {
//         method: "GET",
//         headers: new Headers({
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         }),
//         })
//         .then((response) => response.json())
//         .then(
//             (response) => {
                
//             setIsLoaded(true);
//             setIsLoading(false);
//             if (response.statusCode) {        
//                 setError(response.message);
//             } else {
//                     response.push({ id: 13, name: "MailChimp", tables: response.map(({id, title} : { id: string | number; title: string}) => {
//                         id
//                         title
//                         // isIndented: this.isIndented(title)

//                         // response.push({ id: response.id, name: response, title: "", tables: response.map(({id, title} : { id: string | number; title: string}) => {
//                         //     id
//                         //     title
//                         //     console.log(title)
                        
//                     })
//                 });
                    
//             response.forEach((source: DataSource) => (source.isFavorited = false));
//             setDataSources(response);
//             console.log(setDataSources)
//             }
//         },
//         )
//     }


//     useEffect(() => {
//         fetchSources()
//     }, [])


//     const topbarLeftButton: TopbarBackButton = {
//         type: "back",
//         onClick: () => navigate("/")
// };




//     return (
//         <PageContainer>
//             <ApplicationBar  />  
//             <FixedTopBar title="Select a source." leftButton={topbarLeftButton} />
//             <FixedMiddleBodyWithVerticalScroll>
//                     <Typography variant="body1" className="select-source-text">
//                         Below is a list of the sources you have connected. Please choose the data source you would like to import data from.
//                     </Typography>
                    

//                     {isLoading ? (
//             <LoadingAnimation />
//             ) : error ? (
//             <Alert severity="error">Error! Please check if your token has expired.</Alert>
//             ) : (
//             <TitlebarGridList datasource={dataSources} isLoaded={isLoaded} />
//             )}
//         </FixedMiddleBodyWithVerticalScroll>

//                     </PageContainer>
//     )

// }
        

export default SelectSourcePage