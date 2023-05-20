import React, { useEffect } from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
// import { useAppDispatch,  } from './store'
// import { RequestStatusType } from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { Menu } from '@mui/icons-material';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { Login2 } from '../features/Login/Login2'
// import { logoutTC } from '../features/Login/auth-reducer'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { getMe, logout } from '../features/Login/auth-slice'
import { useAppDispatch, useAppSelector } from './store_rtk'
import { RequestStatusType } from './app-slice';


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [])

    if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>}

                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistsList />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/login2' element={<Login2 />} />
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path='*' element={<Navigate to={'/404'} />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
