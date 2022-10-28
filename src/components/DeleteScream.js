import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import MyButton from '../utillity/MyButton';
import { Button, DialogTitle, DialogContent, DialogActions, Dialog, TextField } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { deleteScream } from '../redux/actors/dataActions'

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
}

export const DeleteScream = (props) => {
    const dispatch = useDispatch()
    const [ openState, setOpenState ] = useState(false)

    const handleOpen = () => {
        setOpenState(true)
    }
    const handleClose = () => {
        setOpenState(false)
    }
    const deleteTarget = () => {
        dispatch(deleteScream(props.screamId))
        setOpenState(false)
    }

    return (
        <Fragment>
            <MyButton tip='Delete Scream' onClick={handleOpen} btnClassName={styles.deleteButton}>
                <DeleteOutline color='primary' />
            </MyButton>
            <Dialog open={openState} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>
                    Are you sure you want to delete this scream?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={deleteTarget} color='secondary'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(DeleteScream)