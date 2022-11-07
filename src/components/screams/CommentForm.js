import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, TextField } from '@mui/material';
import { useDispatch, useSelector, connect } from "react-redux";
import { useTheme } from '@mui/material';
import { submitComment } from '../../redux/actors/dataActions';


const CommentForm = (props) => {
    const [ body ,setBody ] = useState('')
    const bodyRef = useRef()
    const theme = useTheme()
    const dispatch = useDispatch()

    const errors = useSelector((state) => state.UI)
    const { authenticated, screamId } = props

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(submitComment(screamId, { body: body }))

        if(!errors.comment && !errors.loading){
            setBody('')
        }
    }

    const handleChange = () => {
        setBody(bodyRef.current.value ? bodyRef.current.value : ' ')
    }

    const commentFormMark = authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    name='body'
                    type='text'
                    label='Comment on scream'
                    variant='standard'
                    value={body}
                    inputRef={bodyRef}
                    helperText={errors.comment}
                    error={errors.comment ? true : false}
                    onChange={handleChange}
                    style={theme.TextField}
                    fullWidth
                />

                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    style={theme.button}
                >
                    Submit
                </Button>
            </form>

            <hr style={theme.invisibleSeparator} />
        </Grid>
    ) : null

    return commentFormMark
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(CommentForm)