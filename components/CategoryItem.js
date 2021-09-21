import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

const CategoryItem = ({category}) => {
    return (  
        <Card>
            <CardMedia
                component="img"
                height="250"
                image={category.image ? category.image : "/vercel.svg"}
                alt={category.name}
            />
            <CardContent>
                <Typography align="center">{category.name}</Typography>
            </CardContent>
            <CardActions>
                <Link href="/[categories]" as={`/${category.url_key}`}>
                    <a style={{width: "100%"}}>
                        <Button fullWidth variant="contained">
                            lihat category
                        </Button>
                    </a>
                </Link>
            </CardActions>
        </Card>
    );
}
 
export default CategoryItem;