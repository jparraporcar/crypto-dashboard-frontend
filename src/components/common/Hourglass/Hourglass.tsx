/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from 'classnames'
import styles from './style.module.css'
import React from 'react'

type Props = {
    /** hex color */
    color?: string
    /** size in pixel */
    size?: number
} & React.HTMLAttributes<HTMLDivElement>

export const Hourglass: React.FC = ({
    color = '#f7d759',
    size = 32,
}: Props): JSX.Element => {
    return (
        <div className={classNames(styles['lds-hourglass'])}>
            <div
                className={classNames(styles['lds-hourglass-after'])}
                //@ts-ignore
                style={{
                    background: color,
                    borderWidth: size,
                }}
            ></div>
        </div>
    )
}
