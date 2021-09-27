import Head from 'next/head';

import { GET_CATEGORIES } from '../graphql/queries';
import { withApollo } from '../lib/apollo';
import { useQuery } from '@apollo/client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CategoryItem from '../components/CategoryItem';

const Home = () => {
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    
    if(loading){
        return (
            <div>
                <Typography gutterBottom align="center" variant="h3">Loading</Typography>
            </div>
        )
    }

    // perlu handle error juga
    if(error){
        return (
            <div>
                <Typography gutterBottom align="center" variant="h3">Something Error, Please Wait A Moment ...</Typography>
            </div>
        )
    }

    const { categoryList } = data;
    
    return (  
        <Container style={{paddingTop: 100}}>
            <Head>
                <title>Demo | Home</title>
            </Head>

            <Typography gutterBottom align="center" variant="h3">Halaman Home</Typography>
            {
                (categoryList && !loading) ? (
                    <Grid container spacing={3}>
                        {
                            categoryList.map(category => {
                                if (category.url_key) {
                                    return (
                                        <Grid key={category.uid} item xs={12} sm={6} md={3}>
                                            <CategoryItem category={category} />
                                        </Grid>
                                    )
                                }
                            })
                        }
                    </Grid>
                ) : (
                    <div>
                        loading
                    </div>
                )
            }
        </Container>
    );
}
 
export default withApollo({ssr: true})(Home);
