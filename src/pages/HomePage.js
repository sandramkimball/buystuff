import React, {useContext, useEffect } from 'react';
import { ShopContext } from '../context/shopContext';
import { Container, Text, Div, Row, Col } from 'atomize';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { fetchAllProducts, products } = useContext(ShopContext)

    useEffect(()=> {
        fetchAllProducts()
        console.log('Banana Pudding?')
        return () => {

        }
    }, [fetchAllProducts])

    if (!products) return(<div>No products today.</div>)

    return(
        <Container>
            <Row>
                {products.map( product => (
                    <Col key={product.id} size='3'>
                        <Link to={`/product/${product.id}`}>
                            <Div p='2rem' textAlign='center' textDecor='none' textColor='#000'>
                                <Div
                                    h='20rem'
                                    // bgImg={"https://natgeo.imgix.net/factsheets/thumbnails/HEADER_Stingray.jpg?auto=compress,format&w=1600&h=900&fit=crop"}
                                    bgImg={product.images[0].src}
                                    bgSize="cover"
                                    bgPos="center center"
                                />
                                <Text>{product.title}</Text>
                                <Text >{product.description}</Text>
                                {/* <Text>{product.variants[0].src}</Text> */}
                            </Div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomePage;