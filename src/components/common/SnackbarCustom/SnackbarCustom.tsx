import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import { Alert } from '@mui/material'
import { ILayoutState } from '../../../app/slices/layoutSlice'

interface IPropsSnackbarCustom {
    snackbarCustomState: ILayoutState['snackbar']
    handleClose: () => void
}

export const SnackbarCustom: React.FC<IPropsSnackbarCustom> = (
    props
): JSX.Element => {
    return (
        <div>
            <Snackbar
                autoHideDuration={props.snackbarCustomState.autoHideDuration}
                open={props.snackbarCustomState.isOpen}
                onClose={props.handleClose}
                TransitionComponent={Slide}
            >
                <Alert
                    onClose={props.handleClose}
                    severity={props.snackbarCustomState.severity}
                    sx={{ width: '100%' }}
                >
                    {props.snackbarCustomState.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
