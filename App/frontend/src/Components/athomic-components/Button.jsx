import * as React from 'react'
import PropTypes from 'prop-types'
import { buttonVariant } from '../../Styles/muiVariants'
import { Button as MUIButton } from '@mui/material'

const Button = ({ onClick, text, submit, disable, moreSx, color }) => {

  return (
    <MUIButton
      type={submit ? 'submit' : 'button'}
      sx={moreSx ? moreSx : { width: '100%', marginTop: 2, }}
      onClick={onClick}
      variant={buttonVariant[0]}
      disabled = { disable ? true : false }
      color = {color ? color : 'primary' }
    >
      { text }
    </MUIButton>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  submit: PropTypes.bool,
  disable: PropTypes.bool,
  color: PropTypes.string
}

export default Button