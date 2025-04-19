import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function Pagination({ api }) {
  const [products, setProducts] = useState([]);
  const [page, setPages] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, pagination.pageSize]);

  async function fetchProducts() {
    const result = await axios.get(api, {
      params: {
        limit: pagination.pageSize,
        skip: (pagination.page - 1) * pagination.pageSize,
      },
    });
    setTotal(result.data.total);
    setProducts(result.data.products);
  }

  function pageChange(updatePage) {
    if (page !== updatePage) setPages(updatePage);
    setPagination((prev) => ({ ...prev, page: updatePage }));
  }

  function updatePage(e) {
    if (e.key === "Enter") {
      pageChange(page);
    }
  }

  function setPage(e) {
    if (
      e.target.value < 0 ||
      e.target.value > Math.ceil(total / pagination.pageSize)
    )
      return;
    setPages(e.target.value);
  }
  return (
    <>
      <section className="products-page">
        {products.length &&
          products.map((item) => <ProductCard key={item.id} product={item} />)}
      </section>
      <section className="pagination">
        <span
          className={pagination.page === 1 ? "disabled" : ""}
          style={{ cursor: "pointer" }}
          onClick={() => pageChange(1)}
        >
          ⏮️
        </span>
        <span
          className={pagination.page === 1 ? "disabled" : ""}
          style={{ cursor: "pointer" }}
          onClick={() => pageChange(pagination.page - 1)}
        >
          ◀️
        </span>
        <input
          value={page}
          style={{ marginRight: "10px" }}
          type="number"
          min="1"
          max={Math.ceil(total / pagination.pageSize)}
          onChange={setPage}
          onKeyDown={updatePage}
        />
        of
        <div style={{ marginLeft: "10px" }}>
          {Math.ceil(total / pagination.pageSize)}
        </div>
        <span
          className={
            pagination.page === Math.ceil(total / pagination.pageSize)
              ? "disabled"
              : ""
          }
          style={{ cursor: "pointer" }}
          onClick={() => pageChange(pagination.page + 1)}
        >
          ▶️
        </span>
        <span
          className={
            pagination.page === Math.ceil(total / pagination.pageSize)
              ? "disabled"
              : ""
          }
          style={{ cursor: "pointer" }}
          onClick={() => pageChange(Math.ceil(total / pagination.pageSize))}
        >
          ⏭️
        </span>
      </section>
    </>
  );
}
