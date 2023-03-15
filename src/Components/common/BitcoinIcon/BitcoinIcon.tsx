import React from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

export const BitcoinIcon: React.FC<SvgIconProps> = (
    props: SvgIconProps
): JSX.Element => {
    return (
        <SvgIcon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="65"
                filter="drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
            >
                <g transform="translate(3,3)">
                    <circle cx="31.7" cy="32.5" r="31.7" fill="#F5B300" />
                    <path
                        fill="#FFF"
                        d="M23.1 16.3c1.1.3 2.2.5 3.3.8 1.1.3 2.2.5 3.3.8.3.1.4 0 .5-.3.4-1.7.8-3.3 1.2-5 .1-.3.2-.4.5-.3 1 .3 1.9.5 2.9.7.3.1.3.2.2.4-.4 1.6-.8 3.3-1.2 4.9 0 .1 0 .2-.1.4.8.2 1.7.4 2.5.6.1 0 .2-.2.3-.3.3-1.3.6-2.5 1-3.8l.3-1.2c0-.2.1-.3.3-.2 1 .3 2 .5 3.1.8.1 0 .1.1.2.1-.3 1.3-.6 2.5-.9 3.7-.1.5-.2 1-.4 1.5-.1.3 0 .4.3.5l3.3 1.5c1 .6 1.9 1.4 2.6 2.4.9 1.5 1 3.1.6 4.7-.3 1.1-.7 2.1-1.5 2.9-.6.6-1.4 1-2.2 1.3-.1 0-.2.1-.4.1.4.3.8.5 1.2.8 1.2.9 2 2 2.4 3.4.2 1.1.1 2.3-.2 3.4-.4 1.4-.9 2.6-1.8 3.7-1.1 1.3-2.5 2-4.1 2.2-2.1.3-4.1.1-6.1-.2-.3-.1-.5 0-.6.3-.4 1.6-.8 3.3-1.2 4.9-.1.4-.1.5-.6.3-.9-.2-1.9-.5-2.8-.7-.3-.1-.3-.2-.2-.4.4-1.7.8-3.4 1.3-5 0-.2.1-.3-.1-.4-.8-.2-1.6-.4-2.5-.6-.2.9-.5 1.8-.7 2.7-.2.9-.5 1.8-.7 2.7-.1.2-.1.3-.4.2-1-.3-2-.5-3-.7-.3-.1-.3-.2-.2-.4.4-1.7.8-3.4 1.3-5 0-.1.1-.2.1-.4-2.3-.6-4.6-1.2-7-1.8.2-.4.3-.7.5-1.1.4-.9.8-1.8 1.1-2.6.1-.3.2-.3.5-.3.7.2 1.5.4 2.2.5.8.2 1.4-.2 1.5-.9 1.3-5.1 2.6-10.2 3.8-15.4.2-.8-.3-1.7-1.2-2-.9-.3-1.8-.5-2.6-.7-.2 0-.3-.1-.2-.3.3-1.1.6-2.3.9-3.4-.4.3-.4.3-.3.2zM28.2 41c.1 0 .2.1.2.1 1.6.4 3.3.9 5 1 1.2.1 2.3.1 3.4-.3 1.9-.6 2.7-3.1 1.6-4.7-.5-.8-1.3-1.3-2.1-1.8-1.8-1-3.9-1.4-5.9-1.8-.3-.1-.3 0-.4.3-.2 1-.5 1.9-.7 2.9-.4 1.4-.7 2.8-1.1 4.3zm8.4-10.2c.2 0 .7-.1 1.1-.2 1.9-.4 2.9-2.6 1.9-4.3-.5-.9-1.4-1.5-2.3-1.9-1.4-.6-2.8-.9-4.3-1.3-.3-.1-.4 0-.5.3-.5 2.1-1 4.1-1.6 6.2-.1.2 0 .3.2.4.4.1.7.2 1.1.3 1.5.2 2.8.5 4.4.5z"
                    />
                </g>
            </svg>
        </SvgIcon>
    )
}
