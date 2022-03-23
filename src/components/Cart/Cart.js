import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    // console.log(cart)
    
    // let total = 0;
    // for(const product of cart){
    //     total = total + product.price
    // }
    const totalFn = (previous, current) => previous + current.price
    let total = cart.reduce(totalFn, 0)
    
    // let shipping = 0;
    // for(const product of cart){
    //     shipping = shipping + product.shipping
    // }
    const shippingFn = (p, c) => p + c.shipping
    let shipping = cart.reduce(shippingFn, 0)

    let tax = parseFloat((total * .10).toFixed(2))
    // console.log(typeof tax)
    let grandTotal = total + shipping + tax
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping Charge: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <h4>Grand Total: ${grandTotal}</h4>
        </div>
    );
};

export default Cart;