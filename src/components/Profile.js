import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { connect } from 'react-redux';
import { Typography, Paper, Grid, TextField, Button, CircularProgress, useTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { CalendarToday, LocationOn } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Profile = (props) => {
    const userState = useSelector((state) => state.user)
    const theme = useTheme()

    const {
        classes,
        user: {
            credentials: {
                handle, 
                createdAt,
                imageUrl,
                bio,
                website,
                location
            },
            loading,
            authenticated
        }
    } = props

    let profileMarkup = !userState.loading ? (authenticated ? (
        <Paper style={theme.paper}>
            <div style={theme.profile}>
                <div style={theme.profile.image_wrapper} >
                    <img src={imageUrl} alt='profile' style={theme.profile.profile_image} />
                </div>
                <hr />
                <div style={theme.profile.profile_details}>
                    <Typography variant='h5' component={Link} to={`/users/${handle}`} color="primary">@{handle}</Typography>

                    <hr />
                        {bio && <Typography variant='body2'color="primary">{bio}</Typography>}
                    <hr />

                    {location && (
                        <Fragment>
                            <LocationOn color='primary' /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}

                    {website && (
                        <Fragment>
                            <AccessTimeIcon color='primary' />
                            <a href={website} target='_blank' rel='noopener noreferrer'>
                                {' '}{website}
                            </a>
                        </Fragment>
                    )}

                    <CalendarToday color='primary' />{' '}

                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    ): (
        <Paper style={theme.paper}>
            <Typography variant='body2' align='center'>
                No profile found, please login again
                <div style={theme.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>
                        Login
                    </Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'>
                        Signup
                    </Button>
                </div>
            </Typography>
        </Paper>
    )) : <p>Loading....</p>

    return profileMarkup
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Profile)
