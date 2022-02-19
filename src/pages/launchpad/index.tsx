import Router from 'next/router'
import {Layout} from "../../containers/Layout";
import {Header} from "../../containers/Header";
import {Card, CardActions, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import {useETH} from "../../hooks/useETH";
import {MouseEventHandler, useEffect} from "react";

const LinkCard = ({ title, onClick }:{ title:string, onClick?: MouseEventHandler<HTMLDivElement> }) => (
    <Grid item style={{ width: "450px", cursor: "pointer"}}>
        <Card onClick={onClick}>
            <CardMedia/>
            <CardHeader title={title} titleTypographyProps={{align: "center"}}/>
        </Card>
    </Grid>
)


const Launchpad = () => {
    const handleClickItem = (path: string) => () => Router.push(`/launchpad/${path}`)

    return <Layout>
        <Header/>
        <Typography variant="h3" align="center" style={{marginTop: '1rem', marginBottom: "3rem"}}>
            Launchpad
        </Typography>
        <div className="grid_container">
            <div className="item">
                <Grid container spacing={3}>
                    <LinkCard onClick={handleClickItem('build')} title="Build you own Ape Monster!"/>
                    <LinkCard onClick={handleClickItem('submit')} title="Submit project or idea!"/>
                    <LinkCard onClick={handleClickItem('files')} title="Download assets!"/>
                </Grid>
            </div>
        </div>
    </Layout>
}

export default Launchpad