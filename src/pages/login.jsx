import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { Typography, Grid, TextField, Button, CircularProgress, useTheme } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AppIcon from '../images/icon.png'
import axios from '../contexts/axios';
import { requests } from '../contexts/axiosRequest';


export const Login = () => {
  const theme = useTheme()
  const email = useRef()
  const password = useRef()

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState({
    email: '',
    password: '',
    general: ''
  })

  const navigation = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

      setLoading(true)

      const userData = {
        email: email.current.value,
        password: password.current.value
      }

      axios.post(requests.fetchLogin, userData)
        .then((res) => {
          console.log('成功', res.data)
          localStorage.setItem('FBIdToken', `Token ${res.data.token}`)
          navigation('/')
        })
        .catch((error) => {        
          setError(error.response.data)
        })
        .finally(() => {
          setLoading(false)
        })
  }

  return (
    <>
      <Grid container style={theme.form}>
        <Grid item sm />
        <Grid item sm >
          <img src={AppIcon} alt='monkey' style={theme.image} />
          <Typography variant="h2" style={theme.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            {/* 不要な要素は削除する */}
            <TextField 
              id='email' 
              name='email' 
              type='email' 
              label='Email' 
              variant='standard'
              inputRef={email}
              helperText={error.email}
              error={error.email ? true: false}
              fullWidth={true} />

            <TextField 
              id='password' 
              name='password' 
              type='password' 
              label='Password' 
              variant='standard'
              inputRef={password}
              helperText={error.password}
              error={error.password ? true: false}
              style={theme.textField}
              fullWidth={true} />

            {error.general && (
              <Typography variant="body2" style={theme.customError}>
                {error.general}
              </Typography>
            )}

            <Button 
              type='submit' 
              variant='contained' 
              color='primary' 
              style={theme.button}
              disabled={loading}
            >
              Login
              {loading && 
                <CircularProgress size={30} style={theme.progress} />
              }
            </Button>

            <br />

            <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </>
  )
}

// 何のために使用しているのか
Login.propTypes = {
  classes: PropTypes.object.isRequired
}