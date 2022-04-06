import React from 'react'
import PropTypes from 'prop-types'
import Alert from '@mui/material/Alert'
import { notificationSeverity, notificationVariant } from '../../Styles/muiVariants'

const Notification = ({ severity, message, moreSx }) => {

  return (
    <Alert sx={moreSx ? moreSx : { width: '100%', marginTop: 2.5 }} variant={notificationVariant[0]} severity={notificationSeverity[severity]}>
      { message }
    </Alert>
  )
}

Notification.propTypes = {
  severity: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
}

export default Notification