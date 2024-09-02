import { Container, Divider, Paper, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

type Props = {}

export default function ServerError({}: Props) {
  const {state} = useLocation();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography gutterBottom variant='h3' color="red">
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant='body1'>{state.error.detail || "Internal server error"}</Typography>
        </>
      ) : ( <Typography variant='h5' gutterBottom>Server error</Typography> )
    }
    </Container>
  )
}