import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { Typography, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AppIcon from '../images/icon.png'
import axios from '../contexts/axios';
import { requests } from '../contexts/axiosRequest';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
}

export const Login = () => {
  const navigation = useNavigate()

  const email = useRef()
  const password = useRef()

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState()
  const [ emailError, setEmailError ] = useState()
  const [ passwordError, setPasswordError ] = useState()

  function handleSubmit(e) {
    e.preventDefault()

      setLoading(true)
      setError('')

      const userData = {
        email: email.current.value,
        password: password.current.value
      }

      axios.post(requests.fetchLogin, userData)
        .then((res) => {
          console.log('成功', res.data)
          navigation('/')
        })
        .catch((error) => {          
          setError(error.response.data.general)
          setEmailError(error.response.data.email)
          setPasswordError(error.response.data.password)
        })
        .finally(() => {
          setLoading(false)
        })
  }

  return (
    <>
      <Grid container style={styles.form}>
        <Grid item sm />
        <Grid item sm >
          <img src={AppIcon} alt='monkey' style={styles.image} />
          <Typography variant="h2" style={styles.pageTitle}>
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
              helperText={emailError}
              error={emailError ? true: false}
              fullWidth={true} />

            <TextField 
              id='password' 
              name='password' 
              type='password' 
              label='Password' 
              variant='standard'
              inputRef={password}
              helperText={passwordError}
              error={passwordError ? true: false}
              style={styles.textField}
              fullWidth={true} />

            {error && (
              <Typography variant="body2" style={styles.customError}>
                {error}
              </Typography>
            )}

            <Button 
              type='submit' 
              variant='contained' 
              color='primary' 
              style={styles.button}
              disabled={loading}
            >
              Login
              {loading && 
                <CircularProgress size={30} style={styles.progress} />
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