import Head from 'next/head';

import { useQuery } from "@apollo/client";
import { withApollo } from '../../lib/apollo';
import { GET_CART } from "../../graphql/queries";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from "@mui/material/TableFooter";

const CartPage = () => {

    const token = typeof window !== 'undefined' ? localStorage.getItem('cart-token') : null

    const { loading, error, data } = useQuery(GET_CART, {
        variables: {
            card_id: token
        },
        fetchPolicy: "network-only",
        nextFetchPolicy: "no-cache"
    });


    if(loading){
        return (
            <div>
                <h1>loading</h1>
            </div>
        )
    }

    return ( 
        <Container style={{paddingTop: 100}}>
            <Head>
                <title>Demo | Cart</title>
            </Head>

            <Typography gutterBottom align="center" variant="h3">Halaman Cart</Typography>

            {
                data ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                    <TableRow>
                                        <TableCell>Items</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.cart.items.map(item => (
                                        <TableRow key={item.product.uid}>
                                            <TableCell>{item.product.name}</TableCell>
                                            <TableCell align="center">{item.prices.price.value}</TableCell>
                                            <TableCell align="center">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.prices.row_total.value}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Typography variant="h6">Total</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6">
                                            {data.cart.prices.grand_total.value}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography gutterBottom align="center" variant="h5">Produk Kosong</Typography>
                )
            }
        </Container>
    );
}
 
export default withApollo({ssr: false})(CartPage);