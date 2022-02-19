import { Grid } from '@material-ui/core'
import React from 'react'
import { Child } from './Child'
import styles from './children.module.scss'

export const Children = () => {
    return (
        <div className={styles.children_container}>
            <div
                className={styles.children}
            >
                <Grid container spacing={4} justifyContent="center">
                    {Array.from(Array(5).keys()).map(i => <Child src={`/children/${i + 1}.png`} />)}
                </Grid>
            </div>
        </div>
    )
}
