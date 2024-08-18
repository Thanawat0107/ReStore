import { Typography } from '@mui/material'
import { useTitle } from '../../../hooks/useTitle';

type Props = {}

export default function ContactPage({}: Props) {
  useTitle("Contact");
  return (
    <Typography variant='h2'>ContactPage</Typography>
  )
}