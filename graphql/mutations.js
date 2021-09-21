import { gql } from '@apollo/client';

export const CREATE_CART_TOKEN = gql`
    mutation CreateCartToken{
        createEmptyCart
    }
`;

export const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCart($cardId: String!, $sku: String!, $quantity: Float!) {
        addSimpleProductsToCart(
            input: {
                cart_id: $cardId
                cart_items: {
                    data: {
                        sku: $sku
                        quantity: $quantity
                    }
                }
            }
        ) {
            cart {
                id        
            }
        }
    }

`