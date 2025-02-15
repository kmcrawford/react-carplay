import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import PhoneIcon from '@mui/icons-material/Phone'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import CameraIcon from '@mui/icons-material/Camera'
import { Link, useLocation } from 'react-router-dom'
import ExitToApp from '@mui/icons-material/ExitToApp'
import { useStatusStore } from '../store/store'

export default function Nav({ receivingVideo, settings }) {
  const [value, setValue] = React.useState(0)
  const [isPlugged] = useStatusStore((state) => [state.isPlugged])
  const { pathname } = useLocation()
  React.useEffect(() => {
    switch (pathname) {
      case '/':
        setValue(0)
        break
      case '/info':
        setValue(1)
        break
      case '/settings':
        setValue(2)
        break
      case '/camera':
        setValue(3)
        break
      default:
        setValue(0)
    }
  }, [pathname, setValue])

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const quit = () => {
    window.api.quit()
  }

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
      style={{ backgroundColor: 'black', color: 'white' }}
      centered
      sx={pathname === '/' && isPlugged ? { minHeight: '0px', height: '0px' } : {}}
    >
      <Tab icon={<PhoneIcon />} to={'/'} component={Link} sx={{ color: 'white' }}/>
      <Tab icon={<InfoIcon />} to={'/info'} component={Link} sx={{ color: 'white' }}/>
      <Tab icon={<SettingsIcon />} to={'/settings'} component={Link} sx={{ color: 'white' }}/>

      {settings?.camera !== '' ? (
        <Tab icon={<CameraIcon />} to={'/camera'} component={Link} sx={{ color: 'white' }}/>
      ) : null}
      <Tab icon={<ExitToApp />} onClick={() => quit()} sx={{ color: 'white' }}/>
    </Tabs>
  )
}
