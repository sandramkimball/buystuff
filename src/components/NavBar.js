import React, { useContext } from 'react';
import { Container, Anchor } from 'atomize';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext'

const NavBar = () => {
    const { openCart } = useContext(ShopContext)

    return (
        <Container d='flex' flexDir='row' p='2rem' justify='space-evenly'>
            <Link to='/'>Shop</Link>
            <Anchor onClick={()=> openCart()}>Cart</Anchor>
        </Container>
    )
}

export default NavBar;