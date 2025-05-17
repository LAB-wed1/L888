import Layout from '../components/layout';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="text-center py-5">
          <h2 className="mb-4">Shopping Cart</h2>
          <p className="lead mb-4">Your cart is currently empty.</p>
          <Link href="/" className="btn btn-primary px-4 py-2">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* <h2 className="mb-4">Shopping Cart</h2> */}
      <div className="card shadow-sm mb-4">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Sum</th>
                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">{item.title}</td>
                  <td className="align-middle">${item.price.toFixed(2)}</td>
                  <td className="align-middle">{item.quantity}</td>
                  <td className="align-middle fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="align-middle">
                    {/* <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      ×
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      

    </Layout>
  );
}