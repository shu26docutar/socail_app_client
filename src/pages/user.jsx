import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid} from '@mui/material';
import { connect, useDispatch, useSelector } from "react-redux";
import { getUserData } from '../redux/actors/userActions';
import { StaticProfle } from '../components/profile/StaticProfle'
import Scream from '../components/screams/Scream';
import axios from '../contexts/axios';


export const User = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.data)
    // 下は不要かも
    const userHandle = useSelector((state) => state.data.userDetail)
    const [ profile, setProfile ] = useState({
                                        profile: null
                                    })

    dispatch(getUserData(userHandle))

    axios.get(`/user/${userHandle}`)
        .then((res) => {
            setProfile(res.data.user)
        })
        .catch((error) => {
            console.log(error)
        })

    const screamsMarkup = userData.loading ? (
        <p>Loading Data...</p>
    ) : userData.screams === null ? (
        <p>No screams from this user</p>
    ) : (
        userData.screams.map((scream) => 
            <Scream key={scream.screamId} scream={scream} />
        )
    )

    return (
        <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                {screamsMarkup}
            </Grid>

            <Grid item sm={4} xs={12}>
                {profile === null ? (
                    <p>Profile Loading...</p>
                ) : (
                    <StaticProfle profile={profile} />
                )}
            </Grid>
        </Grid>
    )
}

User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getUserData })(User)
// 詳細画面から戻った後は、ReduxがTrueのままなためProfile画面がloading状態になったまま