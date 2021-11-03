import { Alert, AlertColor, Snackbar } from '@mui/material'
import React, { useContext, useState } from 'react'

interface IAlert {
    message: string
    severity: AlertColor
    open: boolean
}

interface IAlertContext {
    alert: IAlert
    openAlert?: OpenAlertFn
    closeAlert?: () => void
}

type OpenAlertFn = (message: string, severity?: AlertColor) => void

export const AlertContext = React.createContext<IAlertContext>({
    alert: {
        message: "",
        severity: "info",
        open: false
    }
})

export const AlertProvider: React.FC = ({ children }) => {
    const [alert, setAlert] = useState<IAlert>({
        message: "",
        severity: "info",
        open: false
    })
    const openAlert: OpenAlertFn = (message, severity) => {
        setAlert({ message, severity: severity || "info", open: true })
    }
    const closeAlert = () => {
        setAlert(p => ({ ...p, open: false }))
    }
    return <AlertContext.Provider value={{ alert, openAlert, closeAlert }}>
        <Snackbar open={alert.open} onClose={closeAlert}>
            <Alert severity={alert.severity} onClose={closeAlert}>{alert.message}</Alert>
        </Snackbar>
        {children}
    </AlertContext.Provider>
}

export const useAlert = () => useContext(AlertContext)