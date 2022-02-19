import {Layout} from "../../containers/Layout";
import {Header} from "../../containers/Header";
import {Button, Typography} from "@material-ui/core";
import {Builder} from "../../components/LaunchPad/Builder/Bulder";
import {ArrowBack} from "@material-ui/icons";
import styles from "../../styles/launchpad.module.scss";
import Router from "next/router";


const BuildPage = () => {

    return <Layout>
        <Header/>
        <div  className={styles.back_container}>
            <Button
                color="secondary"
                startIcon={<ArrowBack />}
                onClick={()=>Router.push('/launchpad')}
            >Back</Button>
        </div>
        <Builder/>
    </Layout>
}
export default BuildPage