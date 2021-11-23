import React from 'react'
import { useQuery,gql } from "@apollo/client";

// import Category from '../comps/category';
import { withApollo } from '../lib/apollo';
import { GET_URL_RESOLVER } from '../graphql/queries';
import CategoryPage from '../components/CategoryPage';
import DetailProduct from '../components/DetailProduct';

const getPage = (resolver) => {
    if (!resolver) {
        return <div>Page not found</div>;
    } else if (resolver.type === "CATEGORY") {
        //   return <Category />;
        return <CategoryPage resolver={resolver} />
        
    } 
    else if (resolver.type === "PRODUCT") {
      return <DetailProduct resolver={resolver} />;
    }
    return <span />;
};

export const getServerSideProps = async (context) => {
    const url = context.query
  
    return {
      props:{ slug: url }
    }
}

function DynamicPage({slug}) {
    // const { query } = slug;
    let url = ''
    let NewSlug = [];
    slug.slug.map((value) => {
        value = value.replace(".html", "");
        NewSlug.push(value);//masukin value kedalam array slugnya
        url += `/${value}`;
    });
    url += ".html";

    // console.log("url",NewSlug)

    const response = useQuery(GET_URL_RESOLVER , {
        variables:{
            url: url
        }
    })
    const {loading, error, data} = response;

    //kalau masih loading
    if (loading) {
        return (
        <div>loading</div>
        );
    }

    if (error) {
        return <h2>Error...</h2>;
    }

    const resolver = data.urlResolver;

    return (
        <div>
            {getPage(resolver)}
        </div>
    )
}

export default withApollo({ ssr: false })(DynamicPage);
