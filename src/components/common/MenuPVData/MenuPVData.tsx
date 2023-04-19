import { SxProps, MenuItem } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
    ILayoutState,
    setChartView,
    setEvolSymbol,
} from '../../../app/slices/layoutSlice'
import React from 'react'

const selectedStyle: SxProps = {
    color: 'white',
}

export const MenuPVData: React.FC = () => {
    const chartViewState = useAppSelector((state) => state.layout.chartView)
    const dispatch = useAppDispatch()
    const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
        dispatch(
            setChartView({
                ...chartViewState,
                [event.currentTarget.id]:
                    !chartViewState[
                        event.currentTarget
                            .id as keyof ILayoutState['chartView']
                    ],
            })
        )
        dispatch(
            setEvolSymbol({
                chartTitle: '',
                chartSymbol: '',
                chartIndex: undefined,
            })
        )
    }

    return (
        <>
            <MenuItem
                id="multipleOfVolume"
                onClick={handleMenuItemClick}
                sx={chartViewState.multipleOfVolume ? selectedStyle : {}}
            >
                Multiple of volume
            </MenuItem>
            <MenuItem
                id="multipleOfPrice"
                onClick={handleMenuItemClick}
                sx={chartViewState.multipleOfPrice ? selectedStyle : {}}
            >
                Returns
            </MenuItem>
            <MenuItem
                id="multipleOfVolumeAvg"
                onClick={handleMenuItemClick}
                sx={chartViewState.multipleOfVolumeAvg ? selectedStyle : {}}
            >
                Multiple of volume average
            </MenuItem>
            <MenuItem
                id="multipleOfPriceAvg"
                onClick={handleMenuItemClick}
                sx={chartViewState.multipleOfPriceAvg ? selectedStyle : {}}
            >
                Average returns
            </MenuItem>
            <MenuItem
                id="multipleOfVolumeRocAccum"
                onClick={handleMenuItemClick}
                sx={
                    chartViewState.multipleOfVolumeRocAccum ? selectedStyle : {}
                }
            >
                Accum roc of volume multiple
            </MenuItem>
            <MenuItem
                id="multipleOfPriceRocAccum"
                onClick={handleMenuItemClick}
                sx={chartViewState.multipleOfPriceRocAccum ? selectedStyle : {}}
            >
                Accum roc of returns
            </MenuItem>
        </>
    )
}
