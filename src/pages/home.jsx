import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import Scream from '../components/Scream'
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actors/dataActions';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getScreams())
  },[])

  const { screams, loading } = useSelector((state) => state.data)
  
  const resentScreamsMarkup = !loading ? (
    screams.map((scream) => {
      return <Scream key={scream.screamId} scream={scream} />
    })
  ) : <p>Loading....</p>

  return (
    <>
    <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {resentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
    </Grid>
    </>
  )
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps, { getScreams })(Home)

// 正常に削除することはできるが、削除後の投稿が反映されていない