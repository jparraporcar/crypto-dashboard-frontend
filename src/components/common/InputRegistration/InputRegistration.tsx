import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const userSchema = z
    .object({
        fullName: z
            .string()
            .min(5, {
                message: 'Only letters and minimum 5',
            })
            .regex(/^[a-zA-Z ]*$/, {
                message: 'Only letters',
            })
            .max(20, { message: 'Only letters and minimum 5' }),
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
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            fullName: '',
            userName: '',
            email: '',
            password: '',
            passwordConf: '',
        },
        resolver: zodResolver(userSchema),
    })

    const onSubmit: SubmitHandler<TUserSchema> = (data) => {
        console.log(errors)
        console.log(data)
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
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="filled"
                            label="Full name"
                            variant="filled"
                            margin="dense"
                            error={errors.fullName ? true : false}
                            helperText={
                                errors.fullName
                                    ? errors.fullName.message?.toString()
                                    : ''
                            }
                            sx={{ width: ' 320px' }}
                        />
                    )}
                />

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
                        />
                    )}
                />
                <Controller
                    name="passwordConf"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
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
