import Router from 'next/router'
import {Layout} from "../../containers/Layout";
import {Header} from "../../containers/Header";
import {Button, Typography} from "@material-ui/core";
import {SubmitForm} from "../../components/LaunchPad";
import {ArrowBack} from "@material-ui/icons";
import styles from '../../styles/launchpad.module.scss'

const LaunchpadSubmit = () => {
    return <Layout>
        <Header/>
        <div className={styles.back_container}>
            <Button
                color="secondary"
                startIcon={<ArrowBack />}
                onClick={()=>Router.push('/launchpad')}
            >Back</Button>
        </div>
        <Typography variant="h4" align="center" style={{marginTop: '1rem'}}>
            Submit your project or idea for the site!
        </Typography>
        <SubmitForm />
    </Layout>
}

export default LaunchpadSubmit