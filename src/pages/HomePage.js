import React, {useContext, useEffect } from 'react';
import { ShopContext } from '../context/shopContext';
import { Container, Text, Div, Row, Col } from 'atomize';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { fetchAllProducts, products } = useContext(ShopContext)

    useEffect(()=> {
        fetchAllProducts()
    }, [fetchAllProducts])

    if (!products) return(<div>Sorry. We currently have no available tours scheduled.</div>)

    return(
        <Container>
            <Text textSize='36px' textAlign='center'>Snorkeling Tours</Text>
            <Row>
                {products.map( product => (
                    <Col key={product.id} size='4'>
                        <Link to={`/packages/${product.id}`} id={product.id} key={product.id}>
                            <Div p='2rem' textAlign='center' textColor='black500'>
                                <Div
                                    h='20rem'
                                    bgImg={product.images[0].src}
                                    bgSize="cover"
                                    bgPos="center center"
                                />
                                <Text textSize='20px' p='2px' >{product.title}</Text>
                                <Text >{product.description}</Text>
                            </Div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomePage;