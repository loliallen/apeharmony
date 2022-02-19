import {Button, IconButton, TextField, TextFieldProps, Typography} from "@material-ui/core";
import React, {useState} from "react";
import styles from './submit.module.scss'
import {StyledButton} from "../../../containers/StyledButton";
import {useETH} from "../../../hooks/useETH";
import {sendData} from "./helper";

export const SubmitForm = () => {
    const { account, createSign } = useETH()

    const [email, setEmail] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const data = {
            wallet_address: account,
            data: {
                email,
                title,
                description
            },
            signature: ""
        }

        const signature = await createSign(data.data)
        data.signature = signature

        await sendData(data)
    }
    return <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.item}>
        <div>
        <Typography variant="h5">Email</Typography>
        <TextField variant="outlined" fullWidth placeholder="i.e. test@test.com" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
        <Typography variant="h5">Title</Typography>
        <TextField variant="outlined" fullWidth placeholder="i.e. My Super Monster" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        </div>
        <div className={styles.item}>
        <div>
        <Typography variant="h5">Project blurb & link</Typography>
        <TextField variant="outlined" fullWidth multiline placeholder="i.e. Marvel, but AHMC. https://twitter.com/mysupermonster"  value={description} onChange={e => setDescription(e.target.value)}/>
        </div>
        </div>
        <div>
        <StyledButton
        variant="contained"
        color="inherit"
        type="submit"
        bordered
        style={{backgroundColor: "hsla(0, 0%, 0%, 0.5)"}}
        >Send</StyledButton>
        </div>
        </form>
    }