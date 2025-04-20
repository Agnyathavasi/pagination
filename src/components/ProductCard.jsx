export default function ProductCard({ product }) {
  function getColor(status) {
    if (status === "In Stock") return "green";
    else if (status === "Low Stock") return "yellow";
    else return "red";
  }

  function calculateOriginalPrice(discount, price) {
    const n = parseFloat((price * discount) / 100 + price, 2);
    return n.toFixed(2);
  }

  return (
    <div className="product-item">
      <img
        src={product.thumbnail}
        style={{ backgroundColor: "#eeeeee" }}
        className="product-image"
        alt={product.title}
      />
      <span className="product-title">
        <h4 className="mb-0">{product.title}</h4>
        <h4 className="mb-0">
          <div>${product.price}</div>
          <div
            style={{
              textDecoration: "line-through",
              fontSize: "12px",
              color: "#888",
            }}
          >
            ${calculateOriginalPrice(product.discountPercentage, product.price)}
          </div>
        </h4>
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
