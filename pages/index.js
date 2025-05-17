import Layout from "../components/layout";
import ProductCard from "../components/productcard";
import axios from "axios";

export default function HomePage(props) {
  return (
    <Layout>
      {/* Removed Featured Products heading */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {props.data.map((prod) => (
          <ProductCard 
            key={prod.id} 
            id={prod.id} 
            name={prod.title} 
            image={prod.image} 
            title={prod.title}
            price={prod.price} 
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await axios.get("https://fakestoreapi.com/products");
  const data = res.data;
  return {
    props: {
      data,
    },
  };
}