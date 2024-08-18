import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Product } from '../../../models/productIModel';

type Props = {}

export default function ProductDetails({}: Props) {
  const {id} = useParams<{id: string}>();
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://localhost:44376/api/Product/${id}`)
    .then(response => setData(response.data))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, [id]);
  
  if(loading) return <h3>loading...</h3>
  if(!data) return <h3>Not Found!!</h3>
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={data.pictureUrl} alt={data.name} style={{width: "100%"}} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{data.name}</Typography>
        <Divider sx={{mb: 2}}/>
        <Typography variant='h4' color="ActiveBorder">${(data.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{data.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{data.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{data.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{data.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>{data.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}