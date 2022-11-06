import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../utillity/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Dialog, CircularProgress, DialogContent, Typography, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector, connect } from "react-redux";
import { UnfoldMore } from '@mui/icons-material';
import { getScream } from '../../redux/actors/dataActions';
import LikeButton from './LikeButton';
import ChatIcon from '@mui/icons-material/Chat';

const styles = {
    invisibleSeparator : {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
}

export const ScreamDialog = (props) => {
    const [ openState, setOpenState ] = useState(false)
    const dispatch = useDispatch()

    const { scream: {
        body,
        createdAt,
        commentCount,
        likeCount,
        screamId,
        userHandle,
        userImage
    }
    } =  props 

    const loading = useSelector((state) => state.UI.loading)
    const screams = useSelector((state) => state.data)

    const dialogMarkup = loading ? (
        <div style={styles.spinnerDiv}>
            <CircularProgress size={200} thickness={2} />
        </div>
    ) : (
        <Grid container spacing={16}>
            <Grid item sm={5}>
                <img src={userImage} alt='Profile' style={styles.profileImage} />
            </Grid>

            <Grid item sm={7}>
                <Typography
                    component={Link}
                    color='primary'
                    variant='h5'
                    to={`/users/${userHandle}`}
                >
                    @{userHandle}
                </Typography>

                <hr style={styles.invisibleSeparator} />

                <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>

                <hr style={styles.invisibleSeparator} />
                <Typography variant='body1'>{ body }</Typography>

                <LikeButton screamId={screamId} />
                <span>{likeCount} likes</span>

                <MyButton tip='comments'>
                    <ChatIcon color='primary' />
                </MyButton>
                <span>{commentCount} comments</span>
            </Grid>
        </Grid>
    )

    const handleOpen = () => {
        setOpenState(true)
        dispatch(getScream(props.screamId))
    }

    const handleClose = () => {
        setOpenState(false)
    }

    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip='Expand scream' tipClassName={styles.expandButton}>
                <UnfoldMore color='primary' />
            </MyButton>

            <Dialog
                open={openState}
                onClose={handleClose}
                fullWidth
                maxWidth
            >
                <MyButton
                    tip='Close'
                    onClick={handleClose}
                    tipClassName={styles.closeButton}
                >
                    <CloseIcon />
                </MyButton>

                <DialogContent style={styles.dialogContent}>
                    { dialogMarkup }
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
})

export default connect(mapStateToProps, { getScream })(ScreamDialog)

// ダイアログのサイズが大きくスタイルが乱れているため修正