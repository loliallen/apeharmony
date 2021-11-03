import { Grid, Card, CardMedia } from '@mui/material'
import { useStyles } from './style'
import clsx from "clsx"
import './style.css'
import { useMobile } from '../../hooks/useMobile'

type Props = {
    male: string
    female: string
    child: string
}
export const Body:React.FC<Props> = ({male, female, child}) => {
    const isMobile = useMobile()
    const classes = useStyles()
    return (
        <div style={{ paddingTop: "12vh", paddingBottom: 40, }}>
            <Grid container style={{ justifyContent: "center" }} spacing={isMobile ? 2 : 8} alignItems="center">
                {isMobile && <Grid item>
                    <Card className={clsx(classes.main_card, "d2")} elevation={0} id="animated">
                        <CardMedia className={classes.main_card_media} image={child} />
                    </Card>
                </Grid>}
                <Grid item>
                    <Card className={clsx(classes.card, "d1")} elevation={0} id="animated">
                        <CardMedia className={classes.card_media} image={male} />
                    </Card>
                </Grid>
                {!isMobile && <Grid item>
                    <Card className={clsx(classes.main_card, "d2")} elevation={0} id="animated">
                        <CardMedia className={classes.main_card_media} image={child} />
                    </Card>
                </Grid>}
                <Grid item >
                    <Card className={clsx(classes.card, "d3")} elevation={0} id="animated">
                        <CardMedia className={classes.card_media} image={female} />
                    </Card>
                </Grid>
            </Grid>
        </div>

    )
}
