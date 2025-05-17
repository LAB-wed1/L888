import axios from 'axios';
import Layout from '../../components/layout';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function ProductPage({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset the added message after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="card mb-3 shadow-sm" style={{maxWidth: '100%'}}>
        <div className="row g-0">
          <div className="col-md-4 p-3 d-flex align-items-center justify-content-center" style={{backgroundColor: 'white'}}>
            <img src={product.image} className="img-fluid" alt={product.title} style={{maxHeight: '300px', objectFit: 'contain'}} />
          </div>
          <div className="col-md-8">
            <div className="card-body p-4">
              <h3 className="card-title mb-3">{product.title}</h3>
              <p className="card-text mb-3">{product.description}</p>
              <div className="d-flex flex-column gap-2 mb-4">
                <p className="card-text"><strong>Category:</strong> <span className="badge bg-secondary">{product.category}</span></p>
                <p className="card-text"><strong>Price:</strong> <span className="text-primary fw-bold fs-4">${product.price}</span></p>
                <p className="card-text"><small className="text-muted">Last updated recently</small></p>
              </div>
              <button 
                className={`btn ${isAdded ? 'btn-success' : 'btn-primary'} px-4 py-2`} 
                onClick={handleAddToCart}
              >
                {isAdded ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await axios.get('https://fakestoreapi.com/products');
  const products = res.data;
  
  const paths = products.map(product => ({
    params: { id: product.id.toString() }
  }));
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
  const product = res.data;
  
  return {
    props: {
      product
    }
  };
}