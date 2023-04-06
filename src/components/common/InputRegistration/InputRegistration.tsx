import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import axios from 'axios'

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
            // reset({
            //     userName: '',
            //     email: '',
            //     password: '',
            //     passwordConf: '',
            // })
        } else {
            return
        }

        const putUserResponse = await axios.post(
            'https://vlegsjd371.execute-api.ap-northeast-1.amazonaws.com/dev/registerUser',
            data
        )
        console.log(putUserResponse)
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
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                marginTop: '20px',
                marginBottom: '20px',
            }}
        >
            <Box>
                <Typography variant="h6" color="secondary" marginBottom="20px">
                    REGISTRATION FORM
                </Typography>
            </Box>
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
                            id="filled"
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
                            id="filled"
                            label="Email"
                            variant="filled"
                            margin="dense"
                            error={errors.email ? true : false}
                            helperText={
                                errors.email
                                    ? errors.email.message?.toString()
                                    : ''
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
                            id="filled"
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
                            id="filled"
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
                        justifyContent: 'space-evenly',
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
                        Accept
                    </Button>
                    <Button color="secondary" size="large" variant="outlined">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
