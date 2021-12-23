import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Author } from './Author'
import data from "./data.json"
import { IAuthor } from './interfaces'

export const Authors = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref}>
            <Grid container spacing={3} justifyContent="center">
                <Author author {...data.authors[0]}/>
            </Grid>
            <Typography variant="h5" color="white" align="center" sx={{ marginBottom: "1rem", textTransform: "uppercase" }}>Ape harmony team</Typography>
            <Grid container spacing={3} justifyContent="center">
                {data.authors.slice(1).map((author: IAuthor, i) => {
                    return <Author key={i} {...author} />
                })}
            </Grid>
        </div>
    )
})
