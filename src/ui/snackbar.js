import React from 'react'
import { Snackbar as MaterialSnackbar, Slide } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function SlideTransition (props) {
  return <Slide {...props} direction='up' />
}

const Snackbar = (props) =>
  (
    <MaterialSnackbar
      {...props}
      TransitionComponent={SlideTransition}
    >
      <Alert variant='filled' severity={props.success ? 'success' : 'error'}>
        {props.message}
      </Alert>
    </MaterialSnackbar>
  )

export default Snackbar
