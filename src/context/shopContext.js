import React, {Component} from 'react'
import Client from 'shopify-buy';
import DummyData from '../Data.json';


const ShopContext = React.createContext()

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
    domain: 'cicisstuff.myshopify.com',
    storefrontAccessToken: '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'
});
  

class ShopProvider extends Component {
    state = {
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false,
    }

    componentDidMount(){
        // Check localstorage for saved checkout_id 
        // If no checkout_id, then create new checkout
        // Else fetch checkout from Shopify
        if(localStorage.checkout){
            this.fetchCheckout(localStorage.checkout)
        } else{
            this.createCheckout()
        }
    }

    createCheckout = async () => {
        const checkout = client.checkout.create()
        localStorage.setItem('checkout', checkout)
        await this.setState({ checkout: checkout })
    }

    fetchCheckout = async (checkoutId) => {
        client.checkout.fetch(checkoutId)
        .then( checkout => {
            this.setState({ checkout: checkout })
        })
        .catch( err => console.log(err))
    }

    addItemToCart = async (variantId, quantity) => {
        const lineItemstoAdd = [{
            variantId,
            quantity: parseInt(quantity, 10)
        }];

        const checkout = await client.checkout.addLineItems(
            this.state.checkout.id, 
            lineItemstoAdd
        );
        this.setState({ checkout: checkout })
    }

    fetchAllProducts = async () => {
        // const products = await client.product.fetchAll()
        this.setState({ products: DummyData })
    }

    fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id)
        this.setState({ product: product })
    }

    closeCart = () => {
        this.setState({isCartOpen: false})
    }

    openCart = () => {
        this.setState({isCartOpen: true})
    }

    render() {
        return (
            <ShopContext.Provider value={{
                ...this.state,
                fetchAllProducts: this.fetchAllProducts,
                fetchProductWithId: this.fetchProductWithId,
                createCheckout: this.createCheckout,
                addItemToCart: this.addItemToCart,
                closeCart: this.closeCart,
                openCart: this.openCart
            }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}

export { ShopContext }
export default ShopProvider;