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

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked,
        }))
    }

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllBoxesChecked(event.target.checked)
        setCheckData((prevState: { [key: string]: boolean }) => {
            const newState = { ...prevState }
            const propNames = Object.keys(newState) // get an array of the property names
            for (let i = 0; i < propNames.length; i++) {
                const propName = propNames[i]
                newState[propName] = event.target.checked // update the value of the property
            }
            return newState
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
                symbolsListSelected: Object.keys(checkData).filter(
                    (key: string) => checkData[key] === true
                ),
                pairsListSelected: Object.keys(checkData)
                    .filter((key: string) => checkData[key] === true)
                    .map((cleanName) => cleanName + 'USDT'),
            })
        )
    }, [checkData, allBoxesChecked])

    useEffect(() => {
        // if any selection has taken place store the value
        // this condition avoid the data being cleared when coming from another route and the state initializes
        // with this logic, the last token deselected by the user remains in localStorage
        if (Object.keys(checkData).find((key) => checkData[key] !== false)) {
            localStorage.setItem(
                'symbolsListSelected',
                JSON.stringify(
                    Object.keys(checkData).filter(
                        (key: string) => checkData[key] === true
                    )
                )
            )

            localStorage.setItem(
                'pairsListSelected',
                JSON.stringify(
                    Object.keys(checkData)
                        .filter((key: string) => checkData[key] === true)
                        .map((cleanName) => cleanName + 'USDT')
                )
            )
        }
    }, [checkData])
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
                                                        onChange={handleSelect}
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
