import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid,
} from '@mui/material'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getObjCheckTickers } from '../../../utils'

export const InputTickers: React.FC = (): JSX.Element => {
    const { data } = useLoaderData() as AxiosResponse<string[]>
    const [checkData, setCheckData] = useState(getObjCheckTickers(data)) // object with all the boolean values for the checkboxes
    const [filteredKeys, setFilteredKeys] = useState<string[]>() // array of filtered keys to map into checkboxes
    const termState = useAppSelector((state) => state.tickers.searchTerm)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked,
        }))
    }

    useEffect(() => {
        if (termState.toUpperCase() !== '') {
            setFilteredKeys(
                Object.keys(checkData).filter((key) =>
                    key.includes(termState.toUpperCase())
                )
            )
        } else {
            setFilteredKeys(data)
        }
    }, [termState])

    console.log(checkData)

    return (
        <FormControl
            sx={{ margin: '0px', padding: '0px' }}
            variant="standard"
            color="primary"
            component="fieldset"
        >
            <Grid container>
                {filteredKeys &&
                    filteredKeys.sort().map((key: string) => {
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
                                                checked={checkData[key]}
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
