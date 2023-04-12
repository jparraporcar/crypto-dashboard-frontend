import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Box, InputBase } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setSearchTerm } from '../../../app/slices/tickersSlice'

export const SearchBar: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const tickersState = useAppSelector((state) => state.tickers)

    const onChangeHandler = (event: any) => {
        dispatch(setSearchTerm(event.currentTarget.value))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '200px' }}>
            <Box
                sx={{
                    marginRight: '10px',
                    marginLeft: '50px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <SearchIcon />
            </Box>
            <Box>
                <InputBase
                    value={tickersState.searchTerm}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={onChangeHandler}
                />
            </Box>
        </Box>
    )
}
