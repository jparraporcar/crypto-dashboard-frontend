import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
} from '@mui/material'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setSettings } from '../../../app/slices/tickersSlice'
import { getObjCheckTickers } from '../../../utils'

export const InputTickers: React.FC = (): JSX.Element => {
    //TODO: How would this problem be approachhed with Redux?
    const { data } = useLoaderData() as AxiosResponse<string[]>
    const [checkData, setCheckData] = useState(getObjCheckTickers(data))
    const [filteredKeys, setFilteredKeys] = useState<string[]>() // array of filtered keys to map into checkboxes
    const [allBoxesChecked, setAllBoxesChecked] = useState<boolean>(false)
    const termState = useAppSelector((state) => state.tickers.searchTerm)
    const settingsState = useAppSelector((state) => state.tickers.settings)
    const dispatch = useAppDispatch()

    //TODO: minimum 5 tockens have to be chosen otherwise validation error at this point, since the format of the plots would look really
    // ugly with less tokens. Depending on the amount of tokens to be shown, the plot type could be change to donuts?, even let the user
    // chose between different types of plots

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked,
        }))
    }

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllBoxesChecked(event.target.checked)
        setCheckData((prevState: { [key: string]: boolean }) => {
            const propNames = Object.keys(prevState) // get an array of the property names
            for (let i = 0; i < propNames.length; i++) {
                const propName = propNames[i]
                prevState[propName] = event.target.checked // update the value of the property
            }
            return prevState
        })
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

    useEffect(() => {
        dispatch(
            setSettings({
                ...settingsState,
                tokensList: Object.keys(checkData).filter(
                    (key: string) => checkData[key] === true
                ),
            })
        )
    }, [checkData, allBoxesChecked])

    return (
        <Box>
            <Box>
                <FormControl
                    sx={{ margin: '0px', padding: '0px' }}
                    variant="standard"
                    color="primary"
                    component="div"
                >
                    <FormGroup sx={{ width: '140px' }}>
                        <FormControlLabel
                            componentsProps={{
                                typography: {
                                    sx: {
                                        fontSize: '18px',
                                    },
                                },
                            }}
                            control={
                                <Checkbox
                                    checked={allBoxesChecked}
                                    onChange={handleSelectAll}
                                    name="all"
                                />
                            }
                            label="Select all"
                        />
                    </FormGroup>
                </FormControl>
            </Box>
            <Box sx={{ width: '100%' }}>
                <FormControl
                    sx={{ margin: '0px', padding: '0px', width: '100%' }}
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
                                                        sx: {
                                                            fontSize: '12px',
                                                        },
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
            </Box>
        </Box>
    )
}
