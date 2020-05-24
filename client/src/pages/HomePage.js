import React, {useContext, useEffect } from 'react';
import { ShopContext } from '../context/shopContext';

const HomePage = () => {
    const { test } = useContext(ShopContext)
    return (
        <div>
            <p>Home on the Range</p>
            <p>{test}</p>
        </div>
    )
}

export default HomePage;