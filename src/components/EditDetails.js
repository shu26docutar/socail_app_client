import React, { Fragment, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, useTheme, IconButton, Tooltip, DialogTitle, DialogContent, DialogActions, Dialog, TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actors/userActions';
import { useDispatch, useSelector } from "react-redux";


// FIXME:~ 空白で投稿した時に空白状態で保存されるようにする
export const EditDetails = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const credentials = useSelector((state) => state.user.credentials)
    
    // Dialog Switch
    const [openState, setOpenState] = useState(false)
    const [bio, setBio] = useState(credentials.bio)
    const [website, setWebsite] = useState(credentials.website)
    const [location, setLocation] = useState(credentials.location)

    const bioRef = useRef()
    const websiteRef = useRef()
    const locationRef = useRef()

    const handleSubmit = () => {
        const userDetails = {
            bio: bio,
            website: website,
            location: location
        }

        dispatch(editUserDetails(userDetails))
        handleClose()
    }

    const handleChange = (event) => {
        setBio(bioRef.current.value ? bioRef.current.value : ' ')
        setWebsite(websiteRef ? websiteRef.current.value : '')
        setLocation(locationRef ? locationRef.current.value : '')
    }

    const handleOpen = () => {
        setOpenState(true)
        mapStateToProps(credentials)
    }

    const handleClose = () => {
        setOpenState(false)
    }

    return (
        <Fragment>
            <Tooltip title='Edit Details' placement='top'>
                <IconButton onClick={handleOpen} style={theme.EditButton}>
                    <ModeEditIcon color='primary' />
                </IconButton>
            </Tooltip>

            <Dialog open={openState} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>Edit your details</DialogTitle>

                <DialogContent>
                    <form>
                        <TextField 
                            name='bio' 
                            type='text'
                            label='Bio' 
                            variant='standard'
                            multiline 
                            rows='3' 
                            placeholder='A short bio about yourself' 
                            value={bio}
                            inputRef={bioRef}
                            onChange={handleChange}
                            style={theme.TextField}
                            fullWidth 
                        />

                        <TextField 
                            name='website' 
                            type='text' 
                            label='Website' 
                            variant='standard'
                            placeholder='Your personal/professinal website' 
                            value={website}
                            inputRef={websiteRef}
                            onChange={handleChange}
                            style={theme.TextField} 
                            fullWidth 
                        />

                        <TextField
                            name='location' 
                            type='text' 
                            label='Location' 
                            variant='standard'
                            placeholder='Where you live' 
                            value={location} 
                            inputRef={locationRef}
                            onChange={handleChange}
                            style={theme.TextField}  
                            fullWidth
                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit} color='primary'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, {editUserDetails})(EditDetails)