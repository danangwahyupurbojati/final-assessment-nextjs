import Head from 'next/head';
import Image from 'next/image'
import { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
// import { useRouter } from "next/router";
import { withApollo } from '../lib/apollo';
import { GET_PRODUCT_DETAIL } from "../graphql/queries";
import { CREATE_CART_TOKEN, ADD_PRODUCT_TO_CART } from "../graphql/mutations";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';


const ProductDetail = ({resolver}) => {
    console.log('detail', resolver.canonical_url.replace(".html", ""))
    // const router = useRouter();

    // giving information after users add product to cart
    const [open, setOpen] = useState(false);

    // disable button when adds new product to cart
    const [disable, setDisable] = useState(false);

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
        variables: {
            search: "",
            filter: {
                url_key: {
                    eq: resolver.canonical_url.replace(".html", "")
                }
            }
        }
    });

    const [createCartToken] = useMutation(CREATE_CART_TOKEN);
    const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);

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
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    // add product to cart
    // saving cart token locally
    const addCartAction = async (sku) => {
        setDisable(true);

        if(!localStorage.getItem('cart-token')){
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

    return ( 
        <Container style={{paddingTop: 100}}>
            <Head>
                <title>Detail Page</title>
            </Head>
        
            <Typography gutterBottom align="center" variant="h3">Detail Produk</Typography>


            <Grid container spacing={5}>
                <Grid item md={6} xs={12}>
                    <div className="detail-image">
                        <Image layout="fill" objectFit="contain" src={simpleProduct.image.url} alt={simpleProduct.name} />

                    </div>

                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography variant="h5" gutterBottom>{simpleProduct.name}</Typography>
                    <div>
                        <Typography variant="h6" gutterBottom>Deskripsi :</Typography>
                        <div className="description" dangerouslySetInnerHTML={{ __html: simpleProduct.description.html }} />
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