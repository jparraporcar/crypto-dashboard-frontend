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
import { signup } from '../../../app/slices/authSlice'
import { useAppSelector } from '../../../app/hooks'
import { setSnackbarCustom } from '../../../app/slices/layoutSlice'
import { useNavigate } from 'react-router-dom'

const userSchema = z
    .object({
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
        passwordConf: z
            .string()
            .min(8, {
                message: 'Minimum 8 letters/numbers and 1 special character',
            })
            .regex(/([A-Za-z0-9]+)([^A-Za-z0-9])/, {
                message: 'Minimum 8 letters/numbers and 1 special character',
            }),
    })
    .refine((data) => data.password === data.passwordConf, {
        message: "Passwords don't match",
        path: ['passwordConf'],
    })

type TUserSchema = z.infer<typeof userSchema>

export const InputRegistration: React.FC = (): JSX.Element => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const snackbarCustomState = useAppSelector((state) => state.layout.snackbar)

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
            passwordConf: '',
        },
        resolver: zodResolver(userSchema),
    })

    const onSubmit: SubmitHandler<TUserSchema> = async (data) => {
        if (Object.keys(errors).length === 0) {
            try {
                const registerResponse = (await axios.post(
                    'https://jxd8645qp7.execute-api.ap-northeast-1.amazonaws.com/dev/registerUser',
                    data
                )) as any
                console.log(registerResponse)
                if (registerResponse.data === 'USER_REGISTERED') {
                    //TODO Add a personalized message
                    dispatch(
                        setSnackbarCustom({
                            ...snackbarCustomState,
                            isOpen: true,
                            message:
                                'User has been signed up, now you can login',
                            severity: 'success',
                            autoHideDuration: 3000,
                        })
                    )
                    reset({
                        userName: '',
                        email: '',
                        password: '',
                        passwordConf: '',
                    })
                } else {
                    //TODO: pending to deal with this scenario
                    console.log(registerResponse)
                }
            } catch (err: any) {
                console.log('error', err)
                if (err.response.data.name === 'EXISTING_RESOURCE_ERROR') {
                    //TODO necessary to implement option for requesting new password
                    dispatch(
                        setSnackbarCustom({
                            ...snackbarCustomState,
                            isOpen: true,
                            message:
                                'The username and/or email already exist, request a new password or choose other credentials plz',
                            severity: 'info',
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
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
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
            <Controller
                name="passwordConf"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        label="Password confirmation"
                        variant="filled"
                        margin="dense"
                        error={errors.passwordConf ? true : false}
                        helperText={
                            errors.passwordConf
                                ? errors.passwordConf.message?.toString()
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
                }}
            >
                <Button
                    color="secondary"
                    size="large"
                    variant="outlined"
                    type="submit"
                >
                    Signup
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
                            passwordConf: '',
                        })
                    }
                >
                    Reset
                </Button>
            </Box>
        </Box>
    )
}
