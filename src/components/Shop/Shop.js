import React, { useEffect, useState } from 'react';
import { addToDb, getLocalStorage } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    console.log(cart) 

    useEffect( () =>{
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, []);

    const handleAddToCart = (selectProduct) =>{
        // console.log(product);
        // do not do this: cart.push(product);

        const exists = cart.find(product => product.id === selectProduct.id)
        let newCart = []
        if(!exists){
            selectProduct.quantity = 1;
            newCart = [...cart, selectProduct]
        }else{
            exists.quantity = exists.quantity + 1
            const rest = cart.filter(product => product.id !== selectProduct.id)
            console.log(rest)
            newCart = [...rest, exists]
        }
        // console.log(newCart)
        setCart(newCart)
        addToDb(selectProduct.id)
    }
    useEffect( () => {
        const localStorage = getLocalStorage()
        const savedCart = []
        for(const id in localStorage){
            // console.log(id)
            let addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                savedCart.push(addedProduct)
                addedProduct.quantity = localStorage[id]
                // console.log(addedProduct)
            }
        }
        setCart(savedCart)
    }, [products])

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;