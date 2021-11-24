import { Grid, Card, CardMedia } from '@mui/material'
import { useStyles } from './style'
import clsx from "clsx"
import './style.css'
import { useMobile } from '../../hooks/useMobile'

const animation_classes = ["d1", "d2", "d3","d4","d5"]

type Props = {
    srcs: string[]
    childIndex?: number
}
export const Body: React.FC<Props> = ({ srcs, childIndex = -1 }) => {
    const isMobile = useMobile()
    const classes = useStyles()
    const child = srcs[childIndex]
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
                    const randomI = Math.round(Math.random() * 4)

                    if (isChild && isMobile)
                        return null
                    return <Grid item key={i}>
                        <Card className={clsx(isChild ? classes.main_card : classes.card, isChild ? "d2" : animation_classes[randomI])} elevation={0} id="animated">
                            <CardMedia className={classes.card_media} image={s} />
                        </Card>
                    </Grid>
                })}
            </Grid>
        </div>

    )
}

export const BodyContainer: React.FC = (props) => <div {...props} style={{ paddingTop: "10vh", paddingBottom: 40, }} />