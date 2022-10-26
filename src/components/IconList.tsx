    import * as React from 'react';
    import ImageList from '@mui/material/ImageList';
    import ImageListItem from '@mui/material/ImageListItem';
    import ImageListItemBar from '@mui/material/ImageListItemBar';
    import IconButton from '@mui/material/IconButton';
    import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
    import FavoriteIcon from '@mui/icons-material/Favorite';

    export default function IconList() {
    return (
        <ImageList sx={{ width: 500, height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
            
        </ImageListItem>
        {itemData.map((item) => (
            <ImageListItem key={item.img}>
            <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
            />
            <ImageListItemBar
                title={item.title}
                actionIcon={
                <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                >
                <FavoriteBorderIcon />
                </IconButton>
                }
            />
            </ImageListItem>
        ))}
        </ImageList>
    );
    }

    const itemData = [
    {
        img: 'src/public/mailchimp-logo.png',
        title: 'MailChimp'
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'HubSpot'
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Lever'
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Magento'
    }
    ];
