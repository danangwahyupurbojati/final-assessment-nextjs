import Head from 'next/head';

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { withApollo } from '../../lib/apollo';
import { GET_PRODUCT_BY_CATEGORY } from "../../graphql/queries";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ProductItem from "../../components/ProductItem";

const CategoryDetail = () => {
    const router = useRouter();

    const { loading, error, data } = useQuery(GET_PRODUCT_BY_CATEGORY, {
        variables: {
            filters: {
                url_key: {
                    eq: router.query.categoryurl
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

    if(error){
        return (
            <div>
                <Typography gutterBottom align="center" variant="h3">Something Error, Please Wait A Moment ...</Typography>
            </div>
        )
    }

    const products = data.categoryList[0].products.items;
    const simpleProducts = products.filter(product => product.__typename === 'SimpleProduct');

    return (  
        <Container style={{paddingTop: 100}}>
            <Head>
                <title>Demo | {router.query.categories}</title>
            </Head>

            <Typography gutterBottom align="center" variant="h3">{data.categoryList[0].name} - Category</Typography>
            {
                data.categoryList[0].description && (
                    <div className="category-description" dangerouslySetInnerHTML={{ __html: data.categoryList[0].description }} />
                )
            }
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
        </Container>
    );
}
 
export default withApollo({ssr: true})(CategoryDetail);