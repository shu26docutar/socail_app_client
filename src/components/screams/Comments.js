import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material';

const styles = {
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
}

const Comments = (props) => {
    const { comments } = props
    const theme = useTheme()

    return (
        <Grid container>
            { comments.map((comment, index) => {
                const { body,createdAt,userImage,userHandle} = comment

                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt='comment' style={styles.commentImage} />
                                </Grid>
                                <Grid item sm={9}>
                                    <div style={styles.commentData}>
                                        <Typography
                                            variant='h5'
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color='primary'
                                        >
                                            {userHandle}
                                        </Typography>
                                        <Typography 
                                            variant='body2'
                                            color='textSecondary'
                                        >
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>

                                        <hr style={theme.invisibleSeparator} />

                                        <Typography variant='body1'>
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== comments.length -1 && (
                            <hr style={theme.visibleSeparator} />
                        )}
                    </Fragment>
                )
            }) }
        </Grid>
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default Comments
// コメントダイアログのレイアウト修正