import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { Typography, Grid, TextField, Button, CircularProgress, useTheme } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AppIcon from '../images/icon.png'
import axios from '../contexts/axios';
import { requests } from '../contexts/axiosRequest';

export const Signup = () => {
  const theme = useTheme()

  const navigation = useNavigate()

  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const handle = useRef()

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    general: ''
  })

  function handleSubmit(e) {
    e.preventDefault()

      setLoading(true)

      const newUserData = {
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
        handle: handle.current.value
      }

      axios.post(requests.fetchSignup, newUserData)
        .then((res) => {
          console.log('成功', res.data)
          // Token情報をローカル内に永久的に保持をする、削除する場合はremoveを使用する
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
            Signup
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

            <TextField
              id='confirmpassword' 
              name='confirmpassword' 
              type='password' 
              label='confirmPassword' 
              variant='standard'
              inputRef={confirmPassword}
              helperText={error.confirmPassword}
              error={error.confirmPassword ? true: false}
              style={theme.textField}
              fullWidth={true} /> 

            <TextField 
              id='handle' 
              name='handle' 
              type='text' 
              label='Handle' 
              variant='standard'
              inputRef={handle}
              helperText={error.handle}
              error={error.handle ? true: false}
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
              Signup
              {loading && 
                <CircularProgress size={30} style={theme.progress} />
              }
            </Button>

            <br />

            <small>already have an account ? log in <Link to="/login">here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </>
  )
}

// 何のために使用しているのか
Signup.propTypes = {
  classes: PropTypes.object.isRequired
}