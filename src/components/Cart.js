import React, { useContext } from 'react';
import { ShopContext } from '../context/shopContext'
import { Div, Container, SideDrawer, Text, Anchor, Row, Col } from 'atomize';

const Cart = () => {
    const { isCartOpen, closeCart, checkout } = useContext(ShopContext)

    if(checkout.lineItems){        
        return (
            <SideDrawer isOpen={isCartOpen} onClose={closeCart}>
                <Container d="flex" flexDir="column" h="100%" m={{ b: "4rem" }}>
                    <Row flexGrow="2" p="0.7rem" overflow="auto" flexDir="column">
                        {checkout.lineItems.length < 1 ?
                        <Row>
                            <Col><Text tag="h1"  textSize="paragraph" hoverTextColor="black700" transition="0.3s">
                                Cart is empty.
                            </Text></Col>
                        </Row>
                        :
                        <>
                        {checkout.lineItems && checkout.lineItems.map(item=> (
                            <Row key={item.id} p={{t:"5px"}}>
                                <Col>
                                    <Div bgImg={item.variant.image.src} bgSize="cover" bgPos="center center" h="5rem" w="4rem"/>
                                </Col>
                                <Col>
                                    <Text>{item.title}</Text>
                                    <Text>{item.variant}</Text>
                                    <Text>{item.quantity}</Text>
                                </Col>
                                <Col>
                                    <Text>${item.variant.price}</Text>
                                </Col>
                            </Row>
                        ))}
                        </>
                        }
                    </Row>
                </Container>
                <Anchor href={checkout.webUrl} target='_blank'>Checkout</Anchor>
            </SideDrawer>
        )
    } else { return null }
}

export default Cart;