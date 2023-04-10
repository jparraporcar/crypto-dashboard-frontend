import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { InputLogin } from '../InputLogin/InputLogin'
import { InputRegistration } from '../InputRegistration/InputRegistration'

export const NavTabsWrapper: React.FC = (): JSX.Element => {
    const [value, setValue] = React.useState(0)
    const [credentialsTab, setCredentialsTab] = React.useState<string>('')
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                marginTop: '30px',
                marginBottom: '30px',
            }}
        >
            <Box sx={{ width: '100%', marginBottom: '25px' }}>
                <Tabs
                    variant="fullWidth"
                    textColor="secondary"
                    indicatorColor="secondary"
                    value={value}
                    onChange={handleChange}
                    aria-label="login and registration pages"
                >
                    <Tab
                        label="Signup"
                        onClick={() => setCredentialsTab('registration')}
                    />
                    <Tab
                        label="Login"
                        onClick={() => setCredentialsTab('login')}
                    />
                </Tabs>
            </Box>
            <Box>
                {credentialsTab === 'login' ? (
                    <InputLogin />
                ) : (
                    <InputRegistration />
                )}
            </Box>
        </Box>
    )
}
