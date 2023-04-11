import { Box, Paper, SxProps } from '@mui/material'
import React from 'react'

interface IPropsSimplePaper {
    content: JSX.Element
    sxCustom: SxProps
}

export const PaperCard: React.FC<IPropsSimplePaper> = ({
    content,
    sxCustom,
}): JSX.Element => {
    return (
        <Box sx={sxCustom}>
            <Paper elevation={20} sx={{ backgroundColor: '#f7d759' }}>
                {content}
            </Paper>
        </Box>
    )
}
