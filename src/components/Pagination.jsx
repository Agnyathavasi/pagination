import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function Pagination({ api }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPages] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15,
    search: "",
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, pagination.pageSize, pagination.search]);

  async function fetchProducts() {
    setLoading(true);
    let uuId = "";
    if (pagination.search) uuId = "search";
    const result = await axios.get(api + "/" + uuId, {
      params: {
        limit: pagination.pageSize,
        skip: (pagination.page - 1) * pagination.pageSize,
        q: pagination.search,
      },
    });
    setTotal(result.data.total);
    setProducts(result.data.products);
    setLoading(false);
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
      e.target.value >= Math.ceil(total / pagination.pageSize)
    )
      return;
    setPages(e.target.value);
  }

  function setSearches(e) {
    if (e.key === "Enter") {
      setPages(1);
      setPagination((prev) => ({ ...prev, search: search, page: 1 }));
    }
  }
  return (
    <>
      <section
        className="search"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 50px",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          onKeyDown={setSearches}
        />
      </section>
      <section className="products-page">
        {loading && <h2>Loading...</h2>}
        {!loading && products.length
          ? products.map((item) => <ProductCard key={item.id} product={item} />)
          : !loading && <h3>No items found.</h3>}
      </section>
      {products.length > 0 && (
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
      )}
    </>
  );
}
