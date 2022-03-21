import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import Button from './../athomic-components/Button'

const NotFound = () => {

  const history = useHistory()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h4' noWrap>Error: 404</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' noWrap>La pagina de la URL que tienes no se encuentra...</Typography>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={() => history.push('/')} text={'Volver al inicio'} color='error' />
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
  )
}

export default NotFound