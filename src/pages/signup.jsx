import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { Typography, Grid, TextField, Button, CircularProgress, useTheme } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AppIcon from '../images/icon.png'
import { connect } from 'react-redux';
import { signupUser } from '../redux/actors/userActions';
import { useDispatch, useSelector } from "react-redux";

export const Signup = () => {
  const theme = useTheme()

  const navigation = useNavigate()
  const dispatch = useDispatch()

  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const handle = useRef()

  const uiState = useSelector((state) => state.UI)

  // const [ loading, setLoading ] = useState(false)
  // const [ error, setError ] = useState({
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   handle: '',
  //   general: ''
  // })

  function handleSubmit(e) {
    e.preventDefault()

      const newUserData = {
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
        handle: handle.current.value
      }

      dispatch(signupUser(newUserData, navigation))
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
              helperText={uiState.email}
              error={uiState.email ? true: false}
              fullWidth={true} />

            <TextField 
              id='password' 
              name='password' 
              type='password' 
              label='Password' 
              variant='standard'
              inputRef={password}
              helperText={uiState.password}
              error={uiState.password ? true: false}
              style={theme.textField}
              fullWidth={true} />

            <TextField
              id='confirmpassword' 
              name='confirmpassword' 
              type='password' 
              label='confirmPassword' 
              variant='standard'
              inputRef={confirmPassword}
              helperText={uiState.confirmPassword}
              error={uiState.confirmPassword ? true: false}
              style={theme.textField}
              fullWidth={true} /> 

            <TextField 
              id='handle' 
              name='handle' 
              type='text' 
              label='Handle' 
              variant='standard'
              inputRef={handle}
              helperText={uiState.handle}
              error={uiState.handle ? true: false}
              style={theme.textField}
              fullWidth={true} />

            {uiState.general && (
              <Typography variant="body2" style={theme.customError}>
                {uiState.general}
              </Typography>
            )}

            <Button 
              type='submit' 
              variant='contained' 
              color='primary' 
              style={theme.button}
              disabled={uiState.loading}
            >
              Signup
              {uiState.loading && 
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

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(Signup)