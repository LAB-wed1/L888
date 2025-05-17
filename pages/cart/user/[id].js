import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { useCart } from '../../../context/CartContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserCartPage() {
  const router = useRouter();
  const { id } = router.query;
  const { removeFromCart, updateQuantity } = useCart();
  const [userCartItems, setUserCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch cart items for the specific user from API
  useEffect(() => {
    async function fetchUserCart() {
      if (!id) return;
      
      try {
        setLoading(true);
        // Fetch user's cart from FakeStore API
        const response = await axios.get(`https://fakestoreapi.com/carts/user/${id}`);
        const userCarts = response.data;
        
        if (userCarts.length > 0) {
          // Get all product IDs from the cart
          const productIds = [];
          userCarts.forEach(cart => {
            cart.products.forEach(product => {
              productIds.push(product.productId);
            });
          });
          
          // Fetch product details for all products in the cart
          const productsResponse = await axios.get('https://fakestoreapi.com/products');
          const allProducts = productsResponse.data;
          
          // Map product details to cart items
          const cartItemsWithDetails = [];
          userCarts.forEach(cart => {
            cart.products.forEach(cartProduct => {
              const productDetails = allProducts.find(p => p.id === cartProduct.productId);
              if (productDetails) {
                cartItemsWithDetails.push({
                  id: productDetails.id,
                  title: productDetails.title,
                  price: productDetails.price,
                  quantity: cartProduct.quantity,
                  image: productDetails.image
                });
              }
            });
          });
          
          setUserCartItems(cartItemsWithDetails);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user cart:', err);
        setError('Failed to load cart data. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchUserCart();
  }, [id]);
  
  if (!id || loading) {
    return (
      <Layout>
        <h2>Loading user cart data...</h2>
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <h2>Error</h2>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Layout>
    );
  }
  
  if (userCartItems.length === 0) {
    return (
      <Layout>
        <h2>User {id}'s Shopping Cart</h2>
        <p>This user's cart is currently empty.</p>
      </Layout>
    );
  }
  
  // Calculate total price for user's cart items
  const getUserTotalPrice = () => {
    return userCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  return (
    <Layout>
      <h2>User {id}'s Shopping Cart</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Sum</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {userCartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
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
      
      {/* <div className="d-flex justify-content-end">
        <div className="p-2 bd-highlight">
          <strong>Total: ${getUserTotalPrice().toFixed(2)}</strong>
        </div>
      </div> */}
    </Layout>
  );
}