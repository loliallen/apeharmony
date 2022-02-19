import { Button, ButtonGroup, makeStyles } from "@material-ui/core"
import React from 'react'


const useStyles = makeStyles({
    button: {
        backgroundColor: "hsla(0, 0%, 0%, 0.6)",
        marginBottom: "1rem"
    }
},
{ name: "MintButtonStyles" }
)

type RuleProps = {
    min: number
    max: number
}

type Props = {
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
    rule: RuleProps
}
export const MintButton:React.FC<Props> = ({
    value,
    setValue,
    rule
}) => {
    const classes = useStyles()

    const incriment = () => {
        setValue(p => (p >= rule.max) ? p : p + 1)
    }
    const decriment = () => {
        setValue(p => (p <= rule.min) ? rule.min : p - 1)
    }
    return (
        <ButtonGroup className={classes.button} variant="text" color="primary" aria-label="outlined primary button group" fullWidth>
            <Button onClick={decriment}>-</Button>
            <Button>{value}</Button>
            <Button onClick={incriment}>+</Button>
        </ButtonGroup>
    )
}
