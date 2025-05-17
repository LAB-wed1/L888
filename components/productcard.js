import Link from 'next/link';

export default function ProductCard(props) {
  return (
    <div className="col">
      <div className="product-card card">
        <img src={props.image} className="card-img-top" alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">${props.price || '0.00'}</p>
          <Link href={`/product/${props.id}`} className="btn btn-primary">
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}