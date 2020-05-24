import react, {Component} from 'react'
import Client from 'shopify-buy';


const ShopContext = React.createContext()

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
    domain: 'buystuff.myshopify.com',
    storefrontAccessToken: 'your-storefront-access-token'
});
  
// Initializing a client to return translated content
// const clientWithTranslatedContent = Client.buildClient({
//     domain: 'your-shop-name.myshopify.com',
//     storefrontAccessToken: 'your-storefront-access-token',
//     language: 'ja-JP'
// });

class ShopProvider extends Component {
    state = {
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false,
        test: 'test'
    }

    createCheckout = async () => {

    }
    addItemToCard = async () => {

    }
    fetchAllProducts = async () => {

    }
    fetchProductWithId = async () => {

    }
    closeCard = () => {
        this.state.isCartOpen = false
    }
    openCard = () => {
        this.state.isCartOpen = true
    }

    render() {
        return (
            <ShopContext.Provider value={{...this.state}}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}

export { ShopContext, ShopContext }
export default ShopProvider;