import { Box, Paper } from '@mui/material'
import React from 'react'

interface IPropsSimplePaper {
    content: JSX.Element
}

export const PaperCard: React.FC<IPropsSimplePaper> = ({
    content,
}): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
                '& > :not(style)': {
                    m: 1,
                    width: 500,
                    height: '100%',
                },
            }}
        >
            <Paper elevation={4} sx={{ backgroundColor: '#f7d759' }}>
                {content}
            </Paper>
        </Box>
    )
}
