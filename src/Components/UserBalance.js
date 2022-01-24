import React from 'react';



export default function UserBalance(){

    return (

        <div className="total__outer">
            <div className="auto__container">
                <div className="total">
                    <div className="total__inner">
                        <h2>Cart totals</h2>
                        <div className="total__inner-row">
                            <h4>Total Quantity</h4>
                            <span>cart.totalQty</span>
                        </div>
                        <div className="total__inner-row">
                            <h4>Subtotal</h4>
                            <span>totalPrice</span>
                        </div>
                        <div className="total__inner-row">
                            <h4>Shipping</h4>
                            <span>Free shipping Shipping to FL.</span>
                        </div>
                        <div className="total__inner-row">
                            <h4>Total</h4>
                            <span>totalPrice</span>
                        </div>
                    
                    </div>
                </div>
        
            </div>
        </div>
   
    );

};













/**
 * 
 *{/* <div className="total__inner-submit">
                        <button className="button primary">
                        <Link to="/bill">
                            Proceed to checkout
                        </Link>
                        </button>
                    </div> * 
 * 
 * 
 *    
 * 
 * 
 */