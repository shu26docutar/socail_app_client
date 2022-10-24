import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

// import contexts
import axios from '../contexts/axios';
import { requests } from '../contexts/axiosRequest';

import Scream from '../components/Scream'

export const Home = () => {
  const [axiosData, setAxiosData] = useState()

  useEffect(() => {
    axios.get(requests.fetchScream)
      .then((res) => {
        // console.log(res.data)
        setAxiosData({
          scream: res.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },[])

  const resentScreamsMarkup = axiosData ? (
    axiosData.scream.map((scream) => {
      // 選択された時にどの要素が選択されたかkeyを設定する必要がるので忘れない
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
          <p>Profile...</p>
        </Grid>
    </Grid>
    </>
  )
}
