import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom'
import { CalendarToday, LocationOn } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const styles = {
    paper: {
        padding: 20
    },
    profile: {
        image_wrapper: {
            textAlign: 'center',
            position: 'relative',
        },
        profile_image: {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        profile_details: {
            textAlign: 'center',
            'span,svg': {
                verticalAlign: 'middle'
            },
            a: {
                color: '#00bcd4'
            }
        },
        hr: {
            border: 'none',
            margin: '0 0 10px 0'
        }
    }
}

export const StaticProfle = (props) => {
    const {profile: {
            handle,
            createdAt,
            imageUrl,
            bio,
            website,
            location
        }
    } = props

    return (
        <Paper style={styles.paper}>
            <div style={styles.profile}>
                <div style={styles.profile.image_wrapper} >
                    <img src={imageUrl} alt='profile' style={styles.profile.profile_image} />
                </div>

                <hr />
                
                <div style={styles.profile.profile_details} id='details'>
                    <Typography
                        variant='h5'
                        component={Link}
                        to={`/user/${handle}`}
                        color="primary"
                    >
                        @{　handle　}
                    </Typography>

                    <hr />
                        { bio && 
                            <Typography
                                variant='body2'
                                color="primary"
                            >
                                {　bio　}
                            </Typography>
                        }
                    <hr />

                    {location && (
                        <Fragment>
                            <LocationOn color='primary' />
                            <span>{　location　}</span>
                            <hr />
                        </Fragment>
                    )}

                    {website && (
                        <Fragment>
                            <AccessTimeIcon color='primary' />
                            <a href={website} target='_blank' rel='noopener noreferrer'>
                                {' '}
                                {　website　}
                            </a>
                        </Fragment>
                    )}

                    <CalendarToday color='primary' />{' '}

                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>

            </div>
        </Paper>
    )
}

export default StaticProfle