/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../models/productIModel";
import { Apis } from "../../api/Apis";
import { RootState } from "../store";
import { MetaData } from "../../models/pagination";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    types: string[];
    brands: string[];
    params: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

const getAxiosParams = (productParams: ProductParams) => {
    const params = new URLSearchParams();
    params.append('orderBy', productParams.orderBy);
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());

    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.types.length > 0) params.append('types', productParams.types.toString());
    if (productParams.brands.length > 0) params.append('brands', productParams.brands.toString());

    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalogReducer.params);
        try {
            const response = await Apis.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
            
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const fetchProductByAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductByAsync',
    async (productId, thunkAPI) => {
        try {
            return await Apis.Catalog.details(productId)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
);

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return Apis.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

const initParams = () => {
    return {
        orderBy: 'name',
        pageNumber: 1,
        pageSize: 6,
        types: [],
        brands: [],
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        types: [],
        brands: [],
        params: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action)  => {
            state.productsLoaded = false;
            state.params = {...state.params, ...action.payload, pageNumber: 1};
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.params = {...state.params, ...action.payload};
        },
        setMetaData: (state, action) =>  {
            state.metaData = action.payload;
        },
        resetProductParams: (state) => {
            state.params = initParams();
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });

        builder.addCase(fetchProductByAsync.pending, (state) => {
            state.status = 'pendingFetchProductBy';
        });
        builder.addCase(fetchProductByAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductByAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands; 
            state.types = action.payload.types; 
            state.filtersLoaded = true;
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
});

export const { setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogSlice.actions;
export const productSelecters = productsAdapter.getSelectors((state: RootState) => state.catalogReducer);

export const catalogReducer = catalogSlice.reducer;