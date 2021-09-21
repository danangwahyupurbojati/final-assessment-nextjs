import Head from 'next/head';
import Image from 'next/image'
import { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { withApollo } from '../../../lib/apollo';
import { GET_PRODUCT_DETAIL } from "../../../graphql/queries";
import { CREATE_CART_TOKEN, ADD_PRODUCT_TO_CART } from "../../../graphql/mutations";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';


const ProductDetail = () => {
    const router = useRouter();

    // manage add cart status
    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState(false);

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
        variables: {
            search: "",
            filter: {
                url_key: {
                    eq: router.query.productDetail
                }
            }
        }
    });

    const [createCartToken] = useMutation(CREATE_CART_TOKEN);
    const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);

    if(loading){
        return (
            <div>
                <h1>loading</h1>
            </div>
        )
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    
    const addCartAction = async (sku) => {
        setDisable(true);

        if(!localStorage.getItem('cart-token')){
            console.log('buat token disini')
            const {data: {createEmptyCart}} = await createCartToken();
            localStorage.setItem('cart-token', createEmptyCart);
        }
        
        const data = await addProductToCart({
            variables: {
                cardId: localStorage.getItem('cart-token'),
                sku,
                quantity: 1
            }
        })
        
        if(data){
            setOpen(true)
        }

        setDisable(false)
    }
    
    const simpleProduct = data.products.items.filter(product => product.__typename === "SimpleProduct")[0];
    // console.log(simpleProduct)

    return ( 
        <Container style={{paddingTop: 100}}>
            <Head>
                <title>Demo | {router.query.productDetail}</title>
            </Head>
        
            <Typography gutterBottom align="center" variant="h3">Detail Produk</Typography>

            <Grid container spacing={5}>
                <Grid item md={6}>
                    <div style={{width: '100%', height: '400px', position: 'relative'}}>
                        <Image layout="fill" objectFit="cover" src={simpleProduct.image.url} alt={simpleProduct.name} />

                    </div>

                </Grid>
                <Grid item md={6}>
                    <Typography variant="h5" gutterBottom>{simpleProduct.name}</Typography>
                    <div>
                        <Typography variant="h6" gutterBottom>Deskripsi :</Typography>
                        <p>{simpleProduct.description.html}</p>
                    </div>
                    <div>
                        <Typography variant="h6" gutterBottom>Harga :</Typography>
                        <Typography gutterBottom>{simpleProduct.price_range.minimum_price.final_price.currency} {simpleProduct.price_range.minimum_price.final_price.value}</Typography>
                    </div>
                    <Button disabled={disable} onClick={() => addCartAction(simpleProduct.sku)} variant="contained">Add To Cart</Button>
                </Grid>
            </Grid>

            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Item Ditambahkan ke Cart
                </Alert>
            </Snackbar>
        </Container>
    );
}
 
export default withApollo({ssr: true})(ProductDetail);