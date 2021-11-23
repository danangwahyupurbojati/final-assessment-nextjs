import React from 'react'
import { GET_PRODUCT_BY_CATEGORY } from '../graphql/queries'
import { withApollo } from '../lib/apollo'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useQuery } from "@apollo/client";
import ProductItem from './ProductItem';

const CategoryPage = ({resolver}) => {
    // const router = useRouter();
    // console.log(resolver.entity_uid)
    const { loading, error, data } = useQuery(GET_PRODUCT_BY_CATEGORY, {
        variables: {
            filters: {
                category_uid: {
                    eq: resolver.entity_uid
                }
            }
        }
    });
    
    if(loading){
        return (
            <div>
                <Typography gutterBottom align="center" variant="h3">Loading</Typography>
            </div>
        )
    }

    const products = data.categoryList[0].products.items;
    const simpleProducts = products.filter(product => product.__typename === 'SimpleProduct');

    // console.log(simpleProducts)

    return (
        <div>
            <h1 style={{ marginTop: '100px' }}>masuk category list</h1>;
            {
                (!loading && simpleProducts.length) ? (
                    <Grid container spacing={3}>
                        {
                            simpleProducts.map(product => (
                                <Grid item xs={12} sm={6} md={3} key={product.url_key}>
                                    <ProductItem product={product} />
                                </Grid>
                            ))
                        }
                    </Grid>
                ) : (
                    <Typography variant="h5" align="center">Produk Kosong</Typography>
                )
            } 
        </div>
    )
}

export default withApollo({ ssr: true })(CategoryPage)
