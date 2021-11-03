import React from 'react'
import { Grid, Card, CardMedia } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    card: {
        width: 200
    },
    media: {
        height: 200,
        border: "none",
        backgroundSize: "contain",
    },
})

type Props = {
    src: string
}
export const Child:React.FC<Props> = ({src}) => {
    const classes = useStyles()
    return (
        <Grid item>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={src}/>
            </Card>
        </Grid>
    )
}
