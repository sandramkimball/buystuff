import React, { useContext } from 'react';
import { Container, Anchor, Icon } from 'atomize';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext'

const NavBar = () => {
    const { openCart } = useContext(ShopContext)

    return (
        <Container d='flex' flexDir='row' p='2rem'justify='space-evenly' textColor="black500">
            <Link to='/'>Shop</Link>
            <Anchor onClick={()=> openCart()}>
                <Icon name="Bag" size="20px" color="black500" />
            </Anchor>
        </Container>
    )
}

export default NavBar;