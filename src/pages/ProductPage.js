import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { Text, Div, Button, Row, Col, Container } from 'atomize';

const ProductPage = () => {

    let {id} = useParams();
    const { fetchProductWithId, addItemToCart, product, openCart } = useContext(ShopContext);

    useEffect(()=> {
        fetchProductWithId(id)        
    }, [fetchProductWithId, id])

    if(!product.title) return <div>Loading...</div>
    return (
        <Container>
            <Row>
                <Col>
                    <Div bgImg={product.images[0].src} bgSize="cover" bgPos='center center' />
                </Col>
                <Col>
                    <Text>{product.title}</Text>
                    <Text>${product.price}</Text>
                    <Button onClick={()=>{
                        addItemToCart(product.id, 1)
                        openCart()
                    }}>
                            Add To Cart
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductPage;