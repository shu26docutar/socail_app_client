import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, useTheme, DialogTitle, DialogActions, Dialog, TextField, CircularProgress } from '@mui/material';
import { connect } from 'react-redux';
import { postScream } from '../redux/actors/dataActions';
import { useDispatch, useSelector } from "react-redux";
import MyButton from '../utillity/MyButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
}

export const PostScream = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const uiState = useSelector((state) => state.UI)
    const [ openState, setOpenState ] = useState(false)
    const screamBody = useRef()

    const handleOpen = () => {
        setOpenState(true)
    }

    const handleClose = () => {
        setOpenState(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const bodyData = {
            body: screamBody.current.value
        }

        dispatch(postScream(bodyData))

        // handleClose()
    }

    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip='Post a Scream'>
                <AddIcon />
            </MyButton>
            <Dialog open={openState} onClose={handleClose} fullWidth maxWidth='sm'>
                <MyButton tip='Close' onClick={handleClose} tipClassName={StyleSheet.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogTitle>
                    Post a new scream
                </DialogTitle>
                <DialogActions>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            name='body' 
                            type='body' 
                            label='SCREAM!!' 
                            variant='standard'
                            rows='3'
                            multiline
                            placeholder='Scream at your fellow apes'
                            helperText={uiState.body}
                            error={uiState.body ? true: false}
                            inputRef={screamBody}
                            fullWidth={true} 
                            style={theme.textField}
                        />

                        <Button 
                            type='submit' 
                            variant='contained' 
                            color='primary' 
                            style={styles.submitButton} 
                            disabled={uiState.loading}
                        >
                            Submit
                            {uiState.loading &&
                            <CircularProgress size={30} style={styles.progressSpinner} />}
                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

PostScream.propTypes = {
    postScream:  PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream })(PostScream)

// 投稿後投稿フォームが消えない
// 投稿フォームのレイアウトが壊れている