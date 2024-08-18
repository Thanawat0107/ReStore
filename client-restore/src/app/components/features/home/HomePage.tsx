import { Typography } from '@mui/material'
import React from 'react'
import { useTitle } from '../../../hooks/useTitle';

type Props = {}

export default function HomePage({}: Props) {
  useTitle("Home");
  return (
    <Typography variant='h2'>HomePage</Typography>
  )
}