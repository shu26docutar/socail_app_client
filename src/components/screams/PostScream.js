import React, { Fragment, useState, useRef } from 'react';
import { Button, useTheme, DialogTitle, Dialog, TextField, CircularProgress, DialogContent } from '@mui/material';
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actors/dataActions';
import { useDispatch, useSelector } from "react-redux";
import MyButton from '../../utillity/MyButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


const styles = {
    submitButton: {
        position: 'relative',
        float: 'right',
        // marginTop: 10,
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
        dispatch(clearErrors())
        setOpenState(false)
    }

    async function handleSubmit(e){
        e.preventDefault()

        const bodyData = {
            body: screamBody.current.value
        }

        dispatch(postScream(bodyData))
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

                <DialogContent>
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
                </DialogContent>

            </Dialog>

        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(PostScream)