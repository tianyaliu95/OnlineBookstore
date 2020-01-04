import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mt-2 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text moment">Change Quantity</span>
            </div>
            <input type="number" className="form-control col-4 mr-5" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-sm btn-outline-danger ml-2 mt-3 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header card-header-1 name text-capitalize">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <Link to={`/product/${product._id}`} className="mr-2 card-hover">
          <ShowImage item={product} url="product" />
        </Link>
        <p className="card-p  mt-2">{product.description.substring(0, 80)} </p>
        <div className="card-p mt-2">
          <div className="mt-2 font-weight-bold price">${product.price}</div>
          <div className="mt-2">Category: {product.category && product.category.name}</div>
          <div className="mt-2 mb-3 moment">Added {moment(product.createdAt).fromNow()}</div>
        </div>
        
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}
        {showAddToCartBtn(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}

        
      </div>
    </div>
  );
};

export default Card;
