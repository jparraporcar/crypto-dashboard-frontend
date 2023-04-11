import {
    Box,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Grid,
} from '@mui/material'
import { AxiosResponse } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const getArrayTickers = (data: string[]) => {
    const obj = {} as { [key: string]: boolean }
    data.forEach((tickerName) => {
        obj[tickerName] = false
    })
    return obj
}

export const InputSettings: React.FC = (): JSX.Element => {
    const { data } = useLoaderData() as AxiosResponse<string[]>
    const [checkState, setCheckState] = useState<{
        [key: string]: boolean
    }>(getArrayTickers(data))

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckState({
            ...checkState,
            [event.target.name]: event.target.checked,
        })
    }

    return (
        <FormControl
            sx={{ m: 3 }}
            variant="standard"
            color="primary"
            component="fieldset"
        >
            <Grid container>
                {Object.keys(checkState)
                    .sort()
                    .map((key: string) => {
                        return (
                            <Grid item key={key} sm={1}>
                                <FormGroup sx={{ width: '120px' }}>
                                    <FormControlLabel
                                        componentsProps={{
                                            typography: {
                                                sx: { fontSize: '12px' },
                                            },
                                        }}
                                        control={
                                            <Checkbox
                                                checked={checkState[key]}
                                                onChange={handleChange}
                                                name={key}
                                            />
                                        }
                                        label={key}
                                    />
                                </FormGroup>
                            </Grid>
                        )
                    })}
            </Grid>
        </FormControl>
    )
}
