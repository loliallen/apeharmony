import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Twitter } from '../Links'
import { IAuthor } from './interfaces'


const useStyles = makeStyles<Theme>(t => ({
    card: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "2rem",
        width: 350,
        backgroundColor: "transparent",
        color: "white",
        [t.breakpoints.down('sm')]: {
            width: 300,
        }
    },
    card_typography: {
        lineHeight: 1,
        minHeight: "5rem",
        [t.breakpoints.down('sm')]: {
            minHeight: "2rem",
        }
    },
    media: {
        height: 350,
        border: "none",
        backgroundSize: "contain",
    },

    linked_media: {
        height: 350,
        border: "none",
        backgroundSize: "contain",
    }
}))

type Props = IAuthor
export const Author: React.FC<Props> = ({
    nickname,
    avatar,
    description,
    twitter_link,
    children
}) => {
    const classes = useStyles()
    return (
        <Grid item>
            <Card className={classes.card} >
                <CardHeader title={nickname} titleTypographyProps={{ variant: "h6", align: "center", className: classes.card_typography }} />
                {twitter_link ?
                    <a href={twitter_link} target="_blank" rel="noreferrer">
                        <CardMedia className={classes.media} image={avatar} />
                    </a>
                    :
                    <CardMedia className={classes.media} image={avatar} />
                }
                {(description || children) && <CardContent>
                    <Typography variant="subtitle1" align="center" sx={{ lineHeight: 1.1 }}>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </Typography>
                    {children}
                </CardContent>}
            </Card>
        </Grid>
    )
}

type VideoProps = {
    image: string,
    link: string
}

export const Video: React.FC<VideoProps> = ({ image, link }) => {
    const classes = useStyles()
    return (
        <Card className={classes.card} >
            <a href={link} target="_blank">
                <CardMedia className={classes.media} image={image} />
            </a>
        </Card>
    )
}