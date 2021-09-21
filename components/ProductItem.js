import Link from 'next/link';
import { useRouter } from "next/router";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';

const ProductItem = ({product}) => {
    const router = useRouter();
    return (  
        <Card>
            <CardMedia
                component="img"
                height="250"
                image={product.image.url ? product.image.url : "/vercel.svg"}
                alt={product.name}
            />
            <CardContent>
                <Typography style={{minHeight: 60}} align="center">{product.name}</Typography>
                <Typography align="center">
                    {product.price_range.minimum_price.final_price.currency} {product.price_range.minimum_price.final_price.value} 
                </Typography>
            </CardContent>
            <CardActions>
                <Link href="/[categories]/[productDetail]" as={`/${router.query.categories}/${product.url_key}`}>
                    <a style={{width: "100%"}}>
                        <Button fullWidth variant="contained">
                            Detail Product
                        </Button>
                    </a>
                </Link>
            </CardActions>
        </Card>
    );
}
 
export default ProductItem;