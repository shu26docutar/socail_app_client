import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Typography, Paper, Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { CalendarToday, KeyboardReturn, LocationOn } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { logoutUser, uploadImage } from '../redux/actors/userActions';
import EditDetails from './EditDetails';
import MyButton from '../utillity/MyButton';

const Profile = (props) => {
    const userState = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const theme = useTheme()

    const {
        user: {
            credentials: {
                handle, 
                createdAt,
                imageUrl,
                bio,
                website,
                location
            },
            authenticated
        }
    } = props

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        const formData = new FormData()

        formData.append('image', image, image.name)
        dispatch(uploadImage(formData))
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    let profileMarkup = !userState.loading ? (authenticated ? (
        <Paper style={theme.paper}>
            <div style={theme.profile}>
                <div style={theme.profile.image_wrapper} >
                    <img src={imageUrl} alt='profile' style={theme.profile.profile_image} />
                    <input type='file' 
                        id='imageInput' 
                        hidden='hidden' 
                        onChange={handleImageChange}
                    />

                    <MyButton tip='Edit Profile Picture' onClick={handleEditPicture} btnClassName={theme.button}>
                        <ModeEditIcon color='primary' />
                    </MyButton>
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

                <MyButton tip='Logout' onClick={handleLogout}>
                    <KeyboardReturn color='primary' />
                </MyButton>

                <EditDetails />
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
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = ({
    logoutUser,
    uploadImage
})

export default connect(mapStateToProps, mapActionsToProps)(Profile)