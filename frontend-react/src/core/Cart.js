import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div className="mx-4">
                <h2 className="mb-4">You have {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2 className="mx-4">
            Your cart is currently empty. 
            <br /> 
            <hr className="mt-4"/>
            <div className="mt-3">
            <Link to="/shop" className="text-white">
                <button type="button" className="btn btn-secondary">
                    Continue shopping
                </button>
            </Link>
        </div>
            
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Change / remove items, checkout or continue shopping!"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-6 height-full">
                    <h2 className="mb-4">Cart Summary</h2>
                    <hr className="mr-4"/>
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
