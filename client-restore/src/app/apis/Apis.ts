import React, { useState } from 'react'
import { Product } from '../models/productIModel';
import { useParams } from 'react-router-dom';

export default function Apis() {
    const {id} = useParams<{id: string}>();
    const [data, setData] = useState<Product | null>();

    
}

