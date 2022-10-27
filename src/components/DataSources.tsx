import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from '@material-ui/core'


//import images
import MailChimp from "../public/mailchimp-logo.png";
import FacebookAds from "../public/facebook-ads-logo.png";
import GoogleAnalytics from "../public/google-analytics-logo.png";
import GoogleAds from "../public/google-ads-logo.png";

    // export default function DataSources() {

    //     const navigate = useNavigate()

    //     const iconClick = () => {
    //         navigate('/SelectTablePage')
    //     }


    import {
        Typography,
        GridList,
        GridListTile,
} from "@material-ui/core";

        interface DataSource {
            id: number;
            name: string;
            uuid: string;
            isFavorited: boolean;
}
        interface TileProps {
            datasource: Array<DataSource>;
            isLoaded: boolean;
}
    


export const TitlebarGridList: React.FunctionComponent<TileProps> = (props) => {
        const { datasource, isLoaded } = props;
        console.log(datasource);
    
        const [datasources, setDatasources] = React.useState<DataSource[]>(
        datasource
        );
        const [search, setSearch] = React.useState("");
    
        React.useEffect(() => setDatasources(datasource), [datasource]);
    
        const renderDataSourceImage = (name: string) => {
        switch (name) {
            case "Facebook Ads":
            return FacebookAds;
            case "Google Ads":
            return GoogleAds;
            case "Google Analytics":
            return GoogleAnalytics;
            case "MailChimp":
            return MailChimp;
            // case "Google Sheets":
            // return GoogleSheets;
            // default:
            return "";
        }
        };
    
        const sort = (data: DataSource[]) =>
        data.sort(function (x, y) {
            return x.isFavorited === y.isFavorited ? 0 : x.isFavorited ? -1 : 1;
        });
    
        const useStyles = makeStyles(() => ({
        image: {
            height: "50%",
            width: "auto",
            position: "absolute",
            left: 0,
            right: 0,
            margin: "auto",
        },
        button: {
            position: "absolute",
            bottom: 0,
            right: 0,
            border: 0,
            color: "black"
        },
        search: {
            "border-radius": "5px",
            width: "100%",
            "box-shadow": "none",
            border: "1px solid lightgray",
            "margin-bottom": "30px",
        },
        name: {
            padding: "5px 0 0 5px"
        },
        container: {
            height: "100%",
            width: "100%"
        }
        }));
        const classes = useStyles();
    
        const toggle = (id: number) => {
        let newData = [...datasources];
        let index = datasources.findIndex((d) => d.id == id);
        let item = {
            ...newData[index],
            isFavorited: !newData[index].isFavorited,
        };
        newData[index] = item;
        sort(newData);
        setDatasources(newData);
        };
    
        let filteredData = datasources.filter((dataSource) =>
        dataSource.name.toLowerCase().includes(search.toLowerCase())
        );
    
        return (
        <div>
        
    
            {!isLoaded ? (
            <Typography align="center" variant="body1">
                Click the button below to fetch the data sources!
            </Typography>
            ) : filteredData.length == 0 ? (
            <Typography align="center" variant="body1">
                {`No data sources with '${search}' found`}
            </Typography>
            ) : (
            <div className={classes.container}>
                <GridList cellHeight={100} spacing={10}>
                {filteredData.map((tile) => (
                    <GridListTile key={tile.id}>
                    <Typography className={classes.name}>
                        {tile.name.toUpperCase()}
                    </Typography>
                    <img
                        className={classes.image}
                        src={renderDataSourceImage(tile.name)}
                        alt={tile.name}
                    />
                    <IconButton
                        className={classes.button}
                        onClick={() => toggle(tile.id)}
                    >
                        {tile.isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    </GridListTile>
                ))}
                </GridList>
            </div>
            )}
        </div>
        );
                }










    

    // return (
    //     <ImageList sx={{ width: 250, height: 200 }}>
    //     <ImageListItem key="Subheader" cols={2}>
            
    //     </ImageListItem>
    //     {itemData.map((item) => (
    //         <ImageListItem key={item.img}>
    //         <img
    //             src={`${item.img}?w=248&fit=crop&auto=format`}
    //             srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
    //             alt={item.title}
    //             // loading="lazy"
    //             onClick={iconClick}
    //         />
    //         <ImageListItemBar
    //             title={item.title}
    //             actionIcon={
    //             <IconButton
    //                 sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
    //                 aria-label={`info about ${item.title}`}
    //             >
    //             <FavoriteBorderIcon />
    //             </IconButton>
    //             }
    //         />
    //         </ImageListItem>
    //     ))}
    //     </ImageList>
    // );
    //}

    // const itemData = [
    //     {
    //         img: MailChimp,
    //         title: 'MailChimp',
            
    //     },
    //     {
    //         img: FacebookAds,
    //         title: 'Facebook Ads'
    //     },
    //     {
    //         img: GoogleAnalytics,
    //         title: 'Google Analytics'
    //     },
    //     {
    //         img: GoogleAds,
    //         title: 'Google Ads'
    //     }
    //     ];
