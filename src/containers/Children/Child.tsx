import React from 'react'
import { Grid, Card, CardMedia, makeStyles } from "@material-ui/core"


const useStyles = makeStyles({
    card: {
        width: 200
    },
    media: {
        height: 200,
        border: "none",
        backgroundSize: "contain",
    },
},
{ name: "ChildStyles" }
)

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
