import { AppBar, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'

interface Props {
  themeMode: boolean;
  handleTheme: () => void;
}

export default function Header({themeMode, handleTheme}: Props) {
  return (
    <AppBar position='static' sx={{mb: 4}}>
        <Toolbar>
            <Typography variant='h6'>
                E-COMMERCE
            </Typography>
            <Switch checked={themeMode} onChange={handleTheme}/>
        </Toolbar>
    </AppBar>
  )
}
