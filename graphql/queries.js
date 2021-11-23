import { gql } from '@apollo/client';

export const GET_URL_RESOLVER = gql`
    query getUrlResolver($url: String!){
        urlResolver(url: $url){
            canonical_url
            entity_uid
            id
            redirectCode
            relative_url
            type
        }
    }
`;

export const GET_CATEGORIES = gql`
    query GetCategoryLists{
        categoryList(filters: {}){
            name
            uid
            url_key
            url_path
            url_suffix
            image
        }
    }
`;

export const GET_PRODUCT_BY_CATEGORY = gql`
    query GetCategoryLists($filters: CategoryFilterInput){
        categoryList(filters: $filters){
            name
            description
            url_key
            url_path
            url_suffix
            products{
                items{
                    name
                    only_x_left_in_stock
                    qty_available
                    uid
                    sku
                    url_key
                    canonical_url
                    image{
                        url
                    }
                    price_range{
                        minimum_price{
                            final_price{
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_PRODUCT_DETAIL = gql`
    query GetDetailProduct($search: String, $filter: ProductAttributeFilterInput ){
        products(search: $search, filter:$filter){
            items{
                name
                sku
                description{
                    html
                }
                price_range{
                    minimum_price{
                        final_price{
                            currency
                            value
                        }
                    }
                }
                image{
                    url
                }
            }
        }
    }
`;

export const GET_CART = gql`
    query GetCart($card_id: String!){
        cart(cart_id: $card_id){
            items{
                product{
                    name
                    uid
                    image{
                        url
                    }
                }
                quantity
                prices{
                    row_total{
                        value
                        currency
                    }
                price{
                    value
                    currency
                    }
                }
            }
            prices{
                grand_total{
                    value
                    currency
                }
            }
        }
    }
`;