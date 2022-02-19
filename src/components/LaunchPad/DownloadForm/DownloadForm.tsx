import {LINKS} from "./helper";
import {Button, Typography} from "@material-ui/core";
import styles from './download.module.scss'
import {StyledButton} from "../../../containers/StyledButton";

export const DownloadForm = () => {

    return <div className={styles.form}>
        {Object.keys(LINKS).map(k => <a href={LINKS[k]} download style={{textDecoration: "none"}} key={k}>
                <Typography className={styles.title}>{k}</Typography>
                <StyledButton className={styles.button} color="primary" bordered>Download</StyledButton>
            </a>
        )}
    </div>
}