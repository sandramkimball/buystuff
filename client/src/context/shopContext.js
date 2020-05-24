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
        test: 'banana pudding'
    }

    createCheckout = async () => {
        const checkout = client.checkout.create()
        .then( checkout => {
            console.log('Check me out. I\'m a checkout.')
            this.setState({ checkout: checkout })
        })
    }

    addItemToCart = async () => {
        const lineItemstoAdd = [{
            variantId,
            quantity: parseInt(quantity, 10)
        }];

        const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
        this.setState({ checkout: checkout })
        
    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll()
        .then( products => {
            console.log('Here be the stuff.', products)
            this.setState({ products: products })
        })
    }

    fetchProductWithId = async () => {
        const product = await client.product.fetch(id)
        .then( product => {
            console.log('Check this thing out.', product)
            this.setState({ product: product })
        })

    }

    closeCart = () => {
        this.setState({isCartOpen: false})
    }
    
    openCart = () => {
        this.setState({isCartOpen: true})
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