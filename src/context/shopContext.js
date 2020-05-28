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
        if(localStorage.checkout){
            this.fetchCheckout(localStorage.checkout)
        } else{
            this.createCheckout()
        }
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create()
        localStorage.setItem('checkout', checkout.id)
        await this.setState({ checkout: checkout })
    }

    fetchCheckout = async (checkoutId) => {
        client.checkout
        .fetch(checkoutId)
        .then( (checkout) => {
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
        this.openCart()
    }

    fetchAllProducts = async () => {
        // const products = await client.product.fetchAll()
        this.setState({ products: DummyData })
    }

    fetchProductWithId = async (id) => {
        // const product = await client.product.fetch(id)
        const products = DummyData
        this.setState({ product: products[id] })
    }

    closeCart = () => {
        this.setState({isCartOpen: false})
        console.log('close cart')
    }

    openCart = () => {
        this.setState({isCartOpen: true})
        console.log('open cart')
    }

    render() {
        return (
            <ShopContext.Provider value={{
                ...this.state,
                fetchAllProducts: this.fetchAllProducts,
                fetchProductWithId: this.fetchProductWithId,
                addItemToCart: this.addItemToCart,
                closeCart: this.closeCart,
                openCart: this.openCart
            }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}
const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext }
export default ShopProvider;