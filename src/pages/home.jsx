import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import Scream from '../components/screams/Scream';
import Profile from '../components/profile/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actors/dataActions';
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
    <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {resentScreamsMarkup}
        </Grid>

        <Grid item sm={4} xs={12} id="profile_item">
          <Profile />
        </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps, { getScreams })(Home)