import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Product } from '../../../models/productIModel';
import { Apis } from '../../../api/Apis';
import { NotFound } from '../../../errors';
import Loading from '../../layout/Loading';

type Props = {}

export default function ProductDetails({}: Props) {
  const {id} = useParams<{id: string}>();
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    id && Apis.Catalog.details(parseInt(id))
    .then(response => setData(response))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, [id]);
  
  if(loading) return <Loading message='Loading product...'/>
  if(!data) return <NotFound/>
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={data.pictureUrl} alt={data.name} style={{width: "100%"}} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{data.name}</Typography>
        <Divider sx={{mb: 2}}/>
        <Typography variant='h4'>
          {data.price.toLocaleString('th-TH',
            { style: 'currency', currency: 'THB' })
          }
        </Typography>
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