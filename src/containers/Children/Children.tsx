import { Grid } from '@mui/material'
import React from 'react'
import { Child } from './Child'

export const Children = () => {
    return (
        <div
            style={{ marginBottom: "3rem"}}
        >
            <Grid container spacing={4} justifyContent="center">
                {Array.from(Array(5).keys()).map(i => <Child src={`/children/${i + 1}.png`} />)}
            </Grid>
        </div>
    )
}
