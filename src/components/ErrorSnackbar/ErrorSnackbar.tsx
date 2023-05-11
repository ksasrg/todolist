import React, { useState, useEffect, useLayoutEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { ErrorType, setAppErrorAC } from '../../app/app-reducer'
import { AppRootStateType } from '../../app/store'
import { useDispatch } from 'react-redux'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const errorApp = useSelector<AppRootStateType, ErrorType>(state => state.app.error)
    const dispatch = useDispatch()
    console.log('ErrorSnackbar render');
    

    useEffect(() => {
        if (errorApp) {
            setError(errorApp)
            setOpen(true)
        } 
    }, [errorApp])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        dispatch(setAppErrorAC(null))
    }
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}