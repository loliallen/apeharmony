import { Grid, Card, CardMedia } from '@mui/material'
import { useStyles } from './style'
import clsx from "clsx"
import './style.css'
import { useMobile } from '../../hooks/useMobile'
import React, { useMemo } from 'react'

const animation_classes = ["d1", "d2", "d3", "d4", "d5"]

type Props = {
    srcs: string[]
    childIndex?: number
}
const BodyMemo: React.FC<Props> = ({ srcs, childIndex = -1 }) => {
    const isMobile = useMobile()
    const classes = useStyles()
    const child = srcs[childIndex]

    const randoms = useMemo(()=>srcs.map(() => Math.round(Math.random() * 4)), [])

    return (
        <div style={{ margin: "2rem 0" }}>
            <Grid container style={{ justifyContent: "center" }} spacing={isMobile ? 2 : 8} alignItems="center">
                {(isMobile && childIndex !== -1) && <Grid item>
                    <Card className={clsx(classes.main_card, "d2")} elevation={0} id="animated">
                        <CardMedia className={classes.main_card_media} image={child} />
                    </Card>
                </Grid>}
                {srcs.map((s, i) => {
                    const isChild = childIndex === i

                    if (isChild && isMobile)
                        return null
                    return <Grid item key={i}>
                        <Card className={clsx(isChild ? classes.main_card : classes.card, isChild ? "d2" : animation_classes[randoms[i]])} elevation={0} id="animated">
                            <CardMedia className={classes.card_media} image={s} />
                        </Card>
                    </Grid>
                })}
            </Grid>
        </div>
    )
}
export const Body = React.memo(BodyMemo)
export const BodyContainer: React.FC = (props) => <div {...props} style={{ paddingTop: "10vh", paddingBottom: 40, }} />