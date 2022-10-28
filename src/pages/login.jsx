import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, TextField, Button, CircularProgress, useTheme } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AppIcon from '../images/icon.png';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actors/userActions';
import { useDispatch, useSelector } from "react-redux";


export const Login = () => {
  const navigation = useNavigate()
  // Style theme
  const theme = useTheme()
  const email = useRef()
  const password = useRef()
  // UIState全取得:store/ui/loading(email/password/general)
  const uiState = useSelector((state) => state.UI)

  // Reduxの関数を使用するためにはdispatchが必要
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()

    const userData = {
      email: email.current.value,
      password: password.current.value
    }

    // Redux Actions
    dispatch(loginUser(userData, navigation))
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
              Login
              {uiState.loading && 
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

// 受け取ったデータが有効かどうか確認:無効な値がプロパティに与えられた場合、コンソールにアラートが出力
Login.propTypes = {
  // おそらくclassesは不要
  // classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

// 取得したいデータの抽出:抽出したデータを記述
const mapStateToProps = (state) => ({
  // User Info
  user: state.user,
  // Error Info
  UI: state.UI
})

// Action Dispatch:関数を入れる
const mapActionsToProps = ({
  loginUser
})

// Storeと接続する
export default connect(mapStateToProps, mapActionsToProps)(Login)