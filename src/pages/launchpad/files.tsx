import {Layout} from "../../containers/Layout";
import {Header} from "../../containers/Header";
import {Button, Typography} from "@material-ui/core";
import styles from "../../styles/launchpad.module.scss";
import {ArrowBack} from "@material-ui/icons";
import Router from "next/router";
import {DownloadForm} from "../../components/LaunchPad/DownloadForm/DownloadForm";


const LaunchpadFiles = () => {

    return <Layout>
        <Header/>
        <div  className={styles.back_container}>
            <Button
                color="secondary"
                startIcon={<ArrowBack />}
                onClick={()=>Router.push('/launchpad')}
            >Back</Button>
        </div>
        <Typography variant='h5' align='center' style={{ marginTop: '1rem'}}>
            Download all assets
        </Typography>
        <DownloadForm/>
    </Layout>
}

export default LaunchpadFiles