import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from '../../../app/slices/authSlice'
import { setSnackbarCustom } from '../../../app/slices/layoutSlice'
import { useAppSelector } from '../../../app/hooks'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { loginApi } from '../../../env'

const loginSchema = z.object({
    userName: z
        .string()
        .regex(/[A-Za-z0-9]+/, {
            message: 'Only letters/numbers and minimum 5',
        })
        .min(5, { message: 'Only letters/numbers and minimum 5' })
        .max(15, { message: 'Maximum 15 characters' }),
    email: z.string().email(),
    password: z
        .string()
        .min(8, {
            message: 'Minimum 8 letters/numbers and 1 special character',
        })
        .regex(/([A-Za-z0-9]+)([^A-Za-z0-9])/, {
            message: 'Minimum 8 letters/numbers and 1 special character',
        }),
})

type TLoginSchema = z.infer<typeof loginSchema>

export const InputLogin: React.FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const snackbarCustomState = useAppSelector((state) => state.layout.snackbar)
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            userName: '',
            email: '',
            password: '',
        },
        resolver: zodResolver(loginSchema),
    })

    const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
        if (Object.keys(errors).length === 0) {
            try {
                const loginResponse = (await axios.post(
                    `${loginApi}`,
                    data
                )) as any
                if (loginResponse.data.message === 'USER_LOGGEDIN') {
                    const decoded = jwt_decode(loginResponse.data.token)
                    //TODO: Add personalized message
                    dispatch(
                        setSnackbarCustom({
                            ...snackbarCustomState,
                            isOpen: true,
                            message: 'User has been logged in',
                            severity: 'success',
                            autoHideDuration: 3000,
                        })
                    )
                    dispatch(setIsLoggedIn(true))
                    setTimeout(() => navigate('/settings'), 3000)
                } else {
                    //TODO: pending to deal with this scenario
                }
            } catch (err: any) {
                if (err.response.data.name === 'EXISTING_RESOURCE_ERROR') {
                    dispatch(
                        setSnackbarCustom({
                            ...snackbarCustomState,
                            isOpen: true,
                            message:
                                'The username does not exist, plz register first',
                            severity: 'info',
                            autoHideDuration: 3000,
                        })
                    )
                } else if (err.response.data.name === 'UNAUTHORIZED_ERROR') {
                    dispatch(
                        setSnackbarCustom({
                            ...snackbarCustomState,
                            isOpen: true,
                            message: 'The password introduced is incorrect',
                            severity: 'error',
                            autoHideDuration: 3000,
                        })
                    )
                } else {
                    dispatch(
                        setSnackbarCustom({
                            ...snackbarCustomState,
                            isOpen: true,
                            message: 'An unknown error ocurred plz try later',
                            severity: 'error',
                            autoHideDuration: 3000,
                        })
                    )
                }
            }
        } else {
            return
        }
    }

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    const endAdornmentProp = {
        endAdornment: (
            <InputAdornment
                position="end"
                sx={{
                    paddingRight: '8px',
                }}
            >
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        ),
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="on"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0px 15px',
            }}
        >
            <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Username"
                        variant="filled"
                        margin="dense"
                        error={errors.userName ? true : false}
                        helperText={
                            errors.userName
                                ? errors.userName.message?.toString()
                                : ''
                        }
                        sx={{ width: ' 320px' }}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        variant="filled"
                        margin="dense"
                        error={errors.email ? true : false}
                        helperText={
                            errors.email ? errors.email.message?.toString() : ''
                        }
                        sx={{ width: ' 320px' }}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        variant="filled"
                        margin="dense"
                        error={errors.password ? true : false}
                        helperText={
                            errors.password
                                ? errors.password.message?.toString()
                                : ''
                        }
                        sx={{ width: ' 320px' }}
                        InputProps={endAdornmentProp}
                    />
                )}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '320px',
                    marginTop: '25px',
                    marginBottom: '25px',
                }}
            >
                <Button
                    color="secondary"
                    size="large"
                    variant="outlined"
                    type="submit"
                >
                    Login
                </Button>
                <Button
                    color="secondary"
                    size="large"
                    variant="outlined"
                    onClick={() =>
                        reset({
                            userName: '',
                            email: '',
                            password: '',
                        })
                    }
                >
                    Reset
                </Button>
            </Box>
        </Box>
    )
}
