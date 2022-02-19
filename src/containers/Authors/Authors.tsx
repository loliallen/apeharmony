import {Grid, Typography} from '@material-ui/core'
import React from 'react'
import {Author} from './Author'
import data from "./data.json"
import {IAuthor} from './interfaces'
import styles from './authors.module.scss'

export const Authors = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className={styles.container}>
            <div className={styles.item}>
                <Grid container spacing={3} justifyContent="center">
                    <Author author {...data.authors[0]}/>
                </Grid>
            </div>
            <Typography variant="h5" align="center" style={{marginBottom: "1rem", textTransform: "uppercase"}}>Ape
                harmony team</Typography>
            <div className={styles.item}>
                <Grid container spacing={3} justifyContent="center">
                    {data.authors.slice(1).map((author: IAuthor, i) => {
                        return <Author key={i} {...author} />
                    })}
                </Grid>
            </div>
        </div>
    )
})
