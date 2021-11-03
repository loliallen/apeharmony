import { Grid, Typography } from '@mui/material'
import { Author, Video } from './Author'
import data from "./data.json"
import { IAuthor } from './interfaces'

export const Authors = () => {
    return (
        <div>
            <Grid container spacing={3} justifyContent="center">
                <Author {...data.authors[0]}/>
            </Grid>
            <Typography variant="h5" color="white" align="center" sx={{ marginBottom: "1rem", textTransform: "uppercase" }}>Ape harmony team</Typography>
            <Grid container spacing={3} justifyContent="center">
                {data.authors.slice(1).map((author: IAuthor, i) => {
                    return <Author key={i} {...author} />
                })}
            </Grid>
        </div>
    )
}
