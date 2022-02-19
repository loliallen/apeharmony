import {FormControl, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import styles from "./builder.module.scss";
import React from "react";

type Props = {
    title: string
    value: string
    setValue: (value: string) => void
    values: string[]
}

export const TraitSelect = ({title, value = "_", setValue, values}: Props) => {
    return<FormControl>
        <Typography id={`${title}-label`}>{title}</Typography>
        <Select
            labelId={`${title}-label`}
            color="primary"
            className={value==="_" ? styles.select_none : styles.select}
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value as string)}
        >
            {values.map(v =>
                <MenuItem key={v} className={styles.menu} value={v}>{v}</MenuItem>
            )}
            <MenuItem className={styles.menu_none} value="_">None</MenuItem>
        </Select>
    </FormControl>
}