export default function ProductCard({ product }) {
  function getColor(status) {
    if (status === "In Stock") return "green";
    else if (status === "Low Stock") return "yellow";
    else return "red";
  }

  return (
    <div className="product-item">
      <img
        src={product.thumbnail}
        className="product-image"
        alt={product.title}
      />
      <span className="product-title">
        <h4 className="mb-0">{product.title}</h4>
        <h4 className="mb-0">${product.price}</h4>
      </span>
      <h5 className="mt-0">{product.brand}</h5>
      <div style={{ fontSize: "12px", marginBottom: "5px" }}>
        ⭐ {product.rating} / 5
      </div>
      <h6 className={getColor(product.availabilityStatus) + " mt-0"}>
        {product.availabilityStatus}
      </h6>
    </div>
  );
}
