import { Button, Container, Divider, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {}

export default function NotFound({}: Props) {
  return (
    <Container component={Paper} sx={{height: 400}}>
        <Typography gutterBottom variant='h3'>Oops - We could not find what yot are looking for</Typography>
        <Divider />
        <Button fullWidth component={Link} to={`/`}>Go back to home</Button>
    </Container>
  )
}