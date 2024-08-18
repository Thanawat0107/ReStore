import { Typography } from '@mui/material'
import { useTitle } from '../../../hooks/useTitle';

type Props = {}

export default function AboutPage({}: Props) {
  useTitle("About");
  return (
    <Typography variant='h2'>AboutPage</Typography>
  )
}